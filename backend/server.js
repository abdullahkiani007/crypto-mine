import express from "express";
import connectDb from "./database/index.js";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errorHandling.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());
app.use("/storage", express.static("storage"));

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:5173"],
};
app.options("*", cors(corsOptions));

app.use(cors(corsOptions));

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

app.listen(5000, () => {
  console.log("Server started at port 5000");
  connectDb();
});
