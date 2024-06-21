import express from "express";
import { loginDelegate, registerDelegate, getDelegateProfile, uploadImage, getDelegates, delegateNumbers, getDelegateById, forgotPassword, resetPassword } from "../controllers/delegates.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import formidable from "express-formidable";
import { passwordResetValidator } from "../middlewares/delegates.js";

const delegateRoutes = express.Router();

delegateRoutes.post("/register", registerDelegate);
delegateRoutes.post("/login", loginDelegate);
delegateRoutes.get("/get", isLoggedIn, delegateNumbers);
delegateRoutes.post("/upload-image", formidable({maxFileSize: 2 * 1048576}), uploadImage)
delegateRoutes.put("/forgot-password", forgotPassword);
delegateRoutes.put("/reset-password", passwordResetValidator, resetPassword)

delegateRoutes.param("delegateId", getDelegateById);

export default delegateRoutes;