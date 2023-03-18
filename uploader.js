//Libraries
const path = require('path');

//Initialize multer
const multer  = require('multer');
const MAXFILESIZE = process.env.MAX_FILE_SIZE || 500000000; //1GB 1000000000
const uploadPath = path.join(process.env.CONTENT_DIRECTORY) || path.join("uploads/");

//File filter function
function fileFilter (req, file, next) {

    //console.log(file);

    //Validate mimetype, otherwise throw an error
    if (file.mimetype != "video/mp4") {
        next(new Error("Video file must be MP4!"), false);
    } else {
        next(null, true);
    }
}

//Initialize storage solution, file filter, file size limit
const upload = multer({ dest: uploadPath, fileFilter, limits: {fileSize: MAXFILESIZE} });

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
            //File too large
            if (error.code === "LIMIT_FILE_SIZE") {
                return res.status(500).send({
                    "error": `${error.message}. Videos can be a maximum of ${MAXFILESIZE/1000000} MB!`
                });
            } else {
                //Generic multer error/multiple file field submission
                return res.status(500).send({
                    "error": `${error.message}. Please check if you have attached more than one file; only 1 file can be uploaded.`
                });
            }
        } else if (error) {
            //Other errors
            return res.status(400).send({
                "error": `${error.message}`
            });
        } else {
            next();
        }

    });
};

module.exports = { upload, fields, processUpload };