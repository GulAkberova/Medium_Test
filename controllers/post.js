import Post from "../models/Post.js";
import User from "../models/User.js";



// Create
export const createPost=async(req,res)=>{
    try{
        const {userId, description, picturePath,title}=req.body;
        const user = await User.findById(userId)
        const newPost= new Post({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            location:user.location,
            occupation:user.occupation,
            title,
            description,
            userPicturePath:user.picturePath,
            picturePath,
            likes:[],
            comments:[]

        })
        await newPost.save();

        const post =await Post.find();

        res.status(201).json(post)

    }catch(err){
        res.status(409).json({message:err.message})
    }
}


// Read

export const getFeedPost= async(req,res)=>{
    try{
        const post = await Post.find().sort({ date: 'desc' }).exec()
        res.status(200).json(post);

    }catch(err){
        res.status(404).json({message: err.message})

    }

}

export const getUserPost= async (req,res)=>{
    try{
        const {userId}= req.params;
        const post = await Post.find({userId})
        res.status(200).json(post);

    }catch(err){
        res.status(404).json({message: err.message})

    }
}
// export const getUserId= async(req,res)=>{
//     try{
//         const {userId}= req.params;
//         const user = await User.find({userId})
//         res.status(200).json(user);

//     }catch(err){
//         res.status(404).json({message: err.message})

//     }

// }
export const getUserPostDetail=async(req,res)=>{
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        res.status(200).json(post);
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
}

// Update

export const likePost= async(req, res)=>{
    const {id}=req.params;
        const {userId}=req.body;
    Post.findByIdAndUpdate(id, { $addToSet: { likes: userId } }, { new: true })
  .then((doc) => {
    res.json(doc);
  })
  .catch((error) => {
    res.status(500).json(error);
  });

}

export const dislikePost= async(req, res)=>{
 
    const {id}=req.params;
    const {userId}=req.body;
    Post.findByIdAndUpdate(id, { $pull: { likes: userId } }, { new: true })
  .then((doc) => {
    res.json(doc);
  })
  .catch((error) => {
    res.status(500).json(error);
  });

}
export const comment= async(req, res)=>{
    const {id}=req.params;
    const {userId}=req.body;
    const comment = {
        user: userId,
        comment: req.body.comment,
      };

      try {
        const updatedPost = await Post.findByIdAndUpdate(
            id,
          { $addToSet: { comments: comment } },
          { new: true }
        ).populate({
            path: "comments",
            populate: [
              { path: "user", select: "_id firstName" }
            ],
          })
          .exec();
        res.json(updatedPost);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }

}
