import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const handleTest = (res, next) => {
  res.locals.user = 1;
  return next();
};

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === "test") return handleTest(res, next);

  if (
    (req.path === "/authentication" || req.path === "/users") &&
    req.method == "POST"
  )
    return next();

  const splitAuth = req.headers.authorization?.split(" ");
  const token = splitAuth && splitAuth.length >= 2 && splitAuth[1];
  if (token) {
    try {
      const tokenVerified = checkTokenValidity(token, "test secret");

      if (tokenVerified) {
        res.locals.user = tokenVerified.sub;
        return next();
      }
    } catch (e) {
      console.log(e);
      return res.status(401).json({
        error: "Access Denied",
      });
    }
  }
  res.status(401).json({
    error: "Access Denied",
  });
};

const checkTokenValidity = (
  token: string,
  secret: string
): string | jwt.JwtPayload => {
  console.log(token, secret);
  return jwt.verify(token, secret);
};

export { authenticate };
