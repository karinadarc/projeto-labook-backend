import { Request, Response } from "express";
import { UserBussiness } from "../bussiness/UserBussiness";
import { BaseController } from "./BaseController";
import { HTTP_STATUS } from "../constants/HttpStatus";
import { SignupSchema } from "../dtos/user/signup.dto";

export class UserController extends BaseController {
  constructor(private userBussiness: UserBussiness) {
    super();
  }

  public signup = async (req: Request, res: Response) => {
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
      return this.responseError(error as Error, res);
    }
  };
}
