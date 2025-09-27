const mongoose = require('mongoose');

const DaySchema = new mongoose.Schema(
  {
    day: { type: Number, required: true, min: 1 },
    title: { type: String, required: true, trim: true },
    cover: { type: String, required: true, trim: true },
    stay: { type: String, trim: true, default: '' },
    plan: { type: [String], default: [] },
    route: { type: String, trim: true, default: '' },
  },
  { _id: false }
);

const TourPackageSchema = new mongoose.Schema(
  {
    tourId: { type: String, unique: true, index: true }, // e.g. T001
    packageName: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    dayCount: { type: Number, required: true, min: 1 },
    days: { type: [DaySchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TourPackage', TourPackageSchema);
