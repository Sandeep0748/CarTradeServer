import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protect middleware: verifies JWT and attaches user to req

// auth.js = use to check ucookies varification   *
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
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded.userId) {
            return res.json({ success: false, message: "not authorized" });
        }

        req.user = await User.findById(decoded.userId).select("-password");
        next();
    } catch (error) {
        console.log("[auth protect]", error.message);
        return res.json({ success: false, message: "not authorized" });
    }
};