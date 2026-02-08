import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticate = (req, res, next) => {
  try {
    const cookies = req.headers.cookie;
    if (!cookies) {
      return res.status(401).json({ message: "No token" });
    }

    const cookieArray = cookies.split(";");

    let token;
    for (let c of cookieArray) {
      const [name, value] = c.trim().split("=");
      if (name === "ASH") {
        token = value;
        break;
      }
    }

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // ✅ THIS IS THE KEY FIX
    req.user = {
      userId: decoded.userId,
      patientID: decoded.patientID,
      userRole: decoded.userRole
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authenticate;
