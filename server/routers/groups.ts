import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { validation } from "../utils/validation";
import { GroupController } from "../controllers/groups";

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
 *                 value: '[{ "userId": 1, "firstName": "Marcus", "lastName": "Rashford" },
 *                          { "userId": 2, "firstName": "Pep", "lastName": "Guardiola" }]'
 *       204:
 *         description: No content
 */
groupsRouter.get("/:groupId/users", GroupController.getGroupUsers);

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
 *                 value: '[ { "gameId": 1 }, { "gameId": 2 }, { "gameId": 3 } ]'
 *       204:
 *         description: No content
 */
groupsRouter.get("/:groupId/games", GroupController.getGroupGames);

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
groupsRouter.post(
  "/",
  [
    body("groupName")
      .isLength({ min: 1 })
      .withMessage("the group name must have minimum length of 1")
      .trim(),
  ],
  validation.validate,

  GroupController.createNewGroup
);

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
 *         required: true
 *         description: The ID of the requested group.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       204:
 *         description: Group Deleted
 */
groupsRouter.delete("/:groupId", GroupController.deleteExistingUser);

export { groupsRouter };
