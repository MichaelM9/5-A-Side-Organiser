import { Request, Response } from "express";
import { GroupService } from "../services/groups";

async function getGroupUsers(req: Request, res: Response) {
  const { groupId } = req.params;

  const users = await GroupService.getUsersByGroupId(groupId);
  if (users) {
    return res.status(200).json(users);
  } else {
    return res.sendStatus(404);
  }
}

async function getGroupGames(req: Request, res: Response) {
  const { groupId } = req.params;

  const games = await GroupService.getGamesByGroupId(groupId);
  if (games) {
    return res.status(200).json(games);
  } else {
    return res.sendStatus(404);
  }
}

async function createNewGroup(req: Request, res: Response) {
  const { groupName } = req.body;

  const user = await GroupService.createGroup(groupName);
  return res.status(200).json(user);
}

async function deleteExistingUser(req: Request, res: Response) {
  const { groupId } = req.params;

  await GroupService.deleteGroup(groupId);
  return res.sendStatus(204);
}

const GroupController = {
  getGroupUsers,
  getGroupGames,
  createNewGroup,
  deleteExistingUser,
};

export { GroupController };
