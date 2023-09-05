import { Router } from "express";
import { body } from "express-validator";
import { validation } from "../utils/validation";
import { userGroupsRouter } from "./userGroups";
import { UserController } from "../controllers/users";

const usersRouter = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns an array of users
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
usersRouter.get("/", UserController.getAllUsers);

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
 *         required: true
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
usersRouter.get("/:userId", UserController.getUser);

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
usersRouter.post(
  "/",
  [
    body("firstName")
      .isLength({ min: 1 })
      .withMessage("the first name must have minimum length of 1")
      .trim(),
    body("lastName")
      .isLength({ min: 1 })
      .withMessage("the last name must have minimum length of 1")
      .trim(),
    body("email")
      .isLength({ min: 3 })
      .withMessage("the email must have minimum length of 1")
      .isEmail()
      .withMessage("the email must be in a valid email format")
      .trim(),
    body("password")
      .isLength({ min: 8, max: 16 })
      .withMessage(
        "the password should have min and max length between 8-16 characters"
      )
      .matches(/\d/)
      .withMessage("the password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("the password should have at least one special character"),
  ],
  validation.validate,
  UserController.createNewUser
);

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
 *         required: true
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
usersRouter.put(
  "/:userId",
  [
    body("firstName")
      .isLength({ min: 1 })
      .withMessage("the first name must have minimum length of 1")
      .trim(),
    body("lastName")
      .isLength({ min: 1 })
      .withMessage("the last name must have minimum length of 1")
      .trim(),
    body("email")
      .isLength({ min: 3 })
      .withMessage("the email must have minimum length of 1")
      .isEmail()
      .withMessage("the email must be in a valid email format")
      .trim(),
    body("password")
      .isLength({ min: 8, max: 16 })
      .withMessage(
        "the password should have min and max length between 8-16 characters"
      )
      .matches(/\d/)
      .withMessage("the password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("the password should have at least one special character"),
  ],
  validation.validate,
  UserController.updateExistingUser
);

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
 *         required: true
 *         description: The ID of the requested user.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       204:
 *         description: User Deleted
 */
usersRouter.delete("/:userId", UserController.deleteExistingUser);

usersRouter.use("/:userId/groups", userGroupsRouter);

export { usersRouter };
