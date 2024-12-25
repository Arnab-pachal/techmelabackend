import express from "express"
import User from "../models/userschema.js";
import Messages from "../models/message.model.js";
import bcrypt from "bcryptjs"
import { generatetoken } from "../lib/utils.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import cloudinary from "../lib/cloudinary.js";
export const getUsersForSidebar=async(req,res)=>{
    try{
        const loginUserId = req.user._id;
        const filteredUser =  await User.find({_id : {$ne:loginUserId}}).select("-password");
        res.status(200).json(filteredUser);
    }
    catch(error){
     console.error("error in GetUserSideBar :- ",error);
     res.status(500).json({message:"Internal Server Error"});
    }
}
export const getMessages = async(req,res)=>{
    try{
    const messages = await Messages.find({})
    res.status(200).json(messages);
}
catch(error){
    console.log("Error in getMessage Controller",error.message);
    res.status(500).json({message:"Internal Server Error"});
}
}
export const sendMessages = async(req,res)=>{
    const {text,image,senderId}=req.body;
    console.log(req.body)
    const profile = await User.findById(senderId);
    console.log(profile)
    let imageUrl;
    if(image){
        const uploadResponse =  await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Messages({
        senderId,
        senderName:profile.fullName,
        senderProfile:profile.profilePic,
        text,
        image:imageUrl,
    });
    await newMessage.save();
    //todo  realtime functionality socket.io

    res.status(201).json(newMessage) //status code 201 means a resource  have been created
}
export const deletemsg = async(req,res)=>{
    console.log(req.params.id);
    try{
    const msg = await Messages.findByIdAndDelete(req.params.id);
    console.log(msg);
    res.status(200).json("Working correctly");}
    catch(error){
        console.log("Some error in deleting Route :- ",error);
        res.status(500).json({message : "Internal Server Error"});
    }
}