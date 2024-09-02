"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
const otpStore = {};
app.post("/generate-otp", (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ msg: "Email is not Provided/Valid" });
    }
    const otp = Math.floor(1000000 + Math.random() * 900000).toString();
    otpStore[email] = otp;
    console.log(`OTP for ${email} : ${otp}`);
    return res.status(200).json({ msg: "OTP genrated and logged" });
});
app.post("/reset-password", (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res
            .status(400)
            .json({ msg: "Email , OTP & New Password is requiered" });
    }
    if (otpStore[email] == otp) {
        console.log(`Password for ${email} has been reset to: ${newPassword}`);
        delete otpStore[email];
        return res.status(200).json({ msg: "Password Reset Sussessfully" });
    }
    else {
        return res.status(400).json({ msg: "The given OTP doesn't match" });
    }
});
//1580737
app.listen(PORT, () => {
    console.log(`Server is Running on the http://localhost:${PORT}`);
});
