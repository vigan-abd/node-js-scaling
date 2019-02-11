const express = require('express');
const app = express();
const port = parseInt(process.argv[2] || 3000);

const options = [
  "Go for it",
  "Maybe sleep on it",
  "Do some more research",
  "I don't know",
  "I wouldn't"
];


app.get('/', async (req, res) => {
  const randomIndex = Math.floor(Math.random() * options.length);
  const payload = {
    port,
    processId: process.pid,
    advice: options[randomIndex]
  };

  res.status(200);
  return res.json(payload);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))