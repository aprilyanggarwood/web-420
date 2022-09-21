/*
  Title: yang-person-routes.js
  Author: Professor Krasso
  Date: 09/18/2022
  Modified By: April Yang
  Description: openapi documentation and register and login API 
*/

const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("../models/yang-user.js");

// variable saltRounds with an integer value of 10
const saltRounds = 10;

// sign up a user
/**
 * @openapi
 * /api/register:
 *   post:
 *     tags:
 *       - Users
 *     name: register
 *     summary: Register a new user
 *     requestBody:
 *       description: Create a new user with three parameters
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - Password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               Password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Registered user
 *       '401':
 *         description: Username is already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/register", async (req, res) => {
  try {
    let hashedPassword = bcrypt.hashSync(req.body.Password, saltRounds); // salt/hash the password
    let newRegisteredUser = {
      userName: req.body.userName,
      Password: hashedPassword,
      emailAddress: req.body.emailAddress,
    };
    User.findOne({ userName: req.body.userName }, function (err, user) {
      if (err) {
        res.status(501).send({
          message: `MongoDB Exception ${err}`,
        });
      } else {
        if (!user) {
          User.create(newRegisteredUser, function (err, user) {
            if (err) {
              res.status(501).send({
                message: `MondoDB Exception: ${err}`,
              });
            } else {
              res.status(200).send({
                message: "Registered User",
              });
              res.json(user);
            }
          });
        } else {
          if (user) {
            res.status(401).send({
              message: "Username is already in use",
            });
          }
        }
      }
    });
  } catch (e) {
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

// log in a user
/**
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Users
 *     name: login
 *     summary: Log in a user
 *     requestBody:
 *       description: Log in a user with two properties
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - Password
 *             properties:
 *               userName:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid username and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/login", async (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, function (err, user) {
      if (err) {
        res.status(501).send({
          message: `MongoDB Exception:${err}`,
        });
      } else {
        if (user) {
          let passwordIsValid = bcrypt.compareSync(
            req.body.Password,
            user.Password
          );

          if (passwordIsValid) {
            res.status(200).send({
              message: `User logged in`,
            });
          } else {
            res.status(401).send({
              message: `Invalid username and/or password`,
            });
          }
        } else {
          if (!user) {
            res.status(401).send({
              message: "Invalid username and/or password",
            });
          }
        }
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e}`,
    });
  }
});

module.exports = router;
