//Libraries
const path = require('path');

//Initialize multer
const multer  = require('multer');
const MAXFILESIZE = process.env.MAX_FILE_SIZE || 500_000_000; //in Bytes //1GB 1_000_000_000
const uploadPath = path.join(process.env.CONTENT_DIRECTORY) || path.join("uploads/");



//File filter function
function fileFilter (req, file, next) {

    //console.log(file);

    //This solution from Nikitas IO resolves Multer issue that happens when file upload is cancelled (residual file is not deleted)
    //https://stackoverflow.com/a/64849651 <= Original code can be found here
    req.on('aborted', () => {
        file.stream.on('end', () => {
            //console.log('File upload cancelled.')
            next(new Error('File upload cancelled.'), false);
        });
        file.stream.emit('end');
    });

    //Validate mimetype, otherwise throw an error
    if (file.mimetype != "video/mp4") {
        next(new Error("Video file must be MP4!"), false);
    } else {
        next(null, true);
    }
}



//Initialize storage solution, file filter, file size limit
const upload = multer({ dest: uploadPath, fileFilter, limits: {fileSize: MAXFILESIZE} });



//Error-catching middleware
const processUpload = (req, res, next) => {
    upload.single("file")(req, res, (error) => {
        
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



module.exports = { upload, processUpload };