import mongoose from 'mongoose';

const AdSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  link: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Ad || mongoose.model('Ad', AdSchema);