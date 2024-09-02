"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const JWT_SECRET = process.env.JWT_SECERT || " ";
console.log(JWT_SECRET);
router.post("/signup", (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const token = jsonwebtoken_1.default.sign({
        username, password
    }, JWT_SECRET);
    console.log(token);
    res.json({
        token
    });
});
router.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const token = jsonwebtoken_1.default.sign({
        username, password
    }, JWT_SECRET);
    const data = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    console.log(data);
    res.json({
        data
    });
});
exports.userRouter = router;
