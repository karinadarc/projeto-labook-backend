import userRouter from "./userRouter";
import { Express } from "express";

const addRoutes = (app: Express) => {
    app.use('/users', userRouter);
};

export {addRoutes}
