import cluster from 'cluster'
import express from 'express';
import os from 'os';

import getRandom from './random.js';

/* const PORT=process.argv[2] || 8080 */
const PORT=8081

const numCPUs = os.cpus().length;
const app = express();
const info={}

info.num_random=getRandom(0,parseInt(Date.now()));
info.num_cpus=numCPUs;



if (cluster.isPrimary) {
    console.log(`I am a master ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker) => {
      console.log(`${worker.process.pid} is finished`);
    });
  } else {

    app.listen(PORT, () => {
      console.log(`Server Port:${PORT}   Worker ${process.pid} started`);
    });
    
}

app.get("/api/ramdoms", (req, res) => {
  console.log(`port: ${PORT} -> fyh: ${Date.now()}`);
  res.send(info)
});