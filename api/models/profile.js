import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  education: {
    degree: { type: String, required: true },
    completionYear: { type: Number, required: true }
  },
  studentCard: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  portfolio: { type: String, default: '' },
  githubLink: { type: String, default: '' }
}, {
  timestamps: true
});

export const Profile = mongoose.model('Profile', profileSchema); 