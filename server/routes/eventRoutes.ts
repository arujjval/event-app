import { signIn, login } from "../controllers";
import { Router } from "express";

const userRouter = Router();

userRouter.post('/user/sign-in', signIn);
userRouter.post('/user/login', login);

export default userRouter;