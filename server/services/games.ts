import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getGameById(gameId: string) {
  return await prisma.game.findUnique({
    where: { id: parseInt(gameId) },
  });
}

async function updateGame(
  gameId: string,
  date: string,
  time: string,
  location: string
) {
  return await prisma.game.update({
    where: { id: parseInt(gameId) },
    data: {
      game_date: date,
      game_time: time,
      game_location: location,
    },
  });
}

async function deleteGame(gameId: string) {
  return await prisma.game.delete({
    where: { id: parseInt(gameId) },
  });
}

async function getUsersByGameId(gameId: string) {
  const gameUsers = await prisma.game_user_group_role.findMany({
    where: { game_id: parseInt(gameId) },
    select: {
      user_group_role: true,
    },
  });

  return gameUsers.map((x) => {
    return {
      userId: x.user_group_role.user_id,
    };
  });
}

async function addUserToGame(gameId: string, userId: string) {
  return await prisma.game_user_group_role.create({
    data: {
      game_id: parseInt(gameId),
      user_group_role_id: parseInt(userId),
    },
  });
}

async function createGame(
  groupId: string,
  date: string,
  time: string,
  location: string
) {
  return await prisma.game.create({
    data: {
      group_id: parseInt(groupId),
      game_date: date,
      game_time: time,
      game_location: location,
    },
  });
}

const GameService = {
  getGameById,
  updateGame,
  deleteGame,
  getUsersByGameId,
  addUserToGame,
  createGame,
};

export { GameService };
