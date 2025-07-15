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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// --- AUTHENTICATION ROUTES ---
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        yield db_1.UserModel.create({ username, password });
        res.json({ message: "User has signed up" });
    }
    catch (e) {
        res.status(411).json({ message: "User already exists" });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const existingUser = yield db_1.UserModel.findOne({ username, password });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, config_1.JWT_PASSWORD);
        res.json({ token });
    }
    else {
        res.status(403).json({ message: "Incorrect credentials" });
    }
}));
app.get("/api/v1/me", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const user = yield db_1.UserModel.findById(userId);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.json({
        username: user.username,
        id: user._id,
    });
}));
// --- CONTENT ROUTES ---
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // FIX: Changed `tags` to `tag` to match the property being sent by the frontend.
    const { link, type, title, content, tag } = req.body;
    try {
        yield db_1.ContentModel.create({
            title,
            link,
            content,
            type,
            tag: tag || [], // Use the received 'tag' (singular) array.
            userId: req.userId,
        });
        res.json({ message: "Content added successfully" });
    }
    catch (error) {
        console.error("Error adding content:", error);
        res.status(500).json({ message: "Failed to add content" });
    }
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({ userId: userId }).populate("userId", "username");
    res.json({ content });
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    yield db_1.ContentModel.deleteOne({
        _id: contentId,
        userId: req.userId,
    });
    res.json({ message: "Content deleted" });
}));
// --- SHARE ROUTES ---
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share } = req.body;
    const userId = req.userId;
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne({ userId });
        if (existingLink) {
            res.json({ hash: existingLink.hash });
            return;
        }
        const hash = (0, utils_1.random)(10);
        yield db_1.LinkModel.create({ userId, hash });
        res.json({ message: `/share/${hash}` });
    }
    else {
        yield db_1.LinkModel.deleteOne({ userId });
        res.json({ message: "Removed link" });
    }
}));
app.get("/api/v1/brain/:sharelink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sharelink } = req.params;
    const link = yield db_1.LinkModel.findOne({ hash: sharelink });
    if (!link) {
        res.status(404).json({ message: "Share link not found" });
        return;
    }
    const content = yield db_1.ContentModel.find({ userId: link.userId });
    const user = yield db_1.UserModel.findOne({ _id: link.userId });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.json({ username: user.username, content: content });
}));
app.listen(3000, () => {
    console.log("Backend server started on port 3000");
});
