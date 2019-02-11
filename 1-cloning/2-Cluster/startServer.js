const express = require('express');

/**
 * @param {Number} port 
 */
const startServer = (port) => {
  const app = express();
  
  app.get('/', async (req, res) => {
    res.status(200);
    return res.json(`worker process ${process.pid}`)
  });
  
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}

module.exports = startServer;