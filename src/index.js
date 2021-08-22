if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const { initializeMongoDB } = require("./db/db.connect");

const specs = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RabiKart API",
      version: "1.0.0",
      description: "Backend API for RabiKart",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
});

const URI = process.env["MONGODB_URI"];
const app = express();
app.use(cors());
app.use(bodyParser.json());
initializeMongoDB(URI);

const authRouter = require("./routes/auth.router");
const productRouter = require("./routes/products.router");
const categoryRouter = require("./routes/category.router");
const userRouter = require("./routes/user.router");
const undefinedRoutesHandler = require("./middlewares/undefinedRoutesHandler");
const errorHandler = require("./middlewares/errorHandler");

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
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
