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

/* Set app port to connect to port 3000  */
app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

/* Doc: use the http library to create a new server that listens on the port 3000  */
http.createServer(app).listen(app.get("port"), function () {
  console.log(`Application started and listening on port ${app.get("port")}`);
});
