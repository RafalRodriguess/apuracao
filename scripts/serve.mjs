import http from 'node:http';
import app from '../dist/server/index.js';
const port=Number(process.env.PORT||8787);
http.createServer(async(req,res)=>{try{const response=await app.fetch(new Request(`http://localhost:${port}${req.url}`,{method:req.method,headers:req.headers}));res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));}catch(error){res.writeHead(500,{'Content-Type':'text/plain; charset=utf-8'});res.end('Não foi possível atender à solicitação.');console.error(error);}}).listen(port,()=>console.log(`Apura disponível em http://localhost:${port}`));
