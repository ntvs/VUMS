//Initialize multer
const multer  = require('multer');

//Initialize storage solution
const upload = multer({ dest: 'uploads/' });

//Video upload allowed fields
//Note: maxCount appears to be useless
const fields = [
    {name: 'title', maxCount: 1},
    {name: 'description', maxCount: 1},
    {name: 'tags', maxCount: 1},
    {name: 'file', maxCount: 1}
];

//Error-catching middleware
const processUpload = (req, res, next) => {
    upload.fields(fields)(req, res, (error) => {

        //Handle errors here
        if (error instanceof multer.MulterError) {
            return res.status(500).send({
                "error": error.message
            });
        } else {
            next();
        }

    });
};

module.exports = { upload, fields, processUpload };