import mongoose, { Schema } from "mongoose";
const commentSchema = new Schema(
    {
        comment: {
            type: String,
          },

        user:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
    },
    { timestamps: true }
  );
  
  commentSchema.virtual("firstName", {
    ref: "User",
    localField: "user",
    foreignField: "_id",
    justOne: true,
    select: "firstName",
  });

  const Comment = mongoose.model("Comment", commentSchema);

const PostSchema=mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        friends:{
            type:Array,
            default:[
               
            ]
        },
        occupation:String,
        location:String,
        title:String,
        description:String,
        picturePath:String,
        userPicturePath:String,
        readProfile:Number,
        likes: [
            {
              type: Schema.Types.ObjectId,
              ref: "User",
            },
          ],
        comments: [commentSchema],
        

    },
    {timestamps:true}
);
const Post=mongoose.model("Post",PostSchema)

export default Post
