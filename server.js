//Load environment variables
require("dotenv").config();

const appName = "VUMS";

//-------------------------------------------------------------------

//Express setup
const express = require("express");
const app = express();
const port = process.env.PORT || 2080;

//cors
const cors = require('cors')
const corsOptions = {
    origin: process.env.CLIENT_ORIGIN || '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

//-------------------------------------------------------------------

//Mongoose
const mongoose = require("mongoose");

//Mongoose establish connection
mongoose.connect(process.env.DB_URL || "mongodb://127.0.0.1:27017");
const db = mongoose.connection;

//Mongoose connection event listeners
db.on("error", (e) => {
    console.log(e);
    console.log(`[${appName}] Please check if your URL is correct.\n`);
});
db.once("open", () => {
    console.log(`[${appName}] MongoDB connection established successfully.\n`);
});

//Video model
const VideoFile = require("./models/videoFile");

//-------------------------------------------------------------------

//Consume JSON body
app.use(express.json());

//-------------------------------------------------------------------

//Multer uploader
const { processUpload } = require("./uploader");

//-------------------------------------------------------------------

//Routes

//App uptime
app.get('/', (req, res) => {
    res.status(200).send({
        "app": `${appName}`,
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
    
    //If req passes thru the process upload function and no file is found after, return an error
    if (req.file == undefined) {
        return res.status(400).send({
            "error": "No file submitted!"
        }); 
    }

    let newVideoFile = new VideoFile({
        "mimetype": req.file.mimetype,
        "filename": req.file.filename,
        "size": req.file.size
    });

    //Debugging
    //console.log(newVideoFile);

    //Save video file metadata to DB here
    //Await if needed
    newVideoFile.save();

    return res.status(200).send({
        "msg": "Video file received successfully!",
        //file: req.files.file[0]
    });

});

//-------------------------------------------------------------------

//Server listening behavior
app.listen(port, () => {
    console.log(`\n[${appName}] Now listening on ======> http://localhost:${port}\n`);
});