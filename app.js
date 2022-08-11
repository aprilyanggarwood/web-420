/*
 Title: app.js
 Author: Professor Krasso
 Date: 08/10/2022
 Modified By: April Yang
 Description: Intro to RESTful api
 
*/

const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const mongoose = require("mongoose");

/* Initialize Express */
var app = express();

/* set app port to connect to port 3000  */
app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

/* This library reads your JSDoc-annotated source code and generates an OpenAPI (Swagger) specification. */
const openapiSpecification = swaggerJsdoc(options);
/* Configure express to use /api-docs route to serve swaggerJsdoc  */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

/* Create server and serve application on port 3000 */
http.createServer(app).listen(app.get("port"), function () {
  console.log(`Application started and listening on port ${app.get("port")}`);
});
