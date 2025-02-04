const multer = require('multer');
const path = require('path');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp':'webp'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const fileInfo = path.parse(file.originalname);
    const name = fileInfo.name.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    
    // Vérifie si le type MIME est présent dans la liste MIME_TYPES
    if (!MIME_TYPES.hasOwnProperty(file.mimetype)) {
      return callback(new Error('Invalid file type'));
    }
    
    callback(null, name + '_' + Date.now() + '.' + extension);
  },
});

module.exports = multer({ storage: storage }).single('image');
