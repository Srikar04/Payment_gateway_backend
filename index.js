import express from "express";
import dotenv from "dotenv";
import router from "./routes/Router.js";
import authenticateMiddleware from "./middleware/authenticateMiddleware.js";
import swaggerUi from "swagger-ui-express";
import { readFile } from "fs/promises";
const swaggerDoc = JSON.parse(
  await readFile(new URL("./swagger.json", import.meta.url))
);

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/docs",swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use("/", (req, res, next) => {
    if (req.path === "/docs" || req.path === "/users") {
        return next();
    } else {
        return authenticateMiddleware(req, res, next);
    }
});

app.use("/", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0',() => {
  console.log(`Server is running on ${PORT}`);
});
