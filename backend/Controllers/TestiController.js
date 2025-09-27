// controllers/testimonialController.js
const Testimonial = require('../Model/TestiModel');

// ---- Constants to mirror the front-end ----
const MAX_TEXT = 600;
const MAX_IMAGES = 8;

// Safer ID generator: only consider zero-padded IDs like T001, T123, etc.
const generateTestimonialId = async () => {
  const last = await Testimonial
    .findOne({ testimonialId: { $regex: /^T\d{3,}$/ } })
    .sort({ testimonialId: -1 })
    .lean();

  const lastNum =
    last && typeof last.testimonialId === 'string' && /^T\d{3,}$/.test(last.testimonialId)
      ? parseInt(last.testimonialId.slice(1), 10)
      : 0;

  const next = String((Number.isFinite(lastNum) ? lastNum : 0) + 1).padStart(3, '0');
  return `T${next}`;
};

// Small helpers
const isHalfStep = (n) => Number.isFinite(n) && Math.round(n * 2) === n * 2; // 0.5 steps
const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);
const trimStr = (v) => (typeof v === 'string' ? v.trim() : v);

// Create a new testimonial
exports.createTestimonial = async (req, res) => {
  try {
    let {
      text,
      name,
      location,
      trip,
      rating,
      images = [],
      photo = '',
      isFeatured = false,
      // optional from Google sign-in
      email,
      authProvider,
    } = req.body;

    // Trim incoming strings to avoid accidental spaces
    text = trimStr(text);
    name = trimStr(name);
    location = trimStr(location);
    trip = trimStr(trip);
    photo = trimStr(photo);
    email = trimStr(email);
    authProvider = trimStr(authProvider);

    // Front-end required fields: text, name, trip
    if (!text || !name || !trip) {
      return res.status(400).json({ message: 'Please provide Review (text), Name, and Trip.' });
    }

    // Align with front-end limits
    if (text.length > MAX_TEXT) {
      return res.status(400).json({ message: `Review is too long. Max ${MAX_TEXT} characters.` });
    }

    // Rating: allow 0.5 steps between 1 and 5
    const r = Number(rating);
    if (!Number.isFinite(r) || r < 1 || r > 5 || !isHalfStep(r)) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5, in 0.5 steps.' });
    }

    // Normalize images to array of strings and cap to MAX_IMAGES
    images = toArray(images).map(trimStr).filter(Boolean).slice(0, MAX_IMAGES);

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
      isFeatured: Boolean(isFeatured),
      // optional metadata captured from dialog (if you store these in schema)
      email,
      authProvider,
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
      sort = '-createdAt',    // e.g., "rating" or "-rating"
      q,                      // optional free-text search across text/name/trip
    } = req.query;

    const query = {};

    if (trip) query.trip = trip;

    if (featured === 'true') query.isFeatured = true;
    if (featured === 'false') query.isFeatured = false;

    if (minRating || maxRating) {
      query.rating = {};
      if (minRating !== undefined) query.rating.$gte = Number(minRating);
      if (maxRating !== undefined) query.rating.$lte = Number(maxRating);
    }

    if (q) {
      const rx = new RegExp(String(q).trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      query.$or = [{ text: rx }, { name: rx }, { trip: rx }];
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skip = (pageNum - 1) * limitNum;

    const [items, total] = await Promise.all([
      Testimonial.find(query).sort(sort).skip(skip).limit(limitNum).select('-__v'),
      Testimonial.countDocuments(query),
    ]);

    res.status(200).json({
      data: items,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        limit: limitNum,
      },
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
    const {
      text,
      name,
      location,
      trip,
      rating,
      images,
      photo,
      isFeatured,
      email,
      authProvider,
    } = req.body;

    const updateData = {};

    if (text !== undefined) {
      const t = trimStr(text);
      if (!t) return res.status(400).json({ message: 'Review (text) cannot be empty.' });
      if (t.length > MAX_TEXT) {
        return res.status(400).json({ message: `Review is too long. Max ${MAX_TEXT} characters.` });
      }
      updateData.text = t;
    }

    if (name !== undefined) updateData.name = trimStr(name);
    if (location !== undefined) updateData.location = trimStr(location);
    if (trip !== undefined) updateData.trip = trimStr(trip);

    if (rating !== undefined) {
      const r = Number(rating);
      if (!Number.isFinite(r) || r < 1 || r > 5 || !isHalfStep(r)) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5, in 0.5 steps.' });
      }
      updateData.rating = r;
    }

    if (images !== undefined) {
      updateData.images = toArray(images).map(trimStr).filter(Boolean).slice(0, MAX_IMAGES);
    }

    if (photo !== undefined) updateData.photo = trimStr(photo);
    if (isFeatured !== undefined) updateData.isFeatured = Boolean(isFeatured);

    // optional Google metadata (only if you store them)
    if (email !== undefined) updateData.email = trimStr(email);
    if (authProvider !== undefined) updateData.authProvider = trimStr(authProvider);

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

// Random featured (fallback: highest-rated if none marked featured)
exports.getRandomFeatured = async (_req, res) => {
  try {
    const docs = await Testimonial.aggregate([
      { $match: { isFeatured: true } },
      { $sample: { size: 1 } },
    ]);

    if (docs.length) {
      return res.status(200).json(docs[0]);
    }

    // fallback to a random top-rated testimonial
    const fallback = await Testimonial.aggregate([
      { $sort: { rating: -1, createdAt: -1 } },
      { $limit: 10 },
      { $sample: { size: 1 } },
    ]);

    if (!fallback.length) {
      return res.status(404).json({ message: 'No testimonials found' });
    }

    return res.status(200).json(fallback[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving featured testimonial', error: error.message });
  }
};
