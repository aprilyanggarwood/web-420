/*
  Title: yang-team-routes.js
  Author: Professor Krasso
  Date: 10/04/2022
  Modified By: April Yang
  Description: openapi documentation and Team API 
*/

const express = require("express");
const router = express.Router();
const Team = require("../models/yang-team.js");

// findAllTeams
/**
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     name: findAllTeams
 *     description: Reads,retrieves all teams within database
 *     summary: Returns an array of teams in JSON format.
 *     responses:
 *       '200':
 *         description: A list of teams
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get("/teams", async (req, res) => {
  try {
    Team.find({}, function (err, teams) {
      if (err) {
        res.status(501).send({
          message: `MongoDB Exception:${err}`,
        });
      } else {
        res.json(teams);
      }
    });
  } catch (e) {
    res.status(500).send({
      message: `Server Exception:${e.message}`,
    });
  }
});

// assignPlayerToTeam
/**
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - Teams
 *     name: assignPlayerToTeam
 *     description: API to assign a player to a team.
 *     summary: Assign a player to a team.
 *     operationId: assignPlayerToTeam
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: _id is generated by team document
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Assign a player to a team
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - salary
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Player document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/teams/:id/players", async (req, res) => {
  try {
    Team.findOne({ _id: req.params.id }, function (err, team) {
      if (team) {
        const newPlayer = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          salary: req.body.salary,
        };

        team.players.push(newPlayer);
        team.save();

        res.status(200).json({
          message: "Player Added Document",
        });
      } else if (!team) {
        res.status(401).send("Invalid teamId");
      } else {
        res.status(501).send({ message: `MongoDB Exception! ${err}` });
      }
    });
  } catch (e) {
    res.status(500).send({ message: `Server Exception! ${e.message}` });
  }
});

// findAllPlayersByTeamId
/**
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     tags:
 *        - Teams
 *     name: findAllPlayersByTeamId
 *     description: API to show all players by a team _id
 *     summary: Find all players by a team _id
 *     operationId: findAllPlayersByTeamId
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: _id is generated by team document
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Array of player documents
 *       '401':
 *          description: Invalid teamID
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get("/teams/:id/players", async (req, res) => {
  try {
    Team.findOne({ _id: req.params.id }, function (err, team) {
      if (team) {
        res.json(team.players);
      } else if (!team) {
        res.status(401).send("Invalid teamId");
      } else {
        res.status(501).send({ message: `MongoDB Exception! ${err}` });
      }
    });
  } catch (e) {
    res.status(500).send({ message: `Server Exception! ${e.message}` });
  }
});

// deleteTeamById
/**
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     description: Deletes a team document
 *     summary: Finds a team by Id and deletes this team document
 *     operationId: deleteTeamById
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         scheme:
 *           type: string
 *     responses:
 *       '200':
 *         description: Team document
 *       '401':
 *          description: Invalid teamID
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.delete("/teams/:id", async (req, res) => {
  try {
    Team.findByIdAndDelete({ _id: req.params.id }, function (err, team) {
      if (team) {
        res.status(200).send({
          message: `Team document Delete:${req.params.id}`,
        });
      } else if (!team) {
        res.status(401).send("Invalid teamId");
      } else {
        res.status(501).send({ message: `MongoDB Exception! ${err}` });
      }
    });
  } catch (e) {
    res.status(500).send({ message: `Server Exception! ${e.message}` });
  }
});

// createTeam
/**
 * @openapi
 * /api/teams:
 *   post:
 *     tags:
 *       - Teams
 *     description: Creates a new team document
 *     summary: Create a new team.
 *     operationId: createTeam
 *     requestBody:
 *       description: Team object information.
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             required:
 *               - name
 *               - mascot
 *             properties:
 *               name:
 *                 description: name of team
 *                 type: string
 *               mascot:
 *                 description: mascot of team
 *                 type: string
 *     responses:
 *       '200':
 *         description: Created new team document
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/teams", async (req, res) => {
  try {
    const newTeam = {
      name: req.body.name,
      mascot: req.body.mascot,
    };

    Team.create(newTeam, function (err, team) {
      if (err) {
        res.status(501).send({ message: `MongoDB Exception! ${err}` });
      } else {
        res.json(team);
      }
    });
  } catch (e) {
    res.status(500).send({ message: `Server Exception! ${e.message}` });
  }
});

module.exports = router;