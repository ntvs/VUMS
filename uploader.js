//Initialize multer
const multer  = require('multer');

//Initialize storage solution
const upload = multer({ dest: 'uploads/' });

//Video upload allowed fields
const fields = [
    {'name': 'title', 'maxCount': 1},
    {'name': 'description', 'maxCount': 1},
    {'name': 'tags', 'maxCount': 1},
    {'name': 'file', 'maxCount': 1}
];

module.exports = { upload, fields };