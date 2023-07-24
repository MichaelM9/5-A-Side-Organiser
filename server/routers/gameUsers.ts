import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { validation } from "../utils/validation";
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
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: id
 *                 required: true
 *                 description: The ID for the user
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: User Added to Game
 */
gameUsersRouter.post(
  "/:userId",
  [
    body("groupName")
      .isLength({ min: 1 })
      .withMessage("the group name must have minimum length of 1")
      .trim(),
  ],
  validation.validate,

  (req: Request, res: Response) => {
    res.send("Hello World");
  }
);

export { gameUsersRouter };
