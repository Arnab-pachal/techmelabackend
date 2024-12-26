import express from "express"
import User1 from "../models/userschema.js";
import bcrypt from "bcryptjs"
import { generatetoken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
export const signup = async(req,res)=>{
    const {fullName,password}=req.body;
    console.log(req.body)
    try{
           if(password.length==0){
            return res.status(400).json({message:"Password should not be empty"});
        }
        else{
            const User=await User1.findOne({fullName:fullName});
            console.log(User)
            if(User){return res.status(200).json({message:"User Already Exist"});}
            else{
                const salt = await bcrypt.genSalt(10);
                const hashedPassword =await bcrypt.hash(password,salt);
                const newUser = new User1({
                    fullName:fullName,
                    password:hashedPassword
                })
                if(newUser){
                    console.log(newUser)
                    generatetoken(newUser._id,res);
                    await newUser.save();
                    res.status(200).json({
                    _id : newUser._id,
                    fullName:fullName,
                    password:hashedPassword,
                    profilePic:newUser.profilePic,
                    })
                }
                else{
                    res.status(400).json({message:"Invalid User data"});
                }
            }
        }
    }
    catch(error){
       console.log("Error is SignUp and Controller",error);
       res.status(500).json({message:"Internal Server Errror"});
    }
   }


export const login = async(req,res)=>{
    const{fullName,password}=req.body;
    console.log(req.body)
    try{
        const expUser = await User1.findOne({fullName:fullName});
        console.log(expUser);
       
       const isPasswordCorrect =  await bcrypt.compare(password,expUser.password);
       if(!isPasswordCorrect){res.status(400).json({message:"Invalid Credentials"});}
       else{
        generatetoken(expUser._id,res);
        res.status(200).json({
            id : expUser._id,
            fullName:expUser.fullName,
            profilePic:expUser.profilePic,
        })
       }
    }
    catch(error){
        console.log("Error is Login :-",error.message);
        res.status(500).json({message:"Internal Server Errror"});
    }
    }


export const logout = (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"LoggedOut Successfully"});
    }
    catch(error){
        console.log("Error in logout Controller :-",error);
        res.status(500).json({message:"Internal Server Errror"});
    }
    }

    export const updateProfile = async(req,res)=>{
        try{
            const {profilePic} =req.body;
            
            const userId = req.user._id;
            if(!profilePic){
                return res.status(400).json({message:"Profile Pic is required"});
            }
            const uploadResponse =  await cloudinary.uploader.upload(profilePic);
            const updatedUser = await User1.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});
            res.status(200).json(updatedUser);
        }
        catch(error){
            console.log("error in update profile",error);
            res.status(500).json({message:"Internal Server Error"});
        }
        }
 export const updateName = async(req,res)=>{
    try{
        const {id,name}=req.body;
        console.log(req.body);
        const Profile = await User1.findByIdAndUpdate(id,{fullName: name},{new:true});
        console.log(Profile) 
        res.status(200).json(Profile)

    }catch(error){
        console.log("error in updateName",error);
        res.status(500).json({message:"Internal Server Error"});
    }
 }

        export const checkAuth = (req,res)=>{
            try{
                console.log(req.user)
                res.status(200).json(req.user);
            }
            catch(error){
                console.log("Error in checkAuth Controller",error.message);
                res.status(500).json({message:"Internal Server Error"});
            }
        }