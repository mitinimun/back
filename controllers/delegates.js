import Delegate from "../models/Delegates.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { getToken } from "../utils/getToken.js";
import { verifyToken } from "../utils/verifyToken.js";
import { comparePassword } from "../utils/comparePassword.js";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";
import _ from "lodash";
import { sendEmail } from "../utils/email.js";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: `${process.env.NAME}`,
  api_key: process.env.KEY,
  api_secret: `${process.env.SECRET}`,
});

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
    prevExp,
    grade,
  } = req.body;

  if (password.length < 6)
    return res.status(400).send("Password should be longer than 6 characters!");

  if (number.length !== 10)
    return res.status(400).send("Invalid number, should be 10 digits.");

  const delegateExists = await Delegate.findOne({ email });
  if (delegateExists) return res.status(400).send("Email is already in use.");

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
    prevExp,
    grade,
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
      expiresIn: "365d",
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
    });
  } catch (err) {
    console.log(err);
  }
};

export const getDelegates = async (req, res) => {
  try {
    const delegates = await Delegate.find()
      .sort({ createdAt: "desc" })
      .limit(70);
    res.json(delegates);
  } catch (err) {
    console.log(err);
    return res.status(400).send("An error occured!");
  }
};

export const delegateNumbers = async (req, res) => {
  try {
    const no = await Delegate.countDocuments();
    res.json(no);
  } catch (err) {
    return res.json(err);
  }
};

export const getDelegateById = async (req, res, next, id) => {
  // Delegate.findById(id).exec((err, user) => {
  //   if(err || !user) {
  //     return res.status(400).json({
  //       error: "User not found"
  //     })
  //   }
  //   req.profile = user
  //   next()
  // })
  Delegate.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
      req.profile = user;
      next();
    })
    .catch((err) => {
      return res.status(400).json({
        error: "User not found",
      });
    });
};

export const getCommDelegates = async (req, res) => {
  try {
    const comm = await Delegate.find({ committee: req.profile._id });
    res.json(comm);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const forgotPassword = (req, res, next) => {
  if (!req.body) return res.status(400).json({ message: "No request body" });
  if (!req.body.email)
    return res.status(400).json({ message: "No Email in request body" });

  console.log("forgot password finding user with that email");
  const { email } = req.body;
  console.log("signin req.body", email);
  // find the user based on email
  Delegate.findOne({ email })
    .then((user) => {
      // if err or no user
      if (!user)
        return res.json({
          error: "User with that email does not exist!",
        });

      // generate a token with user id and secret
      const token = jwt.sign(
        { _id: user._id, iss: "NODEAPI" },
        process.env.JWT
      );

      // email data
      const emailData = {
        from: "noreply@node-react.com",
        to: email,
        subject: "Password Reset Instructions",
        text: `Please use the following link to reset your password: ${process.env.CLIENT_URL}/reset-password/${token}`,
        html: `<p>Please use the following link to reset your password:</p> <p>${process.env.CLIENT_URL}/reset-password/${token}</p>`,
      };

      try {
        user.updateOne({ resetPasswordLink: token }).then((sucess) => {
          sendEmail(emailData);
          return res.status(200).json({
            message: `Email has been sent to ${email}. Follow the instructions to reset your password.`,
          });
        });
      } catch (err) {
        return res.json({
          error: err,
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        message: err,
      });
    });
};

export const resetPassword = async (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  const salt1 = await bcrypt.genSalt(10);
  const hashPass1 = await bcrypt.hash(newPassword, salt1);

  Delegate.findOne({ resetPasswordLink })
    .then((user) => {
      // if err or no user
      if (!user)
        return res.status("401").json({
          error: "Invalid Link!",
        });

      const updatedFields = {
        password: hashPass1,
        resetPasswordLink: "",
      };

      user = _.extend(user, updatedFields);

      try {
        user.save().then((result) => {
          return res.json({
            message: `Great! Now you can login with your new password.`,
          });
        });
      } catch (err) {
        return res.status(400).json({
          error: err,
        });
      }

      // user.save((err, result) => {
      //   if (err) {
      //     return res.status(400).json({
      //       error: err,
      //     });
      //   }
      //   res.json({
      //     message: `Great! Now you can login with your new password.`,
      //   });
      // });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};
