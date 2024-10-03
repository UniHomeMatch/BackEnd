require('dotenv').config();
import express from "express";
import cors from "cors";
import path from "node:path";
import { router } from "./routes";

const app = express();

app.use('/uploads', express.static(path.resolve(__dirname, '../', 'uploads')));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "*");
    app.use(cors());
    next();
});

app.use(router);

app.listen(8000, () => {
    console.log("Server is running on port 8000");
    });