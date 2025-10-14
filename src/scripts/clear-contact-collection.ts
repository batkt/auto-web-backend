import mongoose from 'mongoose';
import { ContactModel } from '../modules/contact/contact.model';

// Script to clear the contact collection and reset the schema
async function clearContactCollection() {
  try {
    // Connect to MongoDB (you may need to adjust the connection string)
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database');

    console.log('Connected to MongoDB');

    // Drop the contact collection to remove the old schema
    await ContactModel.collection.drop();
    console.log('Contact collection dropped successfully');

    // The collection will be recreated with the new schema when the first document is inserted

    console.log('Contact collection cleared. New schema will be applied on next insert.');
  } catch (error) {
    console.error('Error clearing contact collection:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the script
clearContactCollection();
