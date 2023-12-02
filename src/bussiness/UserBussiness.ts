import { UserDatabase } from "../database/UserDatabase";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/user/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/user/signup.dto";
import { UnauthorizedError, UnprocessableEntityError } from "../errors";
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
    const result = await this.userDatabase.getByEmail(signupInput.email);

    if (result) {
      throw new UnprocessableEntityError("E-mail já está em uso.");
    }

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

  public login = async (loginInput: LoginInputDTO): Promise<LoginOutputDTO> => {
    const result = await this.userDatabase.getByEmail(loginInput.email);

    if (result) {
      const user = User.fromDatabaseModel(result);

      if (
        await this.hashService.validate(loginInput.password, user.getPassword())
      ) {
        const payload: TokenPayload = {
          id: user.getId(),
          name: user.getName(),
          role: user.getRole(),
        };
        const token = this.tokenService.generateToken(payload);

        return { token };
      }
    }

    throw new UnauthorizedError("Usuário ou senha inválidos");
  };
}
