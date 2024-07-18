import prisma from "../models/index.js";

const authMiddleware = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey == "") {
    return res.status(401).json({ error: "API Key Missing" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { apiKey },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid API Key" });
    }

    req.userName = user.name;

    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export default authMiddleware;
