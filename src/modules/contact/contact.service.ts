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
    // Handle case where data is sent as an array - take the first element
    const contactData = Array.isArray(data) ? data[0] : data;

    // Validate that we have the required data
    if (!contactData || typeof contactData !== 'object') {
      throw new ApiError(400, 'Invalid contact data provided');
    }

    // Validate required fields
    const { firstName, email, phone, message } = contactData;
    if (!firstName || !email || !phone || !message) {
      throw new ApiError(400, 'Missing required fields: firstName, email, phone, message');
    }

    try {
      // Try to save with Mongoose first
      const newMessage = new ContactModel({
        firstName,
        email,
        phone,
        message,
        status: 'unseen',
      });
      return await newMessage.save();
    } catch (error) {
      // If Mongoose validation fails due to schema mismatch, use MongoDB native insert
      console.log(
        'Mongoose validation failed, using native MongoDB insert:',
        error instanceof Error ? error.message : String(error),
      );

      const result = await ContactModel.collection.insertOne({
        firstName,
        email,
        phone,
        message,
        status: 'unseen',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Return the inserted document
      return await ContactModel.findById(result.insertedId);
    }
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
