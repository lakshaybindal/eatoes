import express from "express";
import cors from "cors";
const app = express();
import userRouter from "./user";
import adminRouter from "./admin";
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
