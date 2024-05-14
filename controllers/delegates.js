import Delegate from "../models/Delegates.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { getToken } from "../utils/getToken.js";
import { verifyToken } from "../utils/verifyToken.js";
import { comparePassword } from "../utils/comparePassword.js";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: `${process.env.NAME}`,
  api_key: process.env.KEY,
  api_secret: `${process.env.SECRET}`,
})

export const registerDelegate = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    number,
    commpref1,
    commpref2,
    commpref3,
    isVeg,
    image,
  } = req.body;

  if (password.length < 6) return res.status(400).send("Password should be longer than 6 characters!")

    if(number.length !==  10) return res.status(400).send("Invalid number, should be 10 digits.")

  const delegateExists = await Delegate.findOne({ email });
  if(delegateExists) return res.status(400).send("Email is already in use.");

  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  const delegate = new Delegate({
    firstname,
    lastname,
    email,
    password: hashPass,
    number,
    commpref1,
    commpref2,
    commpref3,
    isVeg,
    image,
  });

  try {
    await delegate.save();
    // console.log("Registered user =>", delegate);
    return res.json({
      ok: true,
    });
  } catch (err) {
    // console.log("register failed => ", err);
    return res.status(400).send("An error occured!");
  }
};

export const loginDelegate = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Delegate.findOne({ email });
    if (!user) return res.status(400).send("No user found!");

    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send("Wrong password");

    const token = jwt.sign({ _id: user._id }, process.env.JWT, {
      expiresIn: "7d",
    });
    user.password = undefined;
    res.json({
      token,
      user,
    });
  } catch (err) {
    return res.status(400).send("An error occured!");
  }
};

export const getDelegateProfile = asyncHandler(async (req, res) => {
  const token = getToken(req);
  const verified = verifyToken(token);
  console.log(req);
  res.json({
    msg: "Welcome to Profile Page",
  });
});


export const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);
    console.log("uploaded image url => ", result);
    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    })
  } catch (err) {
    console.log(err);
  }
}

export const getDelegates = async (req, res) => {
  try {
    const delegates = await Delegate.find().sort({ createdAt: "desc" }).limit(70);
    res.json(delegates)
  } catch (err) {
    console.log(err)
    return res.status(400).send("An error occured!");
  }
}

export const delegateNumbers = async (req, res) => {
  try {
    const no = await Delegate.countDocuments();
    res.json(no)
  } catch (err) {
    return res.json(err);
  }
}