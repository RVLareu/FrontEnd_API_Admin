const multer = require('multer');

module.exports = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 1000000 }
});

module.exports = multer;
