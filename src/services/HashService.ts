import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export class HashService {
  public generate = async (plaintext: string): Promise<string> => {
    const rounds = Number(process.env.BCRYPT_COST);
    const salt = await bcrypt.genSalt(rounds);
    return await bcrypt.hash(plaintext, salt);
  };

  public validate = async (
    plaintext: string,
    hash: string
  ): Promise<boolean> => {
    return bcrypt.compare(plaintext, hash);
  };
}
