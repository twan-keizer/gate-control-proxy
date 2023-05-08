"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const cors = require("cors");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post("/api/gate", async (req, res) => {
    console.log("############# start", req.body, req.headers.authorization);
    const bodyObject = req.body;
    if (!bodyObject?.gateIP)
        return res.send("no gateIP");
    if (!bodyObject?.command)
        return res.send("no command");
    if (!req.headers.authorization)
        return res.send("no authorization");
    await (0, node_fetch_1.default)(`http://${bodyObject.gateIP}/cdor.cgi?open=${bodyObject.command}`, {
        method: "GET",
        headers: {
            Authorization: req.headers.authorization,
        },
    });
    console.log("############# success");
    return res.send("success");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
