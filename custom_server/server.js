const http = require('http')
const fs = require('fs')
const path = require('path')

const port = 3000 ;//lsitening on this port
const server = http.createServer((req , res) =>{
  const filepath = path.join(__dirname, req.url === '/' ? "index.html" : req.url )

  const extName = String(path.extname(filepath)).toLowerCase();
  const mimeTypes= {
    '.html' : 'text/html',
    '.css' : 'text/css',
    '.js' : 'text/css',
    '.png' : 'text/png'
}
const contentType = mimeTypes[extName] || 'application/octet-stream'
 fs.readFile(filepath , (err , content) => {
    if(err){
        if(err.code === 'ENOENT')
            res.writeHead (404,{'Content-Type':"text/html"})
        res.end("404:File Not found yarrrrrrr");
    }else{
        res.writeHead (200,{'content-type' : contentType})
        res.end(content ,'utf-8');
    }
 })
})

server.listen(port, () =>{
    console.log(`server is listening on port ${port}`)
})