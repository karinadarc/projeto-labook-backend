import express from "express";
import { UserController } from "../controller/UserController";
import { UserBussiness } from "../bussiness/UserBussiness";
import { UserDatabase } from "../database/UserDatabase";
import { TokenService } from "../services/TokenService";
import { IdService } from "../services/IdService";
import { HashService } from "../services/HashService";

const userRouter = express.Router();

const userController = new UserController(
  new UserBussiness(
    new UserDatabase(),
    new TokenService(),
    new IdService(),
    new HashService()
  )
);

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);

export default userRouter;
