const fsPromises = require("fs").promises;
const path = require("path");
const http = require("http");
const fs = require('fs')

const PORT = process.env.PORT || 3000;
// to listen and check different file type s
const serveFile = async (response, filePath, contentType) => {
  try {
    const data = await fsPromises.readFile(filePath);
    response.writeHead(200, { "Content-Type": contentType });
    response.end(data);
  } catch (error) {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("404 File was not found ");
  }
};

const server = http.createServer((request, response) => {
  console.log(request.url, request.method);
  const extension = path.extname(request.url);

  // to normalise the filepath
  let filePath;
  // switch case to handle different cases

  switch (request.url) {
    case "/":
    case "/Views/index.html":
      filePath = path.join(__dirname, "Views", "index.html");
      serveFile(response, filePath, "text/html");
      break;
    case "/styles.css":
      filePath = path.join(__dirname, "styles", "styles.css");
      serveFile(response, filePath, "text/css");
      break;
    case "/app.js":
      filePath = path.join(__dirname, "public", "app.js");
      serveFile(response, filePath, "application/javascript");
      break;
    default:
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("404 - Not Found");
  }
});

// const readable = fs.createReadStream('./Views/index.html', { 
//     encoding: 'utf8',
//     highWaterMark: 64 // tiny chunk size so you can SEE it chunking
// });

// readable.on('data', (chunk) => {
//     console.log('--- chunk received ---');
//     console.log(chunk);
// });

// readable.on('end', () => {
//     console.log('--- stream finished ---');
// });

const { Buffer } = require('buffer');

const buf1 = Buffer.alloc(10);
const buf2 = Buffer.alloc(10, 'a');
const buf3 = Buffer.from('Àdéṣọlá');

console.log(buf1);
console.log(buf2);
console.log(buf3);

console.log(buf1.toString());
console.log(buf2.toString());
console.log(buf3.toString());
server.listen(PORT, () => console.log(`server listening on PORT ${PORT}`));
