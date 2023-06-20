import { Request, Response, Router } from "express";

const groupsRouter = Router();

/**
 * @swagger
 * /groups/{groupId}/users:
 *   get:
 *     tags: [
 *       groups
 *     ]
 *     summary: Returns an array of users for a group
 *     parameters:
 *       - name: groupId
 *         in: path
 *         type: integer
 *         description: The ID of the requested group.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "name": "Premier League",
 *                           "users": [{ "userId": 1, "firstName": "Marcus", "lastName": "Rashford" },
 *                                     { "userId": 2, "firstName": "Pep", "lastName": "Guardiola" }] }'
 *       204:
 *         description: No content
 */
groupsRouter.get("/{groupId}/users", (req: Request, res: Response) => {
  res.send("Hello World");
});

/**
 * @swagger
 * /groups/{groupId}/games:
 *   get:
 *     tags: [
 *       groups
 *     ]
 *     summary: Returns an array of games for a group
 *     parameters:
 *       - name: groupId
 *         in: path
 *         type: integer
 *         description: The ID of the requested group.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "games": [ "game1", "game2", "game3" ] }'
 *       204:
 *         description: No content
 */
groupsRouter.get("/{groupId}/games", (req: Request, res: Response) => {
  res.send("Hello World");
});

/**
 * @swagger
 * /groups:
 *   post:
 *     tags: [
 *       groups
 *     ]
 *     summary: Creates a new group
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupName:
 *                 type: string
 *                 required: true
 *                 description: The name for the group
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Group Created
 */
groupsRouter.post("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

/**
 * @swagger
 * /groups/{groupId}:
 *   delete:
 *     tags: [
 *       groups
 *     ]
 *     summary: Deletes an existing group
 *     parameters:
 *       - name: groupId
 *         in: path
 *         type: integer
 *         description: The ID of the requested group.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Group Deleted
 */
groupsRouter.delete("/{groupId}", (req: Request, res: Response) => {
  res.send("Hello World");
});

export { groupsRouter };
