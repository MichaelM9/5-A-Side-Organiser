import { Request, Response } from "express";
import { AuthService } from "../services/authentication";

async function authenticate(req: Request, res: Response) {
  const { email, password } = req.body;
  const authenticationTokens = await AuthService.authenticate(email, password);
  if (authenticationTokens) {
    res.status(200).json(authenticationTokens);
  } else {
    res.sendStatus(401);
  }
}
const AuthController = {
  authenticate,
};

export { AuthController };
