import mongoose  from "mongoose";
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    }
    ,
    password:{
        type:String,
        required :true,
        },
    profilePic:{
        type:String,
        default:""
    },
  
},{timestamps:true})
const Users = mongoose.model("Users",userSchema)
export default Users;