import jwt from 'jsonwebtoken';


const isAuth = async (req, res, next) => {
    try {
        let token = req.cookies.token;

        console.log("TOKEN:", token); // ✅ ADD THIS

        if (!token) {
            return res.status(401).json({ message: "No token" });
        }

        let verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        console.log("DECODED:", verifyToken); // ✅ ADD THIS

        req.userId = verifyToken.id;

        next();
    } catch (error) {
        console.log("JWT ERROR:", error.message); // ✅ ADD THIS
        return res.status(401).json({ message: "Invalid token" });
    }
}


export default isAuth;