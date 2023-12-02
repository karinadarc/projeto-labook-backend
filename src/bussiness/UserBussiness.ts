import { UserDatabase } from "../database/UserDatabase";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/user/signup.dto";
import { TokenPayload } from "../models/Token";
import { USER_ROLES, User } from "../models/User";
import { HashService } from "../services/HashService";
import { IdService } from "../services/IdService";
import { TokenService } from "../services/TokenService";

export class UserBussiness {
  constructor(
    private userDatabase: UserDatabase,
    private tokenService: TokenService,
    private idService: IdService,
    private hashService: HashService
  ) {}

  public signup = async (
    signupInput: SignupInputDTO
  ): Promise<SignupOutputDTO> => {
    const user = new User(
      this.idService.newId(),
      signupInput.name,
      signupInput.email,
      await this.hashService.generate(signupInput.password),
      USER_ROLES.NORMAL,
      new Date().toISOString()
    );

    await this.userDatabase.addUser(user.toDatabaseModel());

    const payload: TokenPayload = {
      id: user.getId(),
      name: user.getName(),
      role: user.getRole(),
    };

    const token = this.tokenService.generateToken(payload);

    return { token };
  };
}
