"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const connectDb_1 = require("./service/connectDb");
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
(0, connectDb_1.connectDb)("mongodb://localhost:27017/testone")
    .then(() => console.log("mongodb connected"))
    .catch((error) => console.log(error));
const port = 8000;
app.use("/user", userRoute_1.default);
app.listen(port, () => console.log("server has started"));
