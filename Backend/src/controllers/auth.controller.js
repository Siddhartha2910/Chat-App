import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const {email, fullName, password} = req.body;
    try{
        if (!email || !fullName || !password){
            return res.status(400).json({
                message: "Please fill all the fields",
            });
        }
        if (password.length < 6){
            return res.status(400).json({
                message: "Password must be at least 6 characters long",
            });
        }
        const user = await User.findOne({email})
        if (user){
            return res.status(400).json({
                message: "User already exists",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            fullName,
            password: hashedPassword,
        });

        if (newUser){
            generateToken(newUser._id, res)
            await newUser.save();
            res.status(201).json({
                message: "User created successfully",
                user: {
                    _id: newUser._id,
                    email: newUser.email,
                    fullName: newUser.fullName,
                    profilepic: newUser.profilepic,
                },
            });
        } else {
            res.status(400).json({
                message: "Invalid User data"
            });
        }

    }catch (error){
        console.log("Error in signup: ", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const login =async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({
                message: "User not found",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect){
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilepic: user.profilepic,
        });

    }catch(error){
        consolw.log("Error in login: ", error.message);
        res.status(500).json({
            message: "Internal server error",
        });

    }

};

export const logout = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({
            message: "User logged out successfully",
        });
    } catch (error) {
        console.log("Error in logout: ", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilepic } = req.body;
    const userId = req.user._id;

    if (!profilepic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilepic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilepic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth: ", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
        
    }
};
