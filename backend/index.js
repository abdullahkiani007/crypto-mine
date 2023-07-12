import express from "express";
import connectDb from "./database/index.js";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errorHandling.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import allowCors from "./controller/allowCors.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());
app.use("/storage", express.static("storage"));
console.log(process.env.FRONTEND_URI);
const corsOptions = {
  credentials: true,
  origin: [process.env.FRONTEND_URI, "https://cryptomineapp.vercel.app"],
};
app.options("*", cors(corsOptions));

app.use(cors(corsOptions));
app.use(allowCors);

app.use(routes.testRoute);
app.use(routes.regRoute);
app.use(routes.loginRoute);
app.use(routes.logoutRoute);
app.use(routes.refreshRoute);
app.use(routes.createBlog);
app.use(routes.deleteBlog);
app.use(routes.getAllBlog);
app.use(routes.getBlogById);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started at port 5000");
  connectDb();
});
