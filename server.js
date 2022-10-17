import express from 'express';
import os from 'os';

import getRandom from './random.js';

const PORT=8080

const numCPUs = os.cpus().length;
const app = express();
const info={}

info.num_random=getRandom(0,parseInt(Date.now()));
info.num_cpus=numCPUs;

app.listen(PORT, () => {
    console.log(`Server Port:${PORT}   Worker ${process.pid} started`);
});

app.get('*', (req, res) => {
  console.log(`port: ${PORT} -> fyh: ${Date.now()}`);
  res.send(  
    `Servidor express <span style="color:blueviolet;">(Nginx)</span> en ${PORT} - <b>PID ${
      process.pid
    }</b> - ${new Date().toLocaleString()}`
  );
  
});