//Load environment variables
require('dotenv').config();

//Express setup
const express = require('express');
const app = express();
const port = process.env.PORT;

//Routes

//App uptime
app.get('/', (req, res) => {
  res.send({
    "app": "VUMS",
    "uptime": `${process.uptime()} s`
  });
});

//App primary function
app.post('/', (req, res) => {



});

//Server listening behavior
app.listen(port, () => {
  console.log(`\n[Dev Server] now listening on ======> http://localhost:${port}\n`);
});