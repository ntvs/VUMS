//Load environment variables
require("dotenv").config();

//-------------------------------------------------------------------

//Express setup
const express = require("express");
const app = express();
const port = process.env.PORT || 2080;

//-------------------------------------------------------------------

//Mongoose
const mongoose = require("mongoose");

//Mongoose establish connection
mongoose.connect(process.env.DB_URL || "mongodb://127.0.0.1:27017");
const db = mongoose.connection;

//Mongoose connection event listeners
db.on("error", (e) => {
    console.log(e);
    console.log("[Server] Please check if your URL is correct.\n");
});
db.once("open", () => {
    console.log("[Server] MongoDB connection established successfully.\n");
});

//Video model
const Video = require("./models/video");

//-------------------------------------------------------------------

//Consume JSON body
app.use(express.json());

//-------------------------------------------------------------------

//Multer uploader
const { upload, fields, processUpload } = require("./uploader");

//-------------------------------------------------------------------

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
app.post('/', processUpload, async (req, res) => {

    //Limit number of fields which can be submitted
    if (Object.keys(req.body).length > 3) {
        return res.status(400).send({
            "error": "Too many fields submitted!"
        });
    }

    //Accept title, description, and tags field from the form
    let {title, description, tags} = req.body;

    //Create object containing video metadata
    let video = new Video();

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
        //'encoding': req.files.file[0].encoding,
        //'mimetype': req.files.file[0].mimetype,
        'filename': req.files.file[0].filename,
        'size': req.files.file[0].size
    };
    
    //Save video metadata to DB here
    await video.save();

    //Return video ID or URL & success message
    //or return video metadata
    return res.status(200).send({
        "msg": "Video created successfully!",
        video //"video": video.id
    });

});

//-------------------------------------------------------------------

//Server listening behavior
app.listen(port, () => {
    console.log(`\n[Server] Now listening on ======> http://localhost:${port}\n`);
});