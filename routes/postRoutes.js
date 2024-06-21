import express from "express";
import { getCommDelegates, getDelegateById } from "../controllers/delegates.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createPost, getPosts } from "../controllers/post.js";

const postRoutes = express.Router();

postRoutes.get("/get", getPosts)
postRoutes.post("/new/:delegateId", isLoggedIn, createPost);

postRoutes.param("delegateId", getDelegateById);

export default postRoutes;