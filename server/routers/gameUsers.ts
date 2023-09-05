import { Router } from "express";
import { GameController } from "../controllers/games";

const gameUsersRouter = Router();

/**
 * @swagger
 * /games/{gameId}/users:
 *   get:
 *     tags: [
 *       games
 *     ]
 *     summary: Returns an array of users for a game
 *     parameters:
 *       - name: gameId
 *         in: path
 *         type: integer
 *         description: The ID of the requested game.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "userId": 1, "firstName": "Marcus", "lastName": "Rashford" },
 *                          { "userId": 2, "firstName": "Pep", "lastName": "Guardiola" }]'
 *       204:
 *         description: No content
 */
gameUsersRouter.get("/", GameController.getGameUsers);

/**
 * @swagger
 * /games/{gameId}/users/{userId}:
 *   post:
 *     tags: [
 *       games
 *     ]
 *     summary: Adds a user to a game
 *     parameters:
 *       - name: gameId
 *         in: path
 *         type: integer
 *         description: The ID of the requested game.
 *       - name: userId
 *         in: path
 *         type: integer
 *         description: The ID of the requested user.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: User Added to Game
 */
gameUsersRouter.post("/:userId", GameController.addGameUser);

export { gameUsersRouter };
