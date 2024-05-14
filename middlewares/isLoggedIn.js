import { getToken } from "../utils/getToken.js"
import { verifyToken } from "../utils/verifyToken.js";

export const isLoggedIn = (req, res, next) => {
    const token = getToken(req);
    const decodedUser = verifyToken(token);
    if (!decodedUser) {
        return res.status(400).send("Not Logged in!")
    } else {
        req.userAuthId = decodedUser?.id;
        next();
    }
}