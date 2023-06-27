import { Request, Response, Router } from "express";
import { gameUsersRouter } from "./gameUsers";
import { gameGroupsRouter } from "./gameGroups";

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
 *         description: The ID of the requested game.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "date": "2023-1-1", "time": "12:00:00", "location": "Old Trafford" }'
 *       204:
 *         description: No content
 */
gamesRouter.get("/{gameId}", (req: Request, res: Response) => {
  res.send("Hello World");
});

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
 *         description: The ID of the requested game
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Game Deleted
 */
gamesRouter.delete("/{gameId}", (req: Request, res: Response) => {
  res.send("Hello World");
});

gamesRouter.use("/{gameId}/users", gameUsersRouter);
gamesRouter.use("/{gameId}/groups", gameGroupsRouter);

export { gamesRouter };
