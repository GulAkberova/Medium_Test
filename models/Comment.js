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
  export default Comment