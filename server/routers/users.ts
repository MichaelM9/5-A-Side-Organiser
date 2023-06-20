import { Request, Response, Router } from "express";
import { userGroupsRouter } from "./userGroups";

const usersRouter = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns an array of user items
 *     parameters:
 *       - id: email
 *         in: query
 *         type: string
 *         description: The email search for the user list.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1, "email": "email@test.com", "firstName": "user", "lastName": "last" },
 *                        { "id": 2, "email": "email2@test.com", "firstName": "user2", "lastName": "last2" }]'
 *       204:
 *         description: No content
 */
usersRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns a single user
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
 *                 value: '{ "id": 1, "email": "email@test.com", "firstName": "user", "lastName": "last" }'
 *       204:
 *         description: No content
 */
usersRouter.get("/{userId}", (req: Request, res: Response) => {
  res.send("Hello World");
});

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [
 *       users
 *     ]
 *     summary: Creates a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 required: true
 *                 description: The first name for the user
 *               lastName:
 *                 type: string
 *                 required: true
 *                 description: The last name for the user
 *               email:
 *                 type: string
 *                 required: true
 *                 description: The email for the user
 *               password:
 *                 type: string
 *                 required: true
 *                 description: The password for the user
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: User Created
 */
usersRouter.post("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     tags: [
 *       users
 *     ]
 *     summary: Updates an existing user
 *     parameters:
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
 *               firstName:
 *                 type: string
 *                 required: true
 *                 description: The username for the user
 *               lastName:
 *                 type: string
 *                 required: true
 *                 description: The username for the user
 *               email:
 *                 type: string
 *                 required: true
 *                 description: The email for the user
 *               password:
 *                 type: string
 *                 required: true
 *                 description: The password for the user
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       204:
 *         description: User Updated
 */
usersRouter.put("/{userId}", (req: Request, res: Response) => {
  res.send("Hello World");
});

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     tags: [
 *       users
 *     ]
 *     summary: Deletes an existing user
 *     parameters:
 *       - name: userId
 *         in: path
 *         type: integer
 *         description: The ID of the requested user.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: User Deleted
 */
usersRouter.delete("/{userId}", (req: Request, res: Response) => {
  res.send("Hello World");
});

usersRouter.use("/{userId}/groups", userGroupsRouter);

export { usersRouter };
