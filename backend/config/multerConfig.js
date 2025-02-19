const multer = require('multer');
const path = require('path');

const allowedDocs = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/msword',
    'application/vnd.ms-excel'
];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const username = req.body.username || 'anonimo';
    const timestamp = new Date().toISOString().replace(/:/g, '-'); 
    const ext = path.extname(file.originalname);
    cb(null, `${username}-${timestamp}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (allowedDocs.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de documento invalido.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter
});

module.exports = upload;
