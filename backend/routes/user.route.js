import express from 'express'
import { getProfile, login, logout, registerUser, updateProfile } from '../controllers/userController.js';
import isAuth from '../middlewares/isAuth.js';
import { upload } from '../middlewares/multer.js';

const userRouter=express.Router();

userRouter.post("/register", upload.single('file'),registerUser)
userRouter.post("/login", login);
userRouter.post("/profile/update",isAuth,upload.single("file"),updateProfile)
userRouter.get("/logout", logout)
userRouter.get("/profile",isAuth,getProfile)

export default userRouter;
