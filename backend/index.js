import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import connectDb from './config/db.js';
import userRouter from './routes/user.route.js';
import companyRouter from './routes/company.route.js';
import jobRouter from './routes/job.route.js';
import applicationRouter from './routes/application.route.js';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app= express(); 
const PORT=process.env.PORT || 8000

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(cors({
    origin:"https://p-job-porta-f.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true,
}))

app.use('/api/v1/user', userRouter)
app.use('/api/v1/company', companyRouter)
app.use('/api/v1/job', jobRouter)
app.use('/api/v1/application', applicationRouter)
app.use(express.static(path.join(__dirname, "dist")));

app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});

app.listen(PORT,()=>{
    connectDb();
    console.log("Server is listening on", PORT)
})