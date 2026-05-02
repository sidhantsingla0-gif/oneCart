import jwt from 'jsonwebtoken';


const isAuth = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "user doesn't have a valid token" });
            }
            let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
            if (!verifyToken) {
                return res.status(401).json({ message: "user doesn't have a valid token" });
            }
            req.userId = verifyToken.id;
            next();
    } catch (error) {
        console.log("isAuth error:", error.message);
        return res.status(401).json({ message: "Invalid token" });
    }
}

export default isAuth;