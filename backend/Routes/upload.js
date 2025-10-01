// routes/upload.js (catch-all version)
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const router = express.Router();

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const API_BASE = "https://hma-voyages-backend.onrender.com"; // same base you used

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext).replace(/[^a-z0-9-_]+/gi, '_');
    cb(null, `${Date.now()}_${base}${ext}`);
  }
});

const allowed = new Set(['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']);
const fileFilter = (req, file, cb) => {
  if (allowed.has(file.mimetype)) cb(null, true);
  else cb(new Error('Only image files are allowed'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 8 * 1024 * 1024 },
});

const fileUrl = (req, filename) => `${API_BASE}/uploads/${filename}`;

// ✅ Accept ANY field name
router.post('/', upload.any(), (req, res) => {
  const files = Array.isArray(req.files) ? req.files : [];
  // Prefer a single-file field named avatar/photo as the "avatar"
  const avatar = files.find((f) => f.fieldname === 'avatar' || f.fieldname === 'photo');
  const images = files.filter((f) => f !== avatar);

  res.json({
    avatarUrl: avatar ? fileUrl(req, avatar.filename) : undefined,
    imageUrls: images.map((f) => fileUrl(req, f.filename)),
  });
});

router.use((err, req, res, next) => {
  if (err && err.name === 'MulterError') return res.status(400).json({ message: err.message });
  if (err) return res.status(400).json({ message: err.message });
  next();
});

module.exports = router;
