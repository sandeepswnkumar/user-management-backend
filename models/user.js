import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name:{
        type:String,
        uppercase: true
        
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    gender:{
        type:String,
        uppercase: true
    },
    status:{
        type:String,
        uppercase: true
    },
})


export default mongoose.model('user', userSchema);