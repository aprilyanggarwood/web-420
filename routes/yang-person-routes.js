/*
 Title: yang-person-routes.js
 Author: Professor Krasso
 Date: 09/11/2022
 Modified By: April Yang
 Description: openapi documentation and Persons API 
*/

const express = require("express");
const router = express.Router();
const Person = require("../models/yang-person.js");

// findAllPersons
/**
 * @openapi
 * /api/persons:
 *    get:
 *      tags:
 *        - Persons
 *      description: Reads,retrieves all persons within database
 *      summary: Returns an array of person in JSON format.
 *      operationId: findAllPersons
 *      responses:
 *        '200':
 *         description: A list of composers
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get("/persons", (req, res) => {
  try {
    /* Mongoose find one function */
    Person.find({}, function (err, persons) {
      if (err) {
        res.status(501).send("MongoDB Exception");
      } else {
        res.json(persons);
      }
    });
  } catch (error) {
    res.status(500).send("Server Exception");
    console.log(error);
  }
});

// createPerson
/**
 * @openapi
 * /api/persons:
 * post:
 *     tags:
 *       - Persons
 *     description: Adds a new person object to database
 *     summary: Create a new person.
 *     operationId: createPerson
 *     requestBody:
 *       description: Person object information.
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             required:
 *               - firstName
 *               - lastName
 *               - roles
 *               - dependents
 *               - birthDate
 *             properties:
 *               firstName:
 *                 description: first name of composer
 *                 type: string
 *               lastName:
 *                 description: last name of composer
 *                 type: string
 *               roles:
 *                 description: Roles
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *               dependents:
 *                 description: Array of dependantSchema
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *               birthDate:
 *                 description: Birth date
 *                 type: string
 *     responses:
 *       '200':
 *         description: Created new person Object
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/persons", async (req, res) => {
  try {
    let newPerson = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      roles: req.body.roles,
      dependents: req.body.dependents,
      birthDate: req.body.birthDate,
    };

    Person.create(newPerson, function (err, person) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(person);
        res.json(person);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

module.exports = router;
