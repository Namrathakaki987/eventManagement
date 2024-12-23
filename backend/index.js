import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js"
import cors from "cors"

import attendeeRoute from "./routes/attendeeRoutes.js";
import eventRoute from "./routes/eventRoutes.js";
import taskRoute from "./routes/taskRoutes.js";
import cookieParser from "cookie-parser";




dotenv.config({
    path:".env"
})

const app=express();
//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser());
const corsOptions={
    origin:'http://localhost:3000',
    credentials:true
}
app.use(cors(corsOptions));

//api
app.use("/api/v1/user",userRoute);
app.use("/api/v1/attendee", attendeeRoute);
app.use("/api/v1/event", eventRoute);
app.use("/api/v1/task", taskRoute);




mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    console.log('Connected to the database')
    app.listen(process.env.PORT,()=>{
        console.log(`App is listening in port: ${process.env.PORT}`);
    });
})

.catch(err => console.log("Failed" + err))