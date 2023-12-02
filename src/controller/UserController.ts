import { NextFunction, Request, Response } from "express";
import { UserBussiness } from "../bussiness/UserBussiness";
import { HTTP_STATUS } from "../constants/HttpStatus";
import { SignupSchema } from "../dtos/user/signup.dto";
import { LoginSchema } from "../dtos/user/login.dto";

export class UserController {
  constructor(private userBussiness: UserBussiness) {}

  public signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const signupInput = SignupSchema.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      const output = await this.userBussiness.signup(signupInput);
      console.info("User created:", signupInput.name);

      return res.status(HTTP_STATUS.CREATED).send(output);
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginInput = LoginSchema.parse({
        email: req.body.email,
        password: req.body.password,
      });

      const output = await this.userBussiness.login(loginInput);
      return res.status(HTTP_STATUS.OK).send(output);
    } catch (error) {
      next(error);
    }
  };
}
