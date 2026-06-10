import express from 'express'
import isAuth from '../middlewares/isAuth.js';
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from '../controllers/applicationController.js';

const applicationRouter=express.Router();

applicationRouter.get("/apply/:id", isAuth,applyJob)
applicationRouter.get("/get", isAuth,getAppliedJobs)
applicationRouter.get("/:id/applicants", isAuth,getApplicants)
applicationRouter.post("/status/:id/update", isAuth,updateStatus)

export default applicationRouter;