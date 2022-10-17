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
  const html=`<div style='border: 1px solid black;padding: 50px;'><h1 style="color:orangered ;">Servidor raíz NGINX</h1> <a target="_blank" style="text-decoration: none; color:darkblue; font-weight: bolder; " href='http://localhost/api/ramdoms/'>Ir a /api/ramdoms</a></div>`
  res.send(
    `Servidor express <span style="color:blueviolet;">(Nginx)</span> en ${PORT} - <b>PID ${
      process.pid
    }</b> - ${new Date().toLocaleString()}  ${html}`
  );
  
});