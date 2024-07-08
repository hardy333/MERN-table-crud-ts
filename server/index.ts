import express from "express";
const app = express();
import tablesRouter from "./routes/tables";
import connectDB from "./db/connect";
import cors from "cors";
import notFound from "./middleware/notFound";
import errorHandlerMiddleware from "./middleware/errorHandler";
app.use(cors());

require("dotenv").config();

app.use(express.json());

app.use("/api/v1/tables", tablesRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5001;
const url = process.env.MONGODB_URL;

const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URI);
    await connectDB(url);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}..., param `)
    );
  } catch (error) {
    console.log(error);
  }
};
console.log("hello 123");
start();
