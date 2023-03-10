//Express setup
const express = require('express');
const app = express();
const port = 2080;

//Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Server listening behavior
app.listen(port, () => {
  console.log(`\n[Server] now listening on ======> http://localhost:${port}\n`);
});