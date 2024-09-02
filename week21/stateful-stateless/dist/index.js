"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const PubSubManager_1 = require("./PubSubManager");
setInterval(() => {
    PubSubManager_1.PubSubManger.getInstance().userSubscribe(Math.random().toString(), "APPL");
}, 5000);
