const path = require("path");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
// to handle form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// to listen and check different file type s

// const serveFile = async (response, filePath, contentType) => {
//   try {
//     const data = await fsPromises.readFile(filePath);
//     response.writeHead(200, { "Content-Type": contentType });
//     response.end(data);
//   } catch (error) {
//     response.writeHead(404, { "Content-Type": "text/plain" });
//     response.end("404 - File was not found");
//   }
// };

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Views", "index.html"));
});
app.get(/\/Views\/newPage(\.html)?/, (req, res) => {
  res.sendFile(path.join(__dirname, "Views", "newPage.html"));
});

app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`));
