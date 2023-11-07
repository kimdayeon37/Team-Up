const express = require("express");
const logger = require("morgan");

const app = express();
app.set("port", process.env.PORT || 3001);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.static("public"));

const postsRouter = require("./routes/posts");
const categoriesRouter = require("./routes/categories");
const headsRouter = require("./routes/heads");
const likesRouter = require("./routes/likes");
const commentsRouter = require("./routes/comments");
const notificationsRouter = require("./routes/notifications");
const filesRouter = require("./multer/upload");
const calendarsRouter = require("./routes/calendars");

const mainPagesRouter = require("./routes/mainPages");
const usersRouter = require("./routes/users");
const teamsRouter = require("./routes/teams");

app.use("/api/posts/", postsRouter);
app.use("/api/categories/", categoriesRouter);
app.use("/api/heads/", headsRouter);
app.use("/api/likes/", likesRouter);
app.use("/api/comments/", commentsRouter);
app.use("/api/notifications/", notificationsRouter);
app.use("/api/files/", filesRouter);
app.use("/api/calendars/", calendarsRouter);

app.use("/api/mainpages/", mainPagesRouter);
app.use("/api/users/", usersRouter);
app.use("/api/teams/", teamsRouter);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
