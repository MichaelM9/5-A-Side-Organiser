import { Router } from "express";
import { body } from "express-validator";
import { validation } from "../utils/validation";
import { AuthController } from "../controllers/authentication";

const authRouter = Router();

/**
 * @swagger
 * /authentication:
 *   post:
 *     tags: [
 *       authentication
 *     ]
 *     summary: Authenticates a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *                 description: The email address for the user
 *               password:
 *                 type: string
 *                 required: true
 *                 description: The password of the user
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: User Authenticated
 */
authRouter
  .route("/")
  .post(
    [
      body("email")
        .isEmail()
        .withMessage("the email must have a valid value")
        .trim(),
      body("password")
        .isLength({ min: 8, max: 15 })
        .withMessage(
          "your password should have min and max length between 8-15"
        ),
    ],
    validation.validate,
    AuthController.authenticate
  );

export { authRouter };
