"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prom_client_1 = require("prom-client");
const prom_client_2 = __importDefault(require("prom-client"));
const app = (0, express_1.default)();
const histogram = new prom_client_1.Histogram({
    name: "http_number_of_request",
    help: "Number of HTTP request made",
    buckets: [0.1, 1, 5, 10, 100],
});
//@ts-ignore
function middleware(req, res, next) {
    const startTime = Date.now();
    res.on("finish", () => {
        const endTime = Date.now();
        histogram.observe({}, endTime - startTime);
    });
    next();
}
app.use(middleware);
app.get("/user", (req, res) => {
    res.send({
        name: "John Doe",
        age: 25,
    });
});
app.post("/user", (req, res) => {
    const user = req.body;
    res.send(Object.assign(Object.assign({}, user), { id: 1 }));
});
app.get("/metrics", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   res.send(`http_number_of_request ${counter.}`)
    const metrics = yield prom_client_2.default.register.metrics();
    res.set("Content-Type", prom_client_2.default.register.contentType);
    res.end(metrics);
}));
app.listen(3000);
