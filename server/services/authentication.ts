import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserService } from "./users";

async function authenticate(email: string, password: string) {
  const user = await UserService.getUserByEmail(email);
  if (user) {
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (passwordCorrect) {
      return await generateTokens(user);
    }
  }
  // throw Error(`Authentication failed: ${email}`);
}

function generateTokens(user: any) {
  return new Promise((response, reject) => {
    try {
      const accessToken = jwt.sign({ sub: user.id }, "test secret", {
        expiresIn: 1000,
      });
      response({ accessToken });
    } catch (error) {
      reject(error);
    }
  });
}

const AuthService = {
  authenticate,
};

export { AuthService };
