const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema(
  {
    galleryId: { type: String, unique: true, index: true }, // e.g., G001
    title: { type: String, required: true, trim: true, maxlength: 200 },
    tours: { type: String, trim: true, default: '' },        // e.g., "d12"
    category: { type: String, trim: true, default: '' },     // e.g., "Cultural"
    description: { type: String, trim: true, default: '', maxlength: 2000 },
    images: {
      type: [String],                                        // URLs
      default: [],
      validate: [arr => arr.length <= 12, '{PATH} exceeds limit of 12'],
    },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', GallerySchema);
