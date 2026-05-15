const express=require("express");
const{
    register,
    login,
    logout,
    getMe,
    refreshToken,

}=require("../controllers/authController");
const verifyToken=require("../middleware/verifyToken");
const router=express.Router();
router.post("/login",login);
router.post("/register",register);
router.post("/logout",logout);
router.get("/me",verifyToken,getMe);
router.post("/refresh",refreshToken);
module.exports=router;