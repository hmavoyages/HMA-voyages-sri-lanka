const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema(
  {
    testimonialId: { type: String, unique: true, index: true }, // e.g., T001
    text: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    trip: { type: String, required: true, trim: true },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    images: {
      type: [String], // store URLs/paths (e.g., from S3 or your static server)
      default: []
    },
    photo: { type: String, default: '' }, // avatar URL
    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', TestimonialSchema);
