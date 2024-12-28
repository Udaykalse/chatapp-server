import User from "../models/user.model.js";
import Message from "./../models/message.model.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const user = await User.find({
      _id: {
        $ne: loggedInUserId,
      },
    }).select.apply("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUserForSideBar Controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, userToChatId: userToChatId },
        { senderId: userToChatId, userToChatId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessage Controller", error.message);
    res.status(500).json({ error:"Intrnal server error"})
};
};

export const sendMessage = async (req,res)=>{ 
    try {
        const {text,image}=req.body;
        const{id:receiverId}=req.params;
        const senderId=req.user._id;
        let imageUrl;
        if(image){
            const uploadRes=await cloudinary.uploader.upload(image);
            imageUrl=uploadRes.secure_url;
            }
            const newMessage=new Message({
                senderId,
                receiverId,
                text,
                image:imageUrl,
            });
            await newMessage.save();
            // socket.io
            res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in senMessage Controller", error.message);
        res.status(500).json({ error:"Internal server error"})
    }
}