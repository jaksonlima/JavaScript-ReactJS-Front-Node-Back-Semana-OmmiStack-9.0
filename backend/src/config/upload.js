const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const nome = path.basename(file.originalname, ext);

            cb(null, `${nome}-${Date.now()}${ext}`)
        },
    }),
};