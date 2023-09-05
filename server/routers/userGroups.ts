import { Router } from "express";
import { UserController } from "../controllers/users";

const userGroupsRouter = Router({ mergeParams: true });

/**
 * @swagger
 * /users/{userId}/groups:
 *   get:
 *     tags: [
 *       userGroups
 *     ]
 *     summary: Returns an array of groups for a user
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "role": "admin", "group": "group uno" },
 *                        { "role": "player", "group": "group two" }]'
 *       204:
 *         description: No content
 */
userGroupsRouter.get("/", UserController.getUserGroups);

/**
 * @swagger
 * /users/{userId}/groups/{groupId}?role={roleId}:
 *   post:
 *     tags: [
 *       users
 *     ]
 *     summary: Adds a user to a group
 *     parameters:
 *       - name: userId
 *         in: path
 *         type: integer
 *         required: true
 *         description: The ID of the requested user.
 *       - name: groupId
 *         in: path
 *         type: integer
 *         required: true
 *         description: The ID of the requested group.
 *       - name: roleId
 *         in: query
 *         type: integer
 *         description: The ID of the desired user role.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: User Added to Group
 */
userGroupsRouter.post("/:groupId", UserController.addUserToGroup);

export { userGroupsRouter };
