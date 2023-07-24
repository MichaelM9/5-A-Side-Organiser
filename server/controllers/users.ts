import { Request, Response } from "express";
import { UserService } from "../services/users";

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

  const user = await UserService.createUser(
    firstName,
    lastName,
    email,
    password
  );
  return res.status(200).json(user);
}

async function updateExistingUser(req: Request, res: Response) {
  const { userId } = req.params;
  const { firstName, lastName, email, password } = req.body;

  await UserService.updateUser(userId, firstName, lastName, email, password);
  return res.sendStatus(204);
}

async function deleteExistingUser(req: Request, res: Response) {
  const { userId } = req.params;

  await UserService.deleteUser(userId);
  return res.sendStatus(204);
}

async function getUserGroups(req: Request, res: Response) {
  const { userId } = req.params;

  const users = await UserService.getGroupsByUser(userId);
  return res.status(200).json(users);
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
