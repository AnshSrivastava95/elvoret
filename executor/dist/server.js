"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = Number(process.env.PORT) || 10000;
const EXECUTOR_SECRET = process.env.EXECUTOR_SECRET;
app.get("/health", (_req, res) => {
    res.status(200).json({
        ok: true,
        service: "elvoret-executor",
        version: "1.0.0",
    });
});
app.post("/execute", (req, res) => {
    const authorization = req.headers.authorization;
    if (!EXECUTOR_SECRET ||
        authorization !==
            `Bearer ${EXECUTOR_SECRET}`) {
        return res.status(401).json({
            error: "Unauthorized",
        });
    }
    return res.status(200).json({
        ok: true,
        message: "Executor connection successful.",
        received: {
            language: req.body?.language ?? null,
            hasCode: typeof req.body?.code === "string",
        },
    });
});
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Elvoret executor listening on port ${PORT}`);
});
