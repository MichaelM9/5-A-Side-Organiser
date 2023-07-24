import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getUsersByGroupId(groupId: string) {
  const groupUsers = await prisma.user_group_role.findMany({
    where: { group_id: parseInt(groupId) },
    select: {
      app_user: true,
      user_role: true,
    },
  });

  return groupUsers.map((x) => {
    return {
      userId: x.app_user.id,
      userFirstName: x.app_user.first_name,
      userLastName: x.app_user.last_name,
      role: x.user_role.description,
    };
  });
}

async function getGamesByGroupId(groupId: string) {
  return await prisma.game.findMany({
    where: { group_id: parseInt(groupId) },
  });
}

async function createGroup(groupName: string) {
  return await prisma.user_group.create({
    data: {
      name: groupName,
    },
  });
}

async function deleteGroup(groupId: string) {
  return await prisma.user_group.delete({
    where: { id: parseInt(groupId) },
  });
}

const GroupService = {
  getUsersByGroupId,
  getGamesByGroupId,
  createGroup,
  deleteGroup,
};

export { GroupService };
