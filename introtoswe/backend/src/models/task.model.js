import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Ensures that the title is mandatory
    trim: true      // Removes whitespace from the beginning and end
  },
  description: {
    type: String,
    trim: true // Optional field, but removes unnecessary whitespace
  },
  category: {
    type: String,
    default: 'STEM & Technology', // Default value as specified
    enum: ['STEM & Technology', 'Arts', 'Business', 'Leadership & Professional Development', 'Community Service', 'Health and Recreation', 'Others'], // Optional validation
  },
  level: {
    type: String,
    default: 'Intermediate',
    enum: ['Junior', 'Intermediate', 'Senior'], // Optional validation
  },
  deadline: {
    type: Date, // Stores the deadline as a Date object
    required: true
  },
  organization: {
    type: String,
    required: false,
    trim: true
  },
  userCreated: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

const Task = mongoose.model('Task', taskSchema);

export default Task;

