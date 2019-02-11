const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const startServer = require('./startServer');

if(cluster.isMaster) {
  console.log(`This is the master process ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', () => cluster.fork()); // Zero down time
} else {
  startServer(3000);
}