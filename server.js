import { config } from 'dotenv';
config({path : './config.env'})

import express from 'express';
import connectDB from './connect/conn.js'
import User from './models/user.js'
import Cors from 'cors';








const app = express();

const PORT = process.env.PORT || 5000;


connectDB();

app.use(express.json());
app.use(Cors());





app.post('/user', async (req, res)=>{

    const {name, email, mobile, status, gender} = req.body;

    if(!name || !email || !mobile || !status || !gender ){
        res.status(500).json({msg : "Fill all data"});
    }

    try {
        
        const userData = await User({name, email, mobile, status, gender});
        await userData.save();
        res.json({ user : userData})

    } catch (error) {
        res.json({msg:"server Error"})
        console.log(error.message)
    }

})
app.get('/users', async (req, res)=>{

    try {
        
        const userData = await User.find();

        if(!userData){
            res.json({ msg : "There is no registrd user"})    
        }
        
        res.json({ data : userData})

    } catch (error) {
        res.json({msg:"server Error"})
    }

})


app.put('/user', async (req, res)=>{

    try {
        
        const id = req.query.id;
        
        if(!id){
            return res.status(500).json({msg : "Invalid User"});
        }
        const userData = await User.findByIdAndUpdate(id, req.body, {new:true});
        if(userData===null){
            return res.status(404).send({ msg : "there is no registrd user for this id"}) 
        }

        res.json({ user : userData})

    } catch (error) {
        res.json({msg:"server Error"})
        console.log(error.message)
    }

})


app.delete('/user/:id', async (req, res)=>{

    try {
       
        const id = req.params.id;
       
        if(!id){
            return res.status(500).json({msg : "Invalid User"});
        }
        const userData = await User.findByIdAndDelete(id);
        
        if(!userData){
            res.json({ msg : "there is no registrd user for this id"}) 
        }

        res.json({ msg : "User Deleted"})

    } catch (error) {
        res.status(500).json({msg:"server Error"})
        
    }

})



app.post('/uploadeUsers', async (req,res)=>{
    try {
        
        const data = req.body;
        const userData = await User.insertMany(data);
        res.json({ user : userData })


    } catch (error) {

        console.log(error)
        res.status(500).json({'msg' : "Internal Server Error"})
        
    }

})


app.delete('/deleteAll', async (req, res)=>{
    try {
        
        const userData = await User.deleteMany();
        
        res.json({ msg : "All User Deleted" })


    } catch (error) {
        res.status(500).json({'msg' : "Internal Server Error"})
        
    }
})




app.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`)
})