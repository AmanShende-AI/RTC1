import express from 'express'
import isAuth from '../middlewares/isAuth.js';
import { getAdminJobs, getAllJobs, getJobById, postJob } from '../controllers/jobController.js';

const jobRouter=express.Router();

jobRouter.post("/post", isAuth,postJob)
jobRouter.get("/get", isAuth,getAllJobs)
jobRouter.get("/getadminjobs", isAuth,getAdminJobs)
jobRouter.get("/get/:id", isAuth,getJobById)


export default jobRouter;