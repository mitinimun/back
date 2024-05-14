import OC from "../models/OC.js";
import bcrypt from "bcryptjs";
import { comparePassword } from "../utils/comparePassword.js";
import jwt from "jsonwebtoken";

export const registerOC = async(req, res) => {
    const {
        firstname,
        lastname,
        email,
        password,
        team,
        isHead
    } = req.body;

    if (password.length < 6) return res.status(400).send("Password should be longer than 6 characters!");

    const ocExists = await OC.findOne({ email });
    if(ocExists) return res.status(400).send("Email is already in use.");

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const oc = new OC({
        firstname,
        lastname,
        email,
        password: hashPass,
        team,
        isHead: false,
    });

    try {
        await oc.save();
        return res.json({
            ok: true,
        });
    } catch (err) {
        return res.status(400).send("An error occured!");
    }
}

export const loginOC = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await OC.findOne({ email });
        if(!user) return res.status(400).send("No user found!");

        const match = await comparePassword(password, user.password);
        if(!match) return res.status(400).send("Wrong password.");

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
}