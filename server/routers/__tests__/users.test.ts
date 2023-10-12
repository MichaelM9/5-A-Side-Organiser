import request from "supertest";
import { app } from "../../App";

describe("/users", () => {
  describe("GET /users", () => {
    it("respond with json containing a list of users", async () => {
      await request(app)
        .get("/users")
        .set("Accept", "application/json")
        .expect("Content-type", "application/json; charset=utf-8")
        .expect(200);
    });
  });

  describe("GET /users/{userId}", () => {
    it("respond with json containing a user", async () => {
      await request(app)
        .get("/users/1")
        .set("Accept", "application/json")
        .expect("Content-type", "application/json; charset=utf-8")
        .expect(200);
    });

    it("respond with 404 when user not found", async () => {
      await request(app)
        .get("/users/1000")
        .set("Accept", "application/json")
        .expect("Content-type", "text/plain; charset=utf-8")
        .expect(404);
    });
  });

  describe("POST /users", () => {
    const verifyCreateUserValidation = (res) => {
      expect(res.body).toEqual(
        expect.objectContaining({
          error: expect.arrayContaining([
            expect.objectContaining({
              location: "body",
              path: "firstName",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              path: "firstName",
              msg: "the first name must have minimum length of 1",
            }),
            expect.objectContaining({
              location: "body",
              path: "lastName",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              path: "lastName",
              msg: "the last name must have minimum length of 1",
            }),
            expect.objectContaining({
              location: "body",
              path: "email",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              path: "email",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              path: "email",
              msg: "the email must be in a valid email format",
            }),
            expect.objectContaining({
              location: "body",
              path: "password",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              path: "password",
              msg: "the password should have min and max length between 8-16 characters",
            }),
            expect.objectContaining({
              location: "body",
              path: "password",
              msg: "the password should have at least one number",
            }),
            expect.objectContaining({
              location: "body",
              path: "password",
              msg: "the password should have at least one special character",
            }),
          ]),
        })
      );
    };

    it("respond with 201 when user created", async () => {
      const userInput = {
        firstName: "New",
        lastName: "User",
        email: "newuser@email.com",
        password: "Password1!",
      };

      await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .send(userInput)
        .expect("Content-type", "application/json; charset=utf-8")
        .expect(201);
    });

    it("respond with 400 when user not created", async () => {
      await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .send({})
        .expect("Content-type", "application/json; charset=utf-8")
        .expect(400)
        .expect(verifyCreateUserValidation);
    });
  });

  describe("PUT /users/:userId", () => {
      const verifyUpdateUserValidation = (res) => {
      expect(res.body).toEqual(
        expect.objectContaining({
          error: expect.arrayContaining([
            expect.objectContaining({
              location: "body",
              path: "firstName",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              path: "firstName",
              msg: "the first name must have minimum length of 1",
            }),
            expect.objectContaining({
              location: "body",
              path: "lastName",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              path: "lastName",
              msg: "the last name must have minimum length of 1",
            }),
            expect.objectContaining({
              location: "body",
              path: "email",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              path: "email",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              path: "email",
              msg: "the email must be in a valid email format",
            }),
            expect.objectContaining({
              location: "body",
              path: "password",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              path: "password",
              msg: "the password should have min and max length between 8-16 characters",
            }),
            expect.objectContaining({
              location: "body",
              path: "password",
              msg: "the password should have at least one number",
            }),
            expect.objectContaining({
              location: "body",
              path: "password",
              msg: "the password should have at least one special character",
            }),
          ]),
        })
      );
    };

    it("respond with 204 when user updated", async () => {
      const userInput = {
        firstName: "New",
        lastName: "User",
        email: "newuser@email.com",
        password: "Password1!",
      };

      await request(app)
        .put("/users/1")
        .set("Accept", "application/json; charset=utf-8")
        .send(userInput)
        .expect(204);
    });

    it("respond with 400 when user not updated", async () => {
      await request(app)
        .put("/users/1")
        .set("Accept", "application/json")
        .send({})
        .expect(400)
        .expect(verifyUpdateUserValidation);
    });

    it("respond with 404 when no user to update", async () => {
      const userInput = {
        firstName: "New",
        lastName: "User",
        email: "newuser@email.com",
        password: "Password1!",
      };

      await request(app)
        .put("/users/1000")
        .set("Accept", "application/json")
        .send(userInput)
        .expect(404);
    });
  });

  // describe("DELETE /users/:userId", () => {
  //   it("respond with 204 when user deleted", async () => {
  //     await request(app).delete("/users/1").expect(204);
  //   });
  //   it("respond with 404 when no user to delete", async () => {
  //     await request(app).delete("/users/1000").expect(404);
  //   });
  // });
});
