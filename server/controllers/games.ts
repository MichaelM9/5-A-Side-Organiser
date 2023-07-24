import { Request, Response } from "express";
import { GameService } from "../services/games";

async function getGame(req: Request, res: Response) {
  const { gameId } = req.params;

  const game = await GameService.getGameById(gameId);
  if (game) {
    return res.status(200).json(game);
  } else {
    return res.sendStatus(404);
  }
}

async function updateExistingGame(req: Request, res: Response) {
  const { gameId } = req.params;
  const { date, time, location } = req.body;

  const user = await GameService.updateGame(gameId, date, time, location);
  return res.status(200).json(user);
}

async function deleteExistingGame(req: Request, res: Response) {
  const { gameId } = req.params;

  await GameService.deleteGame(gameId);
  return res.sendStatus(204);
}

async function getGameUsers(req: Request, res: Response) {
  const { gameId } = req.params;

  const game = await GameService.getUsersByGameId(gameId);
  if (game) {
    return res.status(200).json(game);
  } else {
    return res.sendStatus(404);
  }
}

async function addGameUser(req: Request, res: Response) {
  const { gameId, userId } = req.params;

  const user = await GameService.addUserToGame(gameId, userId);
  return res.status(200).json(user);
}

async function createNewGame(req: Request, res: Response) {
  const { groupId } = req.params;
  const { date, time, location } = req.body;

  const user = await GameService.createGame(groupId, date, time, location);
  return res.status(200).json(user);
}

const GameController = {
  getGame,
  updateExistingGame,
  deleteExistingGame,
  getGameUsers,
  addGameUser,
  createNewGame,
};

export { GameController };
