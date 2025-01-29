import { signIn } from "../controllers";
import { Router } from "express";

const userRouter = Router();

userRouter.post('/user/sign-in', signIn);

export default userRouter;