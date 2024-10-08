"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uset_1 = require("./router/uset");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/user", uset_1.userRouter);
app.listen(3000);
