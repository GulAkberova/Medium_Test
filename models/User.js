import mongoose, { Schema } from "mongoose";

const UserSchema= new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            min:2,
            max:50,
        },
        lastName:{
            type:String,
            required:true,
            min:2,
            max:50,
        },
        email:{
            type:String,
            required:true,
            min:2,
            max:50,
            unique:true
        },
        password:{
            type:String,
            required:true,
            min:5,
        },
        picturePath:{
            type:String,
            default:""

        },
        friends:{
            type:Array,
            default:[]
        },
        followers: [
            {
              type: Schema.Types.ObjectId,
              ref: "User",
            },
          ],
          following: [
            {
              type: Schema.Types.ObjectId,
              ref: "User",
            },
          ],
        location:String,
        occupation:String,
        viewedProfile:Number,
        impressions:Number,
     
          savedPosts: [
            {
              type: Schema.Types.ObjectId,
              ref: "Post",
            },
           
          ],
          isDeleted:{
            type: Boolean,
            default: false,
          },
    },
    {timestamps:true}
);
const User= mongoose.model("User", UserSchema)

export default User