const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const fs=require("fs");

const users =require("../data/users.json");
const register = async (req,res)=>
{
      try
        {
            let {name,email,password}=req.body;
            const trimmedName = name?.toString().trim();
            const trimmedEmail = email?.toString().trim();
            const passwordValue = password?.toString();

            if(!trimmedName || !trimmedEmail || !passwordValue || !passwordValue.trim())
            {
                return res.status(400).json({
                    message :"All fields are required",
                });
            }

            if(!/^[A-Za-z]/.test(trimmedName))
            {
                return res.status(400).json({
                    message: "Name must start with a letter",
                });
            }

            if(passwordValue.trim().length < 6)
            {
                return res.status(400).json({
                    message: "Password must be at least 6 characters",
                });
            }

            const existingUser =users.find(
                (user)=>user.email===trimmedEmail
            );
            if(existingUser)
            {
                return res.status(400).json({
                    message :"User already exists",
                });
            }
            const hashedpass =await bcrypt.hash(
                passwordValue,10
            );
            const newuser ={
                id:Date.now(),
                name: trimmedName,
                email: trimmedEmail,
                password :hashedpass,
            };
            users.push(newuser);

            fs.writeFileSync(
                "./data/users.json",
                JSON.stringify(users,null,2)
            );

            res.status(201).json({
                success:true,
                message:"Register successful",
            });
        }
        catch(error)
        {
            res.status(500).json({
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
            return res.status(400).json({
                message :"Invalid email or password",
            });
        }
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );
        if(!isMatch)
        {
            return res.status(400).json({
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
            res.status(500).json({
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
            return res.status(404).json(
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
        res.status(500).json({
            message:error.message,
        });
    }
};
const refreshToken=(req,res)=>
{
    try
    {
        const authHeader =req.headers.authorization;
        if(!authHeader)
        {
            return res.status(401).json({
                message:"No token provided",
            });
        }
        const oldToken=authHeader.split(" ")[1];
        const decoded=jwt.verify(
            oldToken,
            process.env.JWT_SECRET
        );
        const newToken=jwt.sign(
            {
                id:decoded.id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1d",
            }

        );
        res.json({
            success:true,
            token:newToken,
        });

    }catch(error)
    {
        res.status(401).json({
            success:false,
            message:"Invalid or expired token",
        });
    }
};
module.exports =
{
    register,
    login,
    logout,
    getMe,
    refreshToken,
};