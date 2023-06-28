import express from "express";
import connectDb from "./database/index.js";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errorHandling.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());

app.use(cookieParser());
app.use("/storage", express.static("storage"));
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
