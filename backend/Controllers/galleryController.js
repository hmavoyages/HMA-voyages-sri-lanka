const Gallery = require('../Model/GalleryModel');

const MAX_IMAGES = 12;

// ID like G001, G012...
const generateGalleryId = async () => {
  const last = await Gallery.findOne({ galleryId: { $regex: /^G\d{3,}$/ } })
    .sort({ galleryId: -1 })
    .lean();

  const lastNum =
    last && typeof last.galleryId === 'string' && /^G\d{3,}$/.test(last.galleryId)
      ? parseInt(last.galleryId.slice(1), 10)
      : 0;

  const next = String((Number.isFinite(lastNum) ? lastNum : 0) + 1).padStart(3, '0');
  return `G${next}`;
};

const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);
const trimStr = (v) => (typeof v === 'string' ? v.trim() : v);

/** CREATE */
exports.create = async (req, res) => {
  try {
    let { title, tours, category, description, images = [], isFeatured = false } = req.body;

    title = trimStr(title);
    if (!title) return res.status(400).json({ message: 'Title is required.' });

    tours = trimStr(tours);
    category = trimStr(category);
    description = trimStr(description);

    images = toArray(images).map(trimStr).filter(Boolean).slice(0, MAX_IMAGES);

    const galleryId = await generateGalleryId();

    const doc = new Gallery({
      galleryId,
      title,
      tours,
      category,
      description,
      images,
      isFeatured: Boolean(isFeatured),
    });

    await doc.save();
    res.status(201).json({ message: 'Gallery item created', item: doc });
  } catch (e) {
    res.status(500).json({ message: 'Error creating item', error: e.message });
  }
};

/** LIST (pagination, filters, search) */
exports.list = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      q,
      category,
      featured,             // "true" | "false"
      sort = '-createdAt',  // e.g., "title" or "-createdAt"
    } = req.query;

    const query = {};
    if (category) query.category = category;
    if (featured === 'true') query.isFeatured = true;
    if (featured === 'false') query.isFeatured = false;

    if (q) {
      const rx = new RegExp(String(q).trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      query.$or = [{ title: rx }, { description: rx }, { tours: rx }, { category: rx }];
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skip = (pageNum - 1) * limitNum;

    const [items, total] = await Promise.all([
      Gallery.find(query).sort(sort).skip(skip).limit(limitNum).select('-__v'),
      Gallery.countDocuments(query),
    ]);

    res.json({
      data: items,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        limit: limitNum,
      },
    });
  } catch (e) {
    res.status(500).json({ message: 'Error retrieving items', error: e.message });
  }
};

/** GET ONE */
exports.getById = async (req, res) => {
  try {
    const doc = await Gallery.findOne({ galleryId: req.params.id }).select('-__v');
    if (!doc) return res.status(404).json({ message: 'Item not found' });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: 'Error retrieving item', error: e.message });
  }
};

/** UPDATE */
exports.update = async (req, res) => {
  try {
    const { title, tours, category, description, images, isFeatured } = req.body;

    const update = {};
    if (title !== undefined) {
      const t = trimStr(title);
      if (!t) return res.status(400).json({ message: 'Title cannot be empty.' });
      update.title = t;
    }
    if (tours !== undefined) update.tours = trimStr(tours);
    if (category !== undefined) update.category = trimStr(category);
    if (description !== undefined) update.description = trimStr(description);

    if (images !== undefined) {
      update.images = toArray(images).map(trimStr).filter(Boolean).slice(0, MAX_IMAGES);
    }
    if (isFeatured !== undefined) update.isFeatured = Boolean(isFeatured);

    const updated = await Gallery.findOneAndUpdate(
      { galleryId: req.params.id },
      update,
      { new: true }
    ).select('-__v');

    if (!updated) return res.status(404).json({ message: 'Item not found' });

    res.json({ message: 'Gallery item updated', item: updated });
  } catch (e) {
    res.status(500).json({ message: 'Error updating item', error: e.message });
  }
};

/** DELETE */
exports.remove = async (req, res) => {
  try {
    const deleted = await Gallery.findOneAndDelete({ galleryId: req.params.id });
    if (!deleted) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Gallery item deleted' });
  } catch (e) {
    res.status(500).json({ message: 'Error deleting item', error: e.message });
  }
};
