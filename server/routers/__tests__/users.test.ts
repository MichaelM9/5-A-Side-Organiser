import { Response } from "express";
import request from "supertest";
import { app } from "../../App";

describe("/users", () => {
  describe("GET /users", () => {
    it("respond with json containing a list of users", async () => {
      await request(app)
        .get("/users")
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .expect(200);
    });
  });

  describe("GET /users/{userId}", () => {
    it("respond with json containing a user", async () => {
      await request(app)
        .get("/users/1")
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .expect(200);
    });

    it("respond with 404 when user not found", async () => {
      await request(app)
        .get("/users/1000")
        .set("Accept", "application/json")
        .expect(404);
    });
  });
});
