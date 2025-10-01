import { ApiError } from '../../utils/api-error';
import Survey, { SurveyStatus } from './survey.model';
import { Survey as SurveyType } from './survey.model';
import SurveyResponse from './survey-response.model';
import SurveyVersion, { Group, Question } from './survery-version.model';
import mongoose from 'mongoose';

interface SurveyInputData {
  title: string;
  description?: string;
  groups: Group[];
  questions: Question[];
}

export class SurveyService {
  private validateQuestionsData(questions: Question[], groupOrder?: number) {
    questions.forEach((question, questionIndex) => {
      if (!question.questionText || question.questionText.trim() === '') {
        throw new ApiError(400, `${questionIndex + 1}-р асуултын текст заавал оруулах шаардлагатай`);
      }

      if (!question.answerType) {
        throw new ApiError(400, `"${question.questionText}" асуултын хариултын төрөл заавал оруулах шаардлагатай`);
      }

      // Validate options for choice-based questions
      if (
        (question.answerType === 'single_choice' || question.answerType === 'multiple_choice') &&
        (!question.options || question.options.length === 0)
      ) {
        throw new ApiError(
          400,
          `"${question.questionText}" асуулт нь сонголттой асуулт тул сонголтууд заавал оруулах шаардлагатай`,
        );
      }

      // Validate order
      if (question.order === undefined || question.order === null) {
        throw new ApiError(400, `"${question.questionText}" асуултын дарааллыг заавал оруулах шаардлагатай`);
      }
    });
  }

  private validateSurveyData(data: Partial<SurveyInputData>) {
    // Check if title is provided
    if (!data.title || data.title.trim() === '') {
      throw new ApiError(400, 'Судалгааны гарчиг заавал оруулах шаардлагатай');
    }

    // Check if at least one group or question exists
    const hasGroups = data.groups && data.groups.length > 0;
    const hasQuestions = data.questions && data.questions.length > 0;

    if (!hasGroups && !hasQuestions) {
      throw new ApiError(400, 'Судалгаанд дор хаяж нэг бүлэг эсвэл асуулт байх шаардлагатай');
    }

    // Validate groups if they exist
    if (hasGroups && data.groups) {
      data.groups.forEach((group, groupIndex) => {
        if (!group.title || group.title.trim() === '') {
          throw new ApiError(400, `${group.order}-р бүлгийн гарчиг заавал оруулах шаардлагатай`);
        }

        if (!group.questions || group.questions.length === 0) {
          throw new ApiError(400, `${group.order} бүлэгт дор хаяж нэг асуулт байх шаардлагатай`);
        }

        // Validate order
        if (group.order === undefined || group.order === null) {
          throw new ApiError(400, `${group.order} бүлэгт дарааллыг заавал оруулах шаардлагатай`);
        }

        this.validateQuestionsData(group.questions, group.order);
      });
    }

    // Validate questions if they exist
    if (hasQuestions && data.questions) {
      this.validateQuestionsData(data.questions);
    }
  }

  async createSurvey(data: SurveyInputData) {
    this.validateSurveyData(data);
    const survey = new Survey({
      title: data.title,
      description: data.description,
      status: SurveyStatus.SAVED,
    });

    const newSurvey = await survey.save();
    const surveyVersion = new SurveyVersion({
      surveyId: newSurvey._id,
      version: 0,
      groups: data.groups,
      questions: data.questions,
    });

    await surveyVersion.save();
    return newSurvey;
  }

