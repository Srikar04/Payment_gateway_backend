import express from "express";
import dotenv from "dotenv";
import router from "./routes/Router.js";
import authMiddleware from "./middleware/authMiddleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger.json" assert { type: "json" };

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/docs",swaggerUi.serve, swaggerUi.setup(swaggerDoc));

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
