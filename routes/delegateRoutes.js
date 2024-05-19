import express from "express";
import { loginDelegate, registerDelegate, getDelegateProfile, uploadImage, getDelegates, delegateNumbers } from "../controllers/delegates.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import formidable from "express-formidable";

const delegateRoutes = express.Router();

delegateRoutes.post("/register", registerDelegate);
delegateRoutes.post("/login", loginDelegate);
delegateRoutes.get("/get", isLoggedIn, delegateNumbers);
delegateRoutes.post("/upload-image", formidable({maxFileSize: 2 * 1048576}), uploadImage)

export default delegateRoutes;