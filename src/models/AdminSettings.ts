import mongoose, { Schema, models, model } from 'mongoose';

const adminSettingsSchema = new Schema({
  // your schema fields
  featuredPrice: {
    type: Number,
    required: true,
  },
  // other fields...
});

const AdminSettings = models.AdminSettings || model('AdminSettings', adminSettingsSchema);

export default AdminSettings;
