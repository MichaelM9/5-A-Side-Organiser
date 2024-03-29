import { Router } from "express";
import { gameUsersRouter } from "./gameUsers";
import { gameGroupsRouter } from "./gameGroups";
import { GameController } from "../controllers/games";

const gamesRouter = Router();

/**
 * @swagger
 * /games/{gameId}:
 *   get:
 *     tags: [
 *       games
 *     ]
 *     summary: Returns a single game
 *     parameters:
 *       - name: gameId
 *         in: path
 *         type: integer
 *         required: true
 *         description: The ID of the requested game.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "kickoffDate": "2023-1-1", "kickoffTime": "12:00:00", "venue": "Old Trafford" }'
 *       204:
 *         description: No content
 */
gamesRouter.get("/:gameId", GameController.getGame);

/**
 * @swagger
 * /games/{gameId}:
 *   post:
 *     tags: [
 *       game
 *     ]
 *     summary: Updates an existing game
 *     parameters:
 *       - name: gameId
 *         in: path
 *         type: integer
 *         required: true
 *         description: The ID of the requested game.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               kickoffDate:
 *                 type: string
 *                 required: true
 *                 description: The date for the game
 *               kickoffTime:
 *                 type: string
 *                 required: true
 *                 description: The kickoff time for the game
 *               venue:
 *                 type: string
 *                 required: true
 *                 description: The venue for the group
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Game Updated
 */
gamesRouter.put("/:groupId", GameController.updateExistingGame);

/**
 * @swagger
 * /games/{gameId}:
 *   delete:
 *     tags: [
 *       games
 *     ]
 *     summary: Deletes an existing game
 *     parameters:
 *       - name: gameId
 *         in: path
 *         type: integer
 *         required: true
 *         description: The ID of the requested game
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       204:
 *         description: Game Deleted
 */
gamesRouter.delete("/:gameId", GameController.deleteExistingGame);

gamesRouter.use("/:gameId/users", gameUsersRouter);
gamesRouter.use("/:gameId/groups", gameGroupsRouter);

export { gamesRouter };
