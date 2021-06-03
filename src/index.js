require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initializeMongoDB } = require("./db/db.connect");

const URI = process.env["MONGODB_URI"];
const app = express();
app.use(cors());
app.use(bodyParser.json());
initializeMongoDB(URI);

const insertintodb = require("./routes/insertintodb.router");
const authRouter = require("./routes/auth.router");
const productRouter = require("./routes/products.router");
const categoryRouter = require("./routes/category.router");
const userRouter = require("./routes/user.router");
const undefinedRoutesHandler = require("./middlewares/undefinedRoutesHandler");
const errorHandler = require("./middlewares/errorHandler");

app.get("/", (req, res) => {
  res.send("Welcome to RabiKart server");
});

app.use("/insert", insertintodb);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use(undefinedRoutesHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started ar port: ${PORT}`);
});
