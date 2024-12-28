import Team from "../models/team.js";
import Users from "../models/userschema.js";
import cloudinary from "../lib/cloudinary.js";
export const ateam = async(req,res)=>{
    try{
const{name}=req.body;
const team = await Team.findOne({teamName:name});
res.status(200).json(team);
    }
    catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}
export const allteam = async(req,res)=>{
    try{
        const team = await Team.find({});
        res.status(200).json(team);
            }
            catch(e){
                console.log(e);
                res.status(500).json({message:"Internal Server Error"});
            }
}

export const createTeam=async(req,res)=>{
    try{ 
 const {teamName , deadline , project,teamStrength,participants}=req.body;

 const newTeam = new Team({teamName:teamName,deadLine:deadline,projectName:project})
 await newTeam.save();
 console.log(teamStrength);
 for(let i=0;i<teamStrength;i++){
    console.log(participants[i]);
    const User = await Users.findOneAndUpdate({fullName:participants[i]},{TeamName:teamName});
    console.log(`The User Number ${i} is :-`,User)
 }
 console.log(newTeam);
 res.status(201).json(newTeam);

}
catch(error){
    console.log(error);
    res.status(500).json({message:"Internal Server Error"});
}
}

export const UpdateTeam= async(req,res)=>{
    const teamid = req.params.id;
    const {teamName , deadline , project,teamStrength,participants}=req.body;
    try{
    const updatedUser= await Team.findByIdAndUpdate(teamid,{teamName:teamName,deadLine:deadline,projectName:project},{new:true})
    for(let i=0;i<teamStrength;i++){
        console.log(participants[i]);
        const User = await Users.findOneAndUpdate({fullName:participants[i]},{TeamName:teamName});
        console.log(`The User Number ${i} is :-`,User)
     }
     const allpart = await Team.find({});
      res.status(200).json(allpart)}
      catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
      }
   }

export const deleteTeam = async(req,res)=>{
    try{
    const teamid = req.params.id;
    let deleteTeam = await Team.findByIdAndDelete(teamid);
    console.log(deleteTeam);
    let allteam = await Team.find({});
    res.status(200).json(allteam);
}
    catch(error){
        console.log(error);
        res.status(500).json("Internal Server Error");

    }
}
export const teamParticipants = async(req,res)=>{
    try{
    const teamname=req.params.name;
    let allUser = await Users.find({TeamName:teamname});
    console.log(allUser);
    res.status(200).json(allUser);
    }
    catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}


const uploadPPTToCloudinary = async (pptFilePath) => {
    try {
       const uploadResponse = await cloudinary.uploader.upload(pptFilePath, {
        resource_type: "raw", 
        folder: "pdfs",
      });
  
      return uploadResponse.secure_url;
    } catch (error) {
      console.error("Error uploading PPT to Cloudinary:", error);
      throw new Error("Failed to upload PPT");
    }
  };
  
  const handlePPTUpload = async (ppt) => {
    
    try {
      const pptUrl = await uploadPPTToCloudinary(ppt);
      console.log("PPT uploaded successfully:", pptUrl);
      return pptUrl;
    } catch (error) {
      console.error(error.message);
    }
  };
export const submitPpt = async(req,res)=>{
    try{
    const id = req.params.id;
    console.log("The id is :- ",id)
    const {ppt}=req.body;
    let url =await handlePPTUpload(ppt);
    const newteam = await Team.findByIdAndUpdate(id,{ppt:url},{new:true});
    const allteam = await Team.find({})
    res.status(201).json(allteam);
   
    }
    catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"});
    }
}