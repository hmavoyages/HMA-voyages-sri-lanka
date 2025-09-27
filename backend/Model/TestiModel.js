const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema(
  {
    testimonialId: { type: String, unique: true, index: true }, // e.g., T001
    text: { type: String, required: true, trim: true, maxlength: 600 },
    name: { type: String, required: true, trim: true },
    location: { type: String, trim: true, default: '' }, // optional on FE
    trip: { type: String, required: true, trim: true },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      set: v => Math.round(v * 2) / 2, // enforce 0.5 steps
    },
    images: {
      type: [String],
      default: [],
      validate: [arr => arr.length <= 8, '{PATH} exceeds the limit of 8'],
    },
    photo: { type: String, default: '' }, // avatar URL
    isFeatured: { type: Boolean, default: false },
    email: { type: String, trim: true },        // optional Google metadata
    authProvider: { type: String, trim: true }, // e.g., "google"
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', TestimonialSchema);
