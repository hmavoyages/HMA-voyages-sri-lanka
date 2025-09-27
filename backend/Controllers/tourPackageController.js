const TourPackage = require('../Model/TourPackageModel');

const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);
const trimStr = (v) => (typeof v === 'string' ? v.trim() : v);

// ID like T001, T012...
const generateTourId = async () => {
  const last = await TourPackage
    .findOne({ tourId: { $regex: /^T\d{3,}$/ } })
    .sort({ tourId: -1 })
    .lean();

  const lastNum =
    last && typeof last.tourId === 'string' && /^T\d{3,}$/.test(last.tourId)
      ? parseInt(last.tourId.slice(1), 10)
      : 0;

  const next = String((Number.isFinite(lastNum) ? lastNum : 0) + 1).padStart(3, '0');
  return `T${next}`;
};

function normalizeDays(daysInput) {
  const days = Array.isArray(daysInput) ? daysInput : [];
  return days
    .map((d) => ({
      day: Number(d.day) || Number(d.Day) || 0,
      title: trimStr(d.title ?? d.Title ?? ''),
      cover: trimStr(d.cover ?? d.Cover ?? ''),
      stay: trimStr(d.stay ?? d.Stay ?? ''),
      plan: toArray(d.plan ?? d.Plan ?? []).map(trimStr).filter(Boolean),
      route: trimStr(d.route ?? d.Route ?? ''),
    }))
    .filter((d) => d.day >= 1 && d.title);
}

/** CREATE */
exports.create = async (req, res) => {
  try {
    let { packageName, description, dayCount, days } = req.body;

    packageName = trimStr(packageName ?? req.body.PackageName);
    description = trimStr(description ?? req.body.Description);
    const dayCountNum = Number(dayCount ?? req.body.DayCount);

    if (!packageName || !description || !Number.isFinite(dayCountNum) || dayCountNum < 1) {
      return res.status(400).json({ message: 'packageName, description, and dayCount are required.' });
    }

    const normalizedDays = normalizeDays(days ?? req.body.Days);
    // optional: keep dayCount in sync with days length if provided
    const finalDayCount = normalizedDays.length || dayCountNum;

    const tourId = await generateTourId();

    const doc = new TourPackage({
      tourId,
      packageName,
      description,
      dayCount: finalDayCount,
      days: normalizedDays,
    });
    await doc.save();

    res.status(201).json({ message: 'Tour package created', item: doc });
  } catch (e) {
    res.status(500).json({ message: 'Error creating tour package', error: e.message });
  }
};

/** LIST (pagination, filters, search, sort) */
exports.list = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      q,
      minDays,
      maxDays,
      sort = '-createdAt', // e.g., 'packageName' or '-dayCount'
    } = req.query;

    const query = {};
    if (q) {
      const rx = new RegExp(String(q).trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      query.$or = [{ packageName: rx }, { description: rx }, { tourId: rx }, { 'days.title': rx }];
    }

    if (minDays || maxDays) {
      query.dayCount = {};
      if (minDays !== undefined) query.dayCount.$gte = Number(minDays);
      if (maxDays !== undefined) query.dayCount.$lte = Number(maxDays);
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skip = (pageNum - 1) * limitNum;

    const [items, total] = await Promise.all([
      TourPackage.find(query).sort(sort).skip(skip).limit(limitNum).select('-__v'),
      TourPackage.countDocuments(query),
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
    res.status(500).json({ message: 'Error retrieving tour packages', error: e.message });
  }
};

/** GET ONE */
exports.getById = async (req, res) => {
  try {
    const doc = await TourPackage.findOne({ tourId: req.params.id }).select('-__v');
    if (!doc) return res.status(404).json({ message: 'Tour package not found' });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: 'Error retrieving tour package', error: e.message });
  }
};

/** UPDATE */
exports.update = async (req, res) => {
  try {
    const { packageName, description, dayCount, days } = req.body;
    const update = {};

    if (packageName !== undefined || req.body.PackageName !== undefined) {
      const v = trimStr(packageName ?? req.body.PackageName);
      if (!v) return res.status(400).json({ message: 'packageName cannot be empty.' });
      update.packageName = v;
    }

    if (description !== undefined || req.body.Description !== undefined) {
      update.description = trimStr(description ?? req.body.Description);
    }

    if (dayCount !== undefined || req.body.DayCount !== undefined) {
      const n = Number(dayCount ?? req.body.DayCount);
      if (!Number.isFinite(n) || n < 1) return res.status(400).json({ message: 'dayCount must be >= 1' });
      update.dayCount = n;
    }

    if (days !== undefined || req.body.Days !== undefined) {
      update.days = normalizeDays(days ?? req.body.Days);
      if (!update.dayCount) update.dayCount = update.days.length || undefined;
    }

    const updated = await TourPackage.findOneAndUpdate(
      { tourId: req.params.id },
      update,
      { new: true }
    ).select('-__v');

    if (!updated) return res.status(404).json({ message: 'Tour package not found' });
    res.json({ message: 'Tour package updated', item: updated });
  } catch (e) {
    res.status(500).json({ message: 'Error updating tour package', error: e.message });
  }
};

/** DELETE */
exports.remove = async (req, res) => {
  try {
    const deleted = await TourPackage.findOneAndDelete({ tourId: req.params.id });
    if (!deleted) return res.status(404).json({ message: 'Tour package not found' });
    res.json({ message: 'Tour package deleted' });
  } catch (e) {
    res.status(500).json({ message: 'Error deleting tour package', error: e.message });
  }
};
