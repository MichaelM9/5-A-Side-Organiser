import { Request, Response, Router } from "express";

const userGroupsRouter = Router({ mergeParams: true });

/**
 * @swagger
 * /users/{userId}/groups:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns an array of groups for a user
 *     parameters:
 *       - name: userId
 *         in: path
 *         type: integer
 *         description: The ID of the requested user.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "groupName": "Premier League" }, { "groupName": "La Liga" }, { "groupName": "Serie A" }]'
 *       204:
 *         description: No content
 */
userGroupsRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

/**
 * @swagger
 * /users/{userId}/groups/{groupId}:
 *   post:
 *     tags: [
 *       groups
 *     ]
 *     summary: Adds a user to a group
 *     parameters:
 *       - name: userId
 *         in: path
 *         type: integer
 *         description: The ID of the requested user.
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
 *               groupName:
 *                 type: string
 *                 required: true
 *                 description: The name for the group
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: User Added to Group
 */
userGroupsRouter.post("/{groupId}", (req: Request, res: Response) => {
  res.send("Hello World");
});

export { userGroupsRouter };
