import { UserService } from "../../services/users";
import { when } from "jest-when";
import { UserController } from "../users";
import { mockRequest, mockResponse } from "../../test-utils";
import { app_user, user_group_role } from "@prisma/client";
import bcrypt from "bcrypt";

jest.mock("../../services/users");
jest.mock("bcrypt");

describe("Users Controller", () => {
  describe("getAllUsers", () => {
    it("should return 200 when users found successfully", async () => {
      const req = mockRequest({});
      const res = mockResponse();

      const users: app_user[] = [];

      when(UserService.getUsers)
        .calledWith()
        .mockReturnValueOnce(Promise.resolve(users));

      await UserController.getAllUsers(req, res);

      expect(UserService.getUsers).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(users);
    });

    it("should return 404 when users are not found", async () => {
      const req = mockRequest({});
      const res = mockResponse();
      const users = undefined as any;

      when(UserService.getUsers)
        .calledWith()
        .mockReturnValueOnce(Promise.resolve(users));

      await UserController.getAllUsers(req, res);

      expect(UserService.getUsers).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("getUser", () => {
    it("should return 200 when user found", async () => {
      const userId = "1";
      const req = mockRequest({ params: { userId: userId } });
      const res = mockResponse();

      const user: app_user = {} as any;

      when(UserService.getUserById)
        .calledWith(userId)
        .mockReturnValueOnce(Promise.resolve(user));

      await UserController.getUser(req, res);

      expect(UserService.getUserById).toHaveBeenCalledTimes(1);
      expect(UserService.getUserById).toHaveBeenCalledWith(userId);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it("should return 404 when user not found", async () => {
      const userId = "1";
      const req = mockRequest({ params: { userId: userId } });
      const res = mockResponse();

      await UserController.getUser(req, res);

      expect(UserService.getUserById).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("createNewUser", () => {
    it("should return 201 when user is created", async () => {
      const mockBody = {
        firstName: "joe",
        lastName: "blogs",
        email: "email@email.com",
        password: "unhashedPassword",
      } as any;
      const hashedPassword = "hashedPassword";

      const req = mockRequest({
        body: mockBody,
      });
      const res = mockResponse();

      when(bcrypt.hash)
        .calledWith(mockBody.password, 10)
        .mockReturnValueOnce(Promise.resolve(hashedPassword));

      when(UserService.createUser)
        .calledWith(
          mockBody.firstName,
          mockBody.lastName,
          mockBody.email,
          hashedPassword
        )
        .mockReturnValueOnce(mockBody);

      await UserController.createNewUser(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith(mockBody.password, 10);
      expect(bcrypt.hash).toHaveBeenCalledTimes(1);
      expect(UserService.createUser).toHaveBeenCalledWith(
        mockBody.firstName,
        mockBody.lastName,
        mockBody.email,
        hashedPassword
      );
      expect(UserService.createUser).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockBody);
    });

    it("should return 400 when error occurs creating a user", async () => {
      const mockBody = {
        firstName: "joe",
        lastName: "blogs",
        email: "email@email.com",
        password: "unhashedPassword",
      } as any;
      const hashedPassword = "hashedPassword";
      const mockReturnValue = undefined as any;

      const req = mockRequest({ body: mockBody });
      const res = mockResponse();

      when(bcrypt.hash)
        .calledWith(mockBody.password, 10)
        .mockReturnValueOnce(Promise.resolve(hashedPassword));

      when(UserService.createUser)
        .calledWith(
          mockBody.firstName,
          mockBody.lastName,
          mockBody.email,
          hashedPassword
        )
        .mockReturnValueOnce(mockReturnValue);

      await UserController.createNewUser(req, res);

      expect(UserService.createUser).toHaveBeenCalledTimes(1);
      expect(UserService.createUser).toHaveBeenLastCalledWith(
        mockBody.firstName,
        mockBody.lastName,
        mockBody.email,
        hashedPassword
      );
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(400);
    });
  });

  describe("updateExistingUser", () => {
    it("should return 204 when user is updated", async () => {
      const userId = "1";
      const mockBody = {
        firstName: "joe",
        lastName: "blogs",
        email: "email@email.com",
        password: "unhashedPassword",
      } as any;
      const hashedPassword = "hashedPassword";

      const req = mockRequest({
        params: { userId: userId },
        body: mockBody,
      });
      const res = mockResponse();

      when(bcrypt.hash)
        .calledWith(mockBody.password, 10)
        .mockReturnValueOnce(Promise.resolve(hashedPassword));

      when(UserService.updateUser)
        .calledWith(
          userId,
          mockBody.firstName,
          mockBody.lastName,
          mockBody.email,
          hashedPassword
        )
        .mockReturnValueOnce(mockBody);

      await UserController.updateExistingUser(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith(mockBody.password, 10);
      expect(bcrypt.hash).toHaveBeenCalledTimes(1);
      expect(UserService.updateUser).toHaveBeenCalledWith(
        userId,
        mockBody.firstName,
        mockBody.lastName,
        mockBody.email,
        hashedPassword
      );
      expect(UserService.updateUser).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it("should return 400 when error occurs updating a user", async () => {
      const userId = "1";
      const mockBody = {
        firstName: "joe",
        lastName: "blogs",
        email: "email@email.com",
        password: "unhashedPassword",
      } as any;
      const hashedPassword = "hashedPassword";
      const mockReturnValue = undefined as any;

      const req = mockRequest({ params: { userId }, body: mockBody });
      const res = mockResponse();

      when(bcrypt.hash)
        .calledWith(mockBody.password, 10)
        .mockReturnValueOnce(Promise.resolve(hashedPassword));

      when(UserService.updateUser)
        .calledWith(
          userId,
          mockBody.firstName,
          mockBody.lastName,
          mockBody.email,
          hashedPassword
        )
        .mockReturnValueOnce(mockReturnValue);

      await UserController.updateExistingUser(req, res);

      expect(UserService.updateUser).toHaveBeenCalledTimes(1);
      expect(UserService.updateUser).toHaveBeenLastCalledWith(
        userId,
        mockBody.firstName,
        mockBody.lastName,
        mockBody.email,
        hashedPassword
      );
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(400);
    });
  });

  describe("deleteExistingUser", () => {
    it("should return 204 when user is deleted", async () => {
      const userId = "1";
      const mockBody = {} as any;

      const req = mockRequest({
        params: { userId },
      });
      const res = mockResponse();

      when(UserService.deleteUser)
        .calledWith(userId)
        .mockReturnValueOnce(mockBody);

      await UserController.deleteExistingUser(req, res);

      expect(UserService.deleteUser).toHaveBeenCalledTimes(1);
      expect(UserService.deleteUser).toHaveBeenCalledWith(userId);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it("should return 404 when no user to delete", async () => {
      const userId = "1";
      const mockReturnValue = undefined as any;

      const req = mockRequest({
        params: { userId },
      });
      const res = mockResponse();

      when(UserService.deleteUser)
        .calledWith(userId)
        .mockReturnValueOnce(mockReturnValue);

      await UserController.deleteExistingUser(req, res);

      expect(UserService.deleteUser).toHaveBeenCalledTimes(1);
      expect(UserService.deleteUser).toHaveBeenCalledWith(userId);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("getUserGroups", () => {
    it("should return 200 when userGroup is found", async () => {
      const userId = "1";
      const mockBody = {
        role: "Admin",
        group: "Test Group",
      } as any;

      const req = mockRequest({ params: { userId: userId } });
      const res = mockResponse();

      const user: user_group_role[] = [];

      when(UserService.getGroupsByUser)
        .calledWith(userId)
        .mockReturnValueOnce(Promise.resolve(mockBody));

      await UserController.getUserGroups(req, res);

      expect(UserService.getGroupsByUser).toHaveBeenCalledTimes(1);
      expect(UserService.getGroupsByUser).toHaveBeenCalledWith(userId);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockBody);
    });
  });

  describe("addUserToGroup", () => {
    it("should return 200 when user is added to Group", async () => {
      const userId = "1";
      const groupId = "1";
      const roleId = "1";

      const req = mockRequest({ params: { userId, groupId, roleId } });
      const res = mockResponse();

      const userGroup: user_group_role = {} as any;

      when(UserService.addGroupUser)
        .calledWith(userId, groupId, roleId)
        .mockReturnValueOnce(Promise.resolve(userGroup));

      await UserController.getUserGroups(req, res);

      expect(UserService.addGroupUser).toHaveBeenCalledTimes(1);
      expect(UserService.addGroupUser).toHaveBeenCalledWith(
        userId,
        groupId,
        roleId
      );
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
