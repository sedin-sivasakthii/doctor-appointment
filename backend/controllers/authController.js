const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const fs=require("fs");
// const path=require("path");

// const usersFilePath =path.join(
//     __dirname,
//     "../data/users.json"
// )
const users =require("../data/users.json");
const register = async (req,res)=>
{
      try
        {
            const{name,email,password}=req.body;
            if(!name||!email||!password)
            {
                return res.json({
                    message :"All fields are required",
                });
            }
            const existingUser =users.find(
                (user)=>user.email===email
            );
            if(existingUser)
            {
                return res.json({
                    message :"User already exists",
                });
            }
            const hashedpass =await bcrypt.hash(
                password,10
            );
            const newuser ={
                id:Date.now(),
                name,
                email,
                password :hashedpass,
            };
            users.push(newuser);

            fs.writeFileSync(
                "./data/users.json",
                JSON.stringify(users,null,2)
            );

            res.json({
                success:true,
                message:"Register successful",
            });
        }
        catch(error)
        {
            res.json({
                message:error.message,
            });
        }
};
const login =async (req,res)=>{
    try
    {
        const{email,password} =req.body;
        const user =users.find(
                (user) => user.email === email
            );
        if(!user)
        {
            return res.json({
                message :"Invalid email or password",
            });
        }
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );
        if(!isMatch)
        {
            return res.json({
            message:"Invalid email or password",
            });
        }

        const token =jwt.sign(
            {
                id:user.id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1d",
            }
        );
        res.json({
            success:true,
            message:"Login successful",
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
            },
        });
        
    }
    catch(error)
    {
            res.json({
                message:error.message,
            });
        
    }
};
const logout =(req,res)=>
{
    res.json(
        {
            success:true,
            message:"Logout successful",
        }
    );
};
const getMe =(req,res)=>
{
    try
    {
        const user =users.find(
            (user)=>user.id===req.user.id
        );
        if(!user)
        {
            return res.json(
                {
                    message:"User not found",
                }
            );
        }
        res.json({
            success:true,
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
            },
        });
    }catch(error)
    {
        res.json({
            message:error.message,
        });
    }
};
// const refreshToken=(req,res)=>
// {
//     try
//     {
//         const authHeader =req.headers.authorization;
//         if(!authHeader)
//         {
//             return res.json({
//                 message:"No token provided",
//             });
//         }
//         const oldToken=authHeader.split(" ")[1];
//         const decoded=jwt.verify(
//             oldToken,
//             process.env.JWT_SECRET
//         );
//         const newToken=jwt.verify(

//         )
//     }
// }
module.exports =
{
    register,
    login,
    logout,
    getMe,
};