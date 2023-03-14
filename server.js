//Load environment variables
require('dotenv').config();

//Express setup
const express = require('express');
const app = express();
const port = process.env.PORT;

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
app.post('/', upload.fields(fields), (req, res) => {

  console.log(req.body, req.files);

  if (req.body && req.files) {
    res.status(200).send({
      "body": req.body,
      "files": req.files
    });
  } else if (req.body) {
    res.status(200).send({
      "body": req.body
    });
  } else {
    res.status(400).send({
      "msg": 'No fields submitted!',
    });
  }

});

//Server listening behavior
app.listen(port, () => {
  console.log(`\n[Dev Server] now listening on ======> http://localhost:${port}\n`);
});