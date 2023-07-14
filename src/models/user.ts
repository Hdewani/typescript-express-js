import mongoose, { Schema, Document } from "mongoose"

interface User extends Document   {
    name:string
    username:string
    email:string
    password:string
}
const userschema = new Schema<User>({
    name:{type:String},
    username:{type:String ,required:true}, 
    email:{
        type:String,
    },
    password:{type:String,required:true},
})



export default mongoose.model<User>("User",userschema)