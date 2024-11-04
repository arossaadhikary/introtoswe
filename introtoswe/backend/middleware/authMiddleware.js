import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId, username: decoded.username }; // Attach user info to request
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
}
