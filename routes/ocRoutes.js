import express from "express";
import { loginOC, registerOC } from "../controllers/oc.js";
import { getDelegateById } from "../controllers/delegates.js";

const ocRoutes = express.Router();

ocRoutes.post("/register", registerOC);
ocRoutes.post("/login", loginOC);
ocRoutes.param("delegateId", getDelegateById);

export default ocRoutes;