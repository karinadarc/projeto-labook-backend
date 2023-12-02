import express, { Request, Response} from 'express';
import cors from 'cors';
import { addRoutes } from './router';

const app = express();

app.use(express.json());
app.use(cors());

addRoutes(app);

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});