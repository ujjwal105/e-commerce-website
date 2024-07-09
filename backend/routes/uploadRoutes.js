const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

// Ensure the upload directory exists
const uploadDir = './upload/images';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Image Storage Engine
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Serve images statically
router.use('/images', express.static(uploadDir));

// Upload Endpoint
router.post('/', upload.single('product'), (req, res) => {
    if (req.file) {
        res.json({
            success: 1,
            image_url: `http://localhost:${process.env.PORT || 4000}/images/${req.file.filename}`
        });
    } else {
        res.status(400).json({ success: 0, message: 'No file uploaded' });
    }
});

module.exports = router;
