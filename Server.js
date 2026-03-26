const http = require("http");
const path = require("path");
const fsPromises = require("fs").promises;
const fs = require("fs");
const express = require("express");
const app = express();

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
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Views", "index.html"));
});
app.get(/\/Views\/newPage(\.html)?/, (req, res) => {
  res.sendFile(path.join(__dirname, "Views", "newPage.html"));
});

app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`));
