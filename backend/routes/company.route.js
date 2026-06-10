import express from 'express'
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/companyController.js';
import isAuth from '../middlewares/isAuth.js';
import { upload } from '../middlewares/multer.js';

const companyRouter=express.Router();

companyRouter.post("/register", isAuth,registerCompany)
companyRouter.get("/get", isAuth,getCompany)
companyRouter.get("/get/:id", isAuth,getCompanyById)
companyRouter.post("/update/:id", isAuth,upload.single('file'),updateCompany)



export default companyRouter;