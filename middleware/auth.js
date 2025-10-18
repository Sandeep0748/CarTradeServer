import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protect middleware: verifies JWT and attaches user to req
export const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.json({ success: false, message: "not authorized" });
        }

        // support "Bearer <token>" format as well as plain token
        if (typeof token === "string" && token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }

        // verify token properly (not just decode)
        const userId = jwt.verify(token, process.env.JWT_SECRET);

        if (!userId) {
            return res.json({ success: false, message: "not authorized" });
        }

        req.user = await User.findById(userId).select("-password");
        next();
    } catch (error) {
        console.log("[auth protect]", error.message);
        return res.json({ success: false, message: "not authorized" });
    }
};