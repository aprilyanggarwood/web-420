/*
 Title: app.js
 Author: Professor Krasso
 Date: 08/10/2022
 Modified By: April Yang
 Description: Intro to RESTful api
*/

const cors = require("cors");
// const SwaggerUI = require("swagger-ui");
// const pathToSwaggerUi = require("swagger-ui-dist").absolutePath();

const express = require("express"); // yes
const http = require("http"); //yes
const swaggerUi = require("swagger-ui-express"); // yes
const swaggerJsdoc = require("swagger-jsdoc"); //yes
// const yaml = require("yamljs");

// swaggerDocument = yaml.load("./docs/yang-composers.yaml");
const mongoose = require("mongoose"); //yes

const composerAPI = require("./routes/yang-composer-routes.js");
const personAPI = require("./routes/yang-person-routes.js");
var userAPI = require("./routes/yang-session-routes.js");

// const composer01 = require("./routes/composer01.js");
// const SwaggerUI = require("swagger-ui");

/* Initialize Express */
const app = express(); //yes

/* Set app port to connect to port 3000  */
app.set("port", process.env.PORT || 3000); //yes

// app.use(express.static(pathToSwaggerUi));
app.use(express.json()); //yes
app.use(express.urlencoded({ extended: true })); // yes
app.use(cors());

// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

/**
 * MongoDB Atlas connection string
 */
const conn =
  "mongodb+srv://web420_user:s3cret@cluster0.vngflrc.mongodb.net/web420DB?retryWrites=true&w=majority";

mongoose
  .connect(conn, {
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`Connection to web420DB on MongoDB Atlas successful`);
  })
  .catch((err) => {
    console.log(`MongoDB Error: ${err.message}`);
  });

// Doc: define an object literal named options with the following properties/values
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WEB 420 RESTful APIs",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"], // files containing annotations for the OpenAPI Specification
};

/* Doc: call the swaggerJsdoc library using the options object literal. */
const openapiSpecification = swaggerJsdoc(options);
/* Doc: wire the openapiSpecification variable to the app variable. Configure express to use /api-docs route to serve swaggerJsdoc  */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification)); // yes
app.use("/api", composerAPI); // yes
app.use("/api", personAPI); // yes
app.use("/api", userAPI);

/**
 * Example apis
 */
// app.use("/api", composer01);

/* Doc: use the http library to create a new server that listens on the port 3000  */
http.createServer(app).listen(app.get("port"), function () {
  console.log(`Application started and listening on port ${app.get("port")}`);
});
