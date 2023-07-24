import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getUsers() {
  return await prisma.app_user.findMany({});
}

async function getUserById(userId: string) {
  return await prisma.app_user.findUnique({
    where: { id: parseInt(userId) },
  });
}

async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  return await prisma.app_user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    },
  });
}

async function updateUser(
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  return await prisma.app_user.update({
    where: {
      id: parseInt(userId),
    },
    data: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    },
  });
}

async function deleteUser(userId: string) {
  return await prisma.app_user.delete({
    where: { id: parseInt(userId) },
  });
}

async function getGroupsByUser(userId: string) {
  const userGroups = await prisma.user_group_role.findMany({
    where: { user_id: parseInt(userId) },
    select: {
      user_role: true,
      user_group: true,
    },
  });

  return userGroups.map((x) => {
    return {
      role: x.user_role.description,
      group: x.user_group.name,
    };
  });
}

async function addGroupUser(userId: string, groupId: string, roleId: string) {
  return await prisma.user_group_role.create({
    data: {
      user_id: parseInt(userId),
      group_id: parseInt(groupId),
      role_id: roleId ? parseInt(roleId) : 3,
    },
  });
}

const UserService = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getGroupsByUser,
  addGroupUser,
};

export { UserService };
