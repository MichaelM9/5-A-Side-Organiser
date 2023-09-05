import express, { json, urlencoded, Request, Response } from "express";
import cors from "cors";
import { authRouter, usersRouter, groupsRouter, gamesRouter } from "./routers";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { authenticate } from "./middleware/authentication";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "5-a-side organiser",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local development server",
    },
  ],
};

const openapiSpecification = swaggerJSDoc({
  swaggerDefinition,
  apis: ["./routers/*.ts"],
});

app.use("/swagger.json", (req, res) =>
  res.json(openapiSpecification).status(200)
);
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(undefined, { swaggerOptions: { url: "/swagger.json" } })
);

app.all("*", authenticate);

app.use("/authentication", authRouter);
app.use("/users", usersRouter);
app.use("/groups", groupsRouter);
app.use("/games", gamesRouter);

export { app };
