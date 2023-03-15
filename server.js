//Load environment variables
require('dotenv').config();

//Express setup
const express = require('express');
const app = express();
const port = process.env.PORT;

//Consume JSON body
app.use(express.json());

//Multer uploader
const { upload, fields, processUpload } = require('./uploader');

//Routes

//App uptime
app.get('/', (req, res) => {
    res.status(200).send({
        "app": "VUMS",
        "uptime": `${process.uptime()} s`
    });
});

/*
    Notes:
        incorrect empty file fields accepted, but incorrect file fields with a file throw an error 
        incorrect text fields accepted, empty or not
*/

//App primary function
app.post('/', processUpload, (req, res) => {

    //Limit number of fields which can be submitted
    if (Object.keys(req.body).length > 3) {
        return res.status(400).send({
            "error": "Too many fields submitted!"
        });
    }

    //Accept title, description, and tags field from the form
    let {title, description, tags} = req.body;

    //Create object containing video metadata
    let video = {};

    //If there is no title, return an error
    if (!(title)) {
        return res.status(400).send({
            "error": "No title provided!"
        });
    }

    //If there is more than one title, return an error
    if (title && title instanceof Array) {
        return res.status(400).send({
            "error": "There cannot be more than 1 title!"
        });
    }

    //Assign video title
    video.title = title;

    //If there is more than one description, return an error
    if (description && description instanceof Array) {
        return res.status(400).send({
            "error": "There cannot be more than 1 description!"
        });
    }
    
    //Assign description if there is one
    if (description)
        video.description = description;
    
    //If there is more than one tags field, return an error
    if (tags && tags instanceof Array) {
        return res.status(400).send({
            "error": "There cannot be more than 1 tags field!"
        });
    }
    
    //Assign tags if there are any
    if (tags)
        video.tags = tags.split(',');

    //If no file is detected in the file field, return an error
    if (!req.files.file) {
        return res.status(400).send({
            "error": "No video file provided!"
        });
    }

    //Assign video file metadata 
    video.file = {
        'encoding': req.files.file[0].encoding,
        'mimetype': req.files.file[0].mimetype,
        'filename': req.files.file[0].filename,
        'size': req.files.file[0].size
    };
    
    //Return video metadata
    return res.status(200).send({
        "msg": "Video created successfully!",
        video
    });

});


//Server listening behavior
app.listen(port, () => {
    console.log(`\n[Dev Server] now listening on ======> http://localhost:${port}\n`);
});