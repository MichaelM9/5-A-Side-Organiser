import { Request, Response, Router } from "express";

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
 *       - name: gameId
 *         in: path
 *         type: integer
 *         description: The ID of the requested game.
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
 *               groupId:
 *                 type: integer
 *                 required: true
 *                 description: The ID for the group
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: User Added to Group
 */
gameGroupsRouter.post("/:groupId", (req: Request, res: Response) => {
  res.send("Hello World");
});

export { gameGroupsRouter };
