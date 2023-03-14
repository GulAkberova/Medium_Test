import User from "../models/User.js";
import Post from "../models/Post.js";

// Read
export const getAllUser = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
};


export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const getUserFriends=async(req,res)=>{
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        const friends =await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        const formattedFriends=friends.map(
            ({_id, firstName, lastName, occupation, location,picturePath})=>{
                return {_id, firstName, lastName, occupation, location,picturePath};
            }
        );
        res.status(200).json(formattedFriends)
    

    }catch(err){
    res.status(404).json({ message: err.message });

    }
  
};

// Update
export const addRemoveFriend=async(req,res)=>{
    try{
        const {id, friendId}= req.params;
        const user= await User.findById(id)
        const friend =await User.findById(friendId)

        if(user.friends.includes(friendId)){
            user.friends=user.friends.filter((id)=>id !== friendId)
            friend.friends=friend.friends.filter((id)=>id !== id)
        }else{
            user.friends.push(friendId);
            friend.friends.push(id)
        }

        await user.save()
        await friend.save()


        const friends =await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        const formattedFriends=friends.map(
            ({_id, firstName, lastName, occupation, location,picturePath})=>{
                return {_id, firstName, lastName, occupation, location,picturePath};
            }
        );
   
        res.status(200).json(formattedFriends)
        
    }catch(err){
    res.status(404).json({ message: err.message });

    }

}


// Follow
export const followUser=async(req,res)=>{
    const { id, followUserId } = req.body;
    try {
        await User.updateOne(
          { _id: id },
          { $push: { following: followUserId } }
        );
        await User.updateOne(
          { _id: followUserId },
          { $push: { followers: id } }
        );
        res.json({ message: "User followed successfully" });
      } catch (err) {
        res.status(500).json(err);
      }

}
export const unfollowUser=async(req,res)=>{
    const { id, followUserId } = req.body;
    try {
    await User.updateOne(
        { _id: id },
        { $pull: { following: followUserId } }
      );
      await User.updateOne(
        { _id: followUserId },
        { $pull: { followers: id } }
      );
      res.json({ message: "User unfollowed successfully" });
    }  catch (err) {
        res.status(500).json(err);
      }
    
}


export const savePost=async(req,res)=>{

  const { userId, postId } = req.params;

  try {
    const user = await User.findById(id);
    const post = await Post.findById(postId);
    if (!user || !post) {
      throw new Error("User or post not found");
    }
  
    const postIndex = User.savedPosts.indexOf(postId);
    if (postIndex === -1) {
      User.savedPosts.push(postId);
    } else {
      User.savedPosts.splice(postIndex, 1);
    }
  
    await User.save();
  
    res.json({ message: "Post saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
  

}