import { Router } from "express";
import { GameController } from "../controllers/games";

const gameGroupsRouter = Router();

/**
 * @swagger
 * /games/groups/{groupId}:
 *   post:
 *     tags: [
 *       games
 *     ]
 *     summary: Creates a game for a group
 *     parameters:
 *       - name: groupId
 *         in: path
 *         type: integer
 *         description: The ID of the requested group.
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
 *                 description: The time for the game
 *               venue:
 *                 type: string
 *                 required: true
 *                 description: The venue for the game
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Game added to Group
 */
gameGroupsRouter.post("/:groupId", GameController.createNewGame);

export { gameGroupsRouter };
