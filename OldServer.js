const fsPromises = require("fs").promises;
const path = require("path");
const http = require("http");
const fs = require("fs");

const PORT = process.env.PORT || 3000;
// to listen and check different file type s
const serveFile = async (response, filePath, contentType) => {
  try {
    const isImage = contentType.startsWith("image/");
    const data = await fsPromises.readFile(filePath, isImage ? null : "utf8");
    response.writeHead(200, { "Content-Type": contentType });
    response.end(data);
  } catch (error) {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("404 - File was not found");
  }
};

const server = http.createServer((request, response) => {
  console.log(request.url, request.method);

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
    case "/assets/image.png":
      filePath = path.join(__dirname, "assets", "image.png");
      serveFile(response, filePath, "image/png");
      break;
    default:
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("404 - Not Found");
  }
});

server.listen(PORT, () => console.log(`server listening on PORT ${PORT}`));
