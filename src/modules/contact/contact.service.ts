import { ApiError } from '../../utils/api-error';
import { ContactModel } from './contact.model';

export class ContactService {
  getMessagesList = async (page: number = 1, limit: number = 10, search: string = '') => {
    const query: any = {};
    if (search) {
      query.$text = { $search: search };
    }

    // ✨ createdAt descending (шинэ мессеж эхэнд)
    const messages = await ContactModel.find(query)
      .sort({ createdAt: -1 }) // 🔥 гол хэсэг
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const totalMessages = await ContactModel.countDocuments(query);

    return {
      data: messages,
      total: totalMessages,
      totalPages: Math.ceil(totalMessages / limit),
      currentPage: page,
    };
  };

  getDetailMessage = async (id: string) => {
    const message = await ContactModel.findById(id).lean();
    if (!message) {
      throw new ApiError(404, 'Message not found');
    }
    return message;
  };

  saveMessage = async (data: any) => {
    const newMessage = new ContactModel(data);
    return await newMessage.save();
  };

  setMessageStatusSeen = async (id: string) => {
    const message = await ContactModel.findById(id);
    if (!message) {
      throw new ApiError(404, 'Message not found');
    }
    message.status = 'seen';
    return await message.save();
  };
}
