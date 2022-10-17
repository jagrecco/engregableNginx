import express from 'express';
import os from 'os';

import getRandom from './random.js';

const PORT=process.argv[2] || 3000

const numCPUs = os.cpus().length;
const app = express();
const info={}

info.num_random=getRandom(0,parseInt(Date.now()));
info.num_cpus=numCPUs;
info.info=`PID:  ${process.pid}` // información enviada para saber qué proceso responde el req


app.listen(PORT, () => {
  console.log(`Server Port:${PORT}   Worker ${process.pid} started`);
});

app.get("/api/ramdoms", (req, res) => {
  console.log(`port: ${PORT} -> fyh: ${Date.now()} PID:  ${process.pid}`);
  res.send(info)
});