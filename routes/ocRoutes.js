import express from "express";
import { loginOC, registerOC } from "../controllers/oc.js";

const ocRoutes = express.Router();

ocRoutes.post("/register", registerOC);
ocRoutes.post("/login", loginOC);

export default ocRoutes;