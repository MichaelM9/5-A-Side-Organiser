import { Request, Response } from "express";
import { UserService } from "../services/users";
import bcrypt from "bcrypt";

async function getAllUsers(req: Request, res: Response) {
  const users = await UserService.getUsers();

  return res.status(200).json(users);
}

async function getUser(req: Request, res: Response) {
  const { userId } = req.params;

  const user = await UserService.getUserById(userId);
  if (user) {
    return res.status(200).json(user);
  } else {
    return res.sendStatus(404);
  }
}

async function createNewUser(req: Request, res: Response) {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userCreate = await UserService.createUser(
    firstName,
    lastName,
    email,
    hashedPassword
  );

  return res.status(201).json(userCreate);
}

async function updateExistingUser(req: Request, res: Response) {
  const { userId } = req.params;
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userUpdate = await UserService.updateUser(
    userId,
    firstName,
    lastName,
    email,
    hashedPassword
  );

  console.log("1");
  if (userUpdate) {
    return res.sendStatus(204);
  } else {
    // console.log(userUpdate);
    console.log("2");
    return res.sendStatus(404);
  }
}

async function deleteExistingUser(req: Request, res: Response) {
  const { userId } = req.params;

  const userDelete = await UserService.deleteUser(userId);
  if (userDelete) {
    return res.sendStatus(204);
  } else {
    return res.sendStatus(404);
  }
}

async function getUserGroups(req: Request, res: Response) {
  const { userId } = req.params;

  const userGroups = await UserService.getGroupsByUser(userId);
  return res.status(200).json(userGroups);
}

async function addUserToGroup(req: Request, res: Response) {
  const { userId, groupId, roleId } = req.params;

  await UserService.addGroupUser(userId, groupId, roleId);
  return res.status(200);
}

const UserController = {
  getAllUsers,
  getUser,
  createNewUser,
  updateExistingUser,
  deleteExistingUser,
  getUserGroups,
  addUserToGroup,
};

export { UserController };
