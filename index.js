import express from "express";
import dotenv from "dotenv";
import router from "./routes/Router.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res, next) => {
    if (req.path === "/docs" || req.path === "/users") {
        return next();
    } else {
        return authMiddleware(req, res, next);
    }
});

app.use("/", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
