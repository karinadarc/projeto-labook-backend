import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { addRoutes } from "./router";
import { errorHandler } from "./middleware";
import { HTTP_STATUS } from "./constants/HttpStatus";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

addRoutes(app);

app.use(errorHandler);

app.listen(Number(process.env.PORT) || 3003, () => {
  console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`);
});

app.use(function (req, res, next) {
  res.status(HTTP_STATUS.NOT_FOUND).send({ error: "Não Encontrado." });
});