  async getSurveys(query: any = {}) {
    const { status, page = 1, limit = 10, search } = query;

    let filter: any = {};

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const skip = (page - 1) * limit;

    const surveys = await Survey.find(filter)
      .select('-__v -groups -questions')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Survey.countDocuments(filter);

    return {
      data: surveys,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async getSurveyById(id: string) {
    const survey = await Survey.findById(id);
    if (!survey) {
      throw new ApiError(404, 'Судалгаа олдсонгүй');
    }

    const surveyVersion = await SurveyVersion.findOne({ surveyId: survey._id, isActive: true });
    if (!surveyVersion) {
      throw new ApiError(404, 'Судалгаа олдсонгүй');
    }

    return {
      _id: survey._id,
      title: survey.title,
      description: survey.description,
      status: survey.status,
      version: surveyVersion.version,
      groups: surveyVersion.groups,
      questions: surveyVersion.questions,
    };
  }

  async getActiveSurvey(id: string) {
    const survey = await Survey.findOne({ _id: id, status: SurveyStatus.STARTED });
    if (!survey) {
      throw new ApiError(404, 'Судалгаа олдсонгүй');
    }

    const surveyVersion = await SurveyVersion.findOne({ surveyId: survey._id, isActive: true });
    if (!surveyVersion) {
      throw new ApiError(404, 'Судалгаа олдсонгүй');
    }

    return {
      _id: survey._id,
      title: survey.title,
      description: survey.description,
      status: survey.status,
      version: surveyVersion.version,
      groups: surveyVersion.groups,
      questions: surveyVersion.questions,
    };
  }

  async updateSurvey(id: string, data: Partial<SurveyType>) {
    // Validate that the survey is editable
    await this.validateSurveyEditability(id);

    this.validateSurveyData(data);
    return await Survey.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteSurvey(id: string) {
    const survey = await Survey.findByIdAndDelete(id);
    if (!survey) {
      throw new ApiError(404, 'Судалгаа олдсонгүй');
    }
    return survey;
  }

  async changeStatus(id: string, status: SurveyStatus) {
    const survey = await Survey.findById(id);
    if (!survey) {
      throw new ApiError(404, 'Судалгаа олдсонгүй');
    }

    // Define valid status transitions
    const validTransitions: Record<SurveyStatus, SurveyStatus[]> = {
      [SurveyStatus.SAVED]: [SurveyStatus.STARTED],
      [SurveyStatus.STARTED]: [SurveyStatus.STOPPED, SurveyStatus.FINISHED],
      [SurveyStatus.STOPPED]: [SurveyStatus.STARTED],
      [SurveyStatus.FINISHED]: [], // No transitions allowed from FINISHED
      [SurveyStatus.ARCHIVED]: [], // No transitions allowed from ARCHIVED
    };

    const currentStatus = survey.status;
    const allowedTransitions = validTransitions[currentStatus];

    if (!allowedTransitions.includes(status)) {
      throw new ApiError(
        400,
        `Буруу статус өөрчлөлт. ${currentStatus} статусаас ${status} статус руу өөрчлөх боломжгүй. Зөвшөөрөгдсөн өөрчлөлтүүд: ${allowedTransitions.join(', ')}`,
      );
    }

    survey.status = status;
    return await survey.save();
  }

  isSurveyEditable(status: SurveyStatus): boolean {
    return status === SurveyStatus.SAVED || status === SurveyStatus.STOPPED;
  }

  async validateSurveyEditability(id: string) {
    const survey = await Survey.findById(id);
    if (!survey) {
      throw new ApiError(404, 'Судалгаа олдсонгүй');
    }

    if (!this.isSurveyEditable(survey.status)) {
      throw new ApiError(
        400,
        `${survey.status} статустай судалгааг засах боломжгүй. Зөвхөн ХАДГАЛАГДСАН болон ЗОГСООСОН статустай судалгааг засах боломжтой.`,
      );
    }

    return survey;
  }

  async getSurveyResponses(id: string, query: any = {}) {
    const survey = await Survey.findById(id);
    if (!survey) {
      throw new ApiError(404, 'Судалгаа олдсонгүй');
    }

    const { page = 1, limit = 10, search } = query;

    let filter: any = { surveyId: id };

    if (search) {
      filter.$or = [
        { 'respondentInfo.email': { $regex: search, $options: 'i' } },
        { 'respondentInfo.userId': { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const responses = await SurveyResponse.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);

    const total = await SurveyResponse.countDocuments(filter);

    return {
      data: responses,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async submitSurvey(
    data: {
      surveyId: string;
      version: number;
      answers: {
        questionId: string;
        value: string | string[];
      }[];
      respondentInfo?: {
        email?: string;
        userId?: string;
      };
    },
    ipAddress?: string,
  ) {
    const survey = await Survey.findById(data.surveyId);
    if (!survey) {
      throw new ApiError(404, 'Судалгаа олдсонгүй');
    }

    if (survey.status !== SurveyStatus.STARTED) {
      throw new ApiError(400, 'Судалгаа идэвхигүй байна.');
    }

    // validate answers data
    const answers = data.answers;
    if (!answers || answers.length === 0) {
      throw new ApiError(400, 'Хариултын мэдээлэл заавал оруулах шаардлагатай');
    }

    survey.isAnswered = true;
    await survey.save();

    // validate answers data
    const surveyResponse = new SurveyResponse({
      ...data,
      ipAddress,
    });
    return await surveyResponse.save();
  }

  async startSurvey(id: string) {
    const survey = await Survey.findById(id);
    if (!survey) {
      throw new ApiError(404, 'Судалгаа олдсонгүй');
    }

    survey.status = SurveyStatus.STARTED;
    return await survey.save();
  }

  async stopSurvey(id: string) {
    // transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const survey = await Survey.findById(id);
      if (!survey) {
        throw new ApiError(404, 'Судалгаа олдсонгүй');
      }

      const surveyVersion = await SurveyVersion.findOne({ surveyId: survey._id, isActive: true });
      if (!surveyVersion) {
        throw new ApiError(404, 'Судалгаа олдсонгүй');
      }

      survey.status = SurveyStatus.STOPPED;
      await survey.save({ session });

      surveyVersion.isActive = false;
      await surveyVersion.save({ session });

      const newSurveyVersion = new SurveyVersion({
        surveyId: survey._id,
        version: surveyVersion.version + 1,
        groups: surveyVersion.groups,
        questions: surveyVersion.questions,
      });
      await newSurveyVersion.save({ session });

      await session.commitTransaction();
      session.endSession();

      return true;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new ApiError(400, 'Судалгааг зогсооход алдаа гарлаа');
    }
  }

  async getSurveyVersions(id: string) {
    const survey = await Survey.findById(id);
    if (!survey) {
      throw new ApiError(404, 'Судалгаа олдсонгүй');
    }

    const surveyVersions = await SurveyVersion.find({ surveyId: survey._id }).select('_id version createdAt').lean();

    return surveyVersions;
  }

  async duplicateSurvey(id: string) {
    // transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const survey = await Survey.findById(id);
      if (!survey) {
        throw new ApiError(404, 'Судалгаа олдсонгүй');
      }

      const surveyVersion = await SurveyVersion.findOne({ surveyId: survey._id, isActive: true });

      if (!surveyVersion) {
        throw new ApiError(404, 'Судалгаа олдсонгүй');
      }

      const newSurvey = new Survey({
        title: survey.title + ' (хуулбар)',
        description: survey.description,
        status: SurveyStatus.SAVED,
      });

      await newSurvey.save({ session });

      const newSurveyVersion = new SurveyVersion({
        surveyId: newSurvey._id,
        version: 0,
        groups: surveyVersion.groups,
        questions: surveyVersion.questions,
      });

      await newSurveyVersion.save({ session });

      await session.commitTransaction();
      session.endSession();

      return newSurvey;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
    }
  }
}
