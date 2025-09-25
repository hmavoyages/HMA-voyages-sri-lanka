const Testimonial = require('../Model/TestiModel');

// Safer ID generator: only consider zero-padded IDs like T001, T123, etc.
const generateTestimonialId = async () => {
  const last = await Testimonial
    .findOne({ testimonialId: { $regex: /^T\d{3,}$/ } })
    .sort({ testimonialId: -1 }) // works with zero-padding
    .lean();

  const lastNum = (last && typeof last.testimonialId === 'string' && /^T\d{3,}$/.test(last.testimonialId))
    ? parseInt(last.testimonialId.slice(1), 10)
    : 0;

  const next = String((Number.isFinite(lastNum) ? lastNum : 0) + 1).padStart(3, '0');
  return `T${next}`;
};

// Create a new testimonial
exports.createTestimonial = async (req, res) => {
  try {
    let { text, name, location, trip, rating, images = [], photo = '', isFeatured = false } = req.body;

    // allow 0.5 steps between 1 and 5
    const r = Number(rating);
    if (Number.isNaN(r) || r < 1 || r > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // normalize images to array of strings
    if (!Array.isArray(images)) images = images ? [images] : [];

    const testimonialId = await generateTestimonialId();

    const newDoc = new Testimonial({
      testimonialId,
      text,
      name,
      location,
      trip,
      rating: r,
      images,
      photo,
      isFeatured
    });

    await newDoc.save();
    res.status(201).json({ message: 'Testimonial created successfully', testimonial: newDoc });
  } catch (error) {
    res.status(500).json({ message: 'Error creating testimonial', error: error.message });
  }
};

// Get all testimonials (supports pagination, filtering, and sorting)
exports.getAllTestimonials = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      minRating,
      maxRating,
      trip,
      featured,               // "true" | "false"
      sort = '-createdAt'     // e.g., "rating" or "-rating"
    } = req.query;

    const q = {};
    if (trip) q.trip = trip;
    if (featured === 'true') q.isFeatured = true;
    if (featured === 'false') q.isFeatured = false;
    if (minRating || maxRating) {
      q.rating = {};
      if (minRating) q.rating.$gte = Number(minRating);
      if (maxRating) q.rating.$lte = Number(maxRating);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      Testimonial.find(q).sort(sort).skip(skip).limit(Number(limit)).select('-__v'),
      Testimonial.countDocuments(q)
    ]);

    res.status(200).json({
      data: items,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        limit: Number(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving testimonials', error: error.message });
  }
};

// Get a single testimonial by ID
exports.getTestimonialById = async (req, res) => {
  try {
    const doc = await Testimonial.findOne({ testimonialId: req.params.id }).select('-__v');
    if (!doc) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving testimonial', error: error.message });
  }
};

// Update a testimonial by ID
exports.updateTestimonial = async (req, res) => {
  try {
    const { text, name, location, trip, rating, images, photo, isFeatured } = req.body;

    if (rating !== undefined) {
      const r = Number(rating);
      if (Number.isNaN(r) || r < 1 || r > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
      }
    }

    const updateData = {};
    if (text !== undefined) updateData.text = text;
    if (name !== undefined) updateData.name = name;
    if (location !== undefined) updateData.location = location;
    if (trip !== undefined) updateData.trip = trip;
    if (rating !== undefined) updateData.rating = Number(rating);
    if (images !== undefined) updateData.images = Array.isArray(images) ? images : (images ? [images] : []);
    if (photo !== undefined) updateData.photo = photo;
    if (isFeatured !== undefined) updateData.isFeatured = isFeatured;

    const updated = await Testimonial.findOneAndUpdate(
      { testimonialId: req.params.id },
      updateData,
      { new: true }
    ).select('-__v');

    if (!updated) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.status(200).json({ message: 'Testimonial updated successfully', testimonial: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating testimonial', error: error.message });
  }
};

// Delete a testimonial by ID
exports.deleteTestimonial = async (req, res) => {
  try {
    const deleted = await Testimonial.findOneAndDelete({ testimonialId: req.params.id });
    if (!deleted) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting testimonial', error: error.message });
  }
};

// Random featured
exports.getRandomFeatured = async (_req, res) => {
  try {
    const docs = await Testimonial.aggregate([
      { $match: { isFeatured: true } },
      { $sample: { size: 1 } }
    ]);
    if (!docs.length) {
      return res.status(404).json({ message: 'No featured testimonials found' });
    }
    res.status(200).json(docs[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving featured testimonial', error: error.message });
  }
};
