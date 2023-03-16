import { config } from 'dotenv';
config({path : './config.env'})

import mongoose from "mongoose";

const DATABASE = process.env.DATABASE;

const connectDB = () => mongoose.connect(DATABASE,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify:false
}).then(()=>{
    console.log("DB connected")
}).catch((e)=>{
    console.log(e.message)
})



export default connectDB;