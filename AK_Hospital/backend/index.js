import express,{json}  from 'express';
import dotenv from 'dotenv';
import { userauth } from './Routes/userauth.js';
import adminauth from './Routes/adminauth.js';
import doctorauth from './Routes/doctorauth.js';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();
const app =express();
app.use(json());
app.use(cookieParser());
app.use(cors(({
    origin: 'http://127.0.0.1:8002',
    credentials: true
 })))      
app.use('/',userauth);
app.use('/',adminauth);
app.use('/',doctorauth);


mongoose.connect('mongodb://localhost:27017/ASHOSPITAL').then(()=>{
    console.log("Mongodb connected Successfully to AS_Hospital");})
    .catch((error)=>{
        console.error("Mongodb connection failed",error);
});
app.listen(process.env.PORT,function(){
    console.log(`server is listening at ${process.env.PORT}`);
    
});