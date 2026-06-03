import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import authRoutes from "./src/modules/auth/Auth.routes";
import childrenRoutes from "./src/modules/children/Children.routes";
import growthRoutes from "./src/modules/growthRecords/growthRecords.routes";
import immunisationRoutes from "./src/modules/immunisations/immunisations.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", childrenRoutes);
app.use("/api", growthRoutes);
app.use("/api", immunisationRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    status: "error",
    message: err.message || "Something went wrong",
  });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
}

export default app;