import express from "express";
import { createCommittee, getCommitteeById, getCommittee } from "../controllers/committee.js";
import { getCommDelegates, getDelegateById } from "../controllers/delegates.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const committeeRoutes = express.Router();

committeeRoutes.post("/create", createCommittee);
committeeRoutes.get("/get/:committeeId", getCommittee);
committeeRoutes.get("/members/:committeeId", getCommDelegates);

committeeRoutes.param("committeeId", getCommitteeById);


export default committeeRoutes;