//Express setup
const express = require('express');
const app = express();
const port = 2080;

//Routes
app.get('/', (req, res) => {
  res.send({
    "app": "VUMS",
    "uptime": `${process.uptime()} s`
  });
});

//Server listening behavior
app.listen(port, () => {
  console.log(`\n[Dev Server] now listening on ======> http://localhost:${port}\n`);
});