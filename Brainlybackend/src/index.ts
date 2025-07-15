import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel, ContentModel, LinkModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware, AuthenticatedRequest } from "./middleware";
import { random } from "./utils";

const app = express();
app.use(express.json());

// --- AUTHENTICATION ROUTES ---
app.post("/api/v1/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    await UserModel.create({ username, password });
    res.json({ message: "User has signed up" });
  } catch (e) {
    res.status(411).json({ message: "User already exists" });
  }
});

app.post("/api/v1/signin", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const existingUser = await UserModel.findOne({ username, password });
    if (existingUser) {
        const token = jwt.sign({ id: existingUser._id }, JWT_PASSWORD);
        res.json({ token });
    } else {
        res.status(403).json({ message: "Incorrect credentials" });
    }
});

app.get("/api/v1/me", userMiddleware, async (req: Request, res: Response) => {
  const userId = (req as AuthenticatedRequest).userId;
  const user = await UserModel.findById(userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json({
    username: user.username,
    id: user._id,
  });
});


// --- CONTENT ROUTES ---
app.post("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
  // FIX: Changed `tags` to `tag` to match the property being sent by the frontend.
  const { link, type, title, content, tag } = req.body; 
  try {
    await ContentModel.create({
      title,
      link,
      content,
      type,
      tag: tag || [], // Use the received 'tag' (singular) array.
      userId: (req as AuthenticatedRequest).userId,
    });
    res.json({ message: "Content added successfully" });
  } catch (error) {
    console.error("Error adding content:", error);
    res.status(500).json({ message: "Failed to add content" });
  }
});

app.get("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
  const userId = (req as AuthenticatedRequest).userId;
  const content = await ContentModel.find({ userId: userId }).populate("userId", "username");
  res.json({ content });
});

app.delete("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
  const { contentId } = req.body;
  await ContentModel.deleteOne({
    _id: contentId,
    userId: (req as AuthenticatedRequest).userId,
  });
  res.json({ message: "Content deleted" });
});


// --- SHARE ROUTES ---
app.post("/api/v1/brain/share", userMiddleware, async (req: Request, res: Response) => {
    const { share } = req.body;
    const userId = (req as AuthenticatedRequest).userId;
    if (share) {
        const existingLink = await LinkModel.findOne({ userId });
        if (existingLink) {
            res.json({ hash: existingLink.hash });
            return;
        }
        const hash = random(10);
        await LinkModel.create({ userId, hash });
        res.json({ message: `/share/${hash}` });
    } else {
        await LinkModel.deleteOne({ userId });
        res.json({ message: "Removed link" });
    }
});

app.get("/api/v1/brain/:sharelink", async (req: Request, res: Response) => {
    const { sharelink } = req.params;
    const link = await LinkModel.findOne({ hash: sharelink });
    if (!link) {
        res.status(404).json({ message: "Share link not found" });
        return;
    }
    const content = await ContentModel.find({ userId: link.userId });
    const user = await UserModel.findOne({ _id: link.userId });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.json({ username: user.username, content: content });
});


app.listen(3000, () => {
    console.log("Backend server started on port 3000");
});
