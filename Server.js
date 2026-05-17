require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const immunisationRoutes = require("./src/routes/immunisation");
const childrenRoutes = require("./src/routes/Children");
const growthRoutes = require("./src/routes/growthRecord");
const authRoutes = require("./src/routes/authRoutes");
const { json } = require("stream/consumers");

const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(authRoutes);
app.use(childrenRoutes);
app.use(growthRoutes);
app.use(immunisationRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return (
    res.status(statusCode),
    json({
      status: "error",
      message: err.message || "Something went wrong",
    })
  );
});

app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`));
