const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserModel = require("../model/userModel");

// Authentication middleware
exports.authenticator = async (req, res, next) => {
  try {
    // Extract token from headers
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "access denied, kindly log in to perform this action." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.secret_key);
    console.log(decoded)
    req.user = decoded.userId;
 

    const user = await UserModel.findById(req.user);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    
    next();
  } catch (error) {   
    res.status(401).json({ message: "Invalid or expired token, please login." });
  }
};

// Make user an admin
exports.makeAdmin = async (req, res) => {
  try {
    const { email } = req.body
    if(!email){
      return res.status(400).json({ message: "email is required" });
    }

    console.log(email)
    const findUser=await UserModel.findOne({email})
    if(findUser.isAdmin===true){
      return res.status(400).json({ message: `${findUser.fullName} is already an admin` });
    }
  
    const user = await UserModel.findOneAndUpdate(
      {email},
      { isAdmin: true },
      { new: true },
      // console.log(user)
    );
    if (!user) {
      return res.status(404).json({ message: "User not found " });
    }
    res.json({ message: `${user.fullName} is now an admin`, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin check middleware
exports.checkAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (user.isAdmin==true ) {
      next();
    } else {
      return res.status(403).json({ message: "Access forbidden: for Admins only" });
    }
  } catch (error) { 
    return res.status(500).json({ message: error.message });
  }
};
