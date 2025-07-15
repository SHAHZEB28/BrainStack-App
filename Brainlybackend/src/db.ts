import mongoose, {model, Schema} from "mongoose";

mongoose.connect("mongodb://localhost:27017/brainly")
  .then(() => console.log("MongoDB connected successfully."))
  .catch(err => console.error("MongoDB connection error:", err));

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String
})
export const UserModel = model("User", UserSchema); 

const ContentSchema =  new Schema({
    title: String,
    // Both link and content are now optional strings.
    link: { type: String, required: false },
    content: { type: String, required: false },
    type: String,
    tag: [String],
    userId:{type: mongoose.Types.ObjectId, ref: 'User', required: true}
})
export const ContentModel = model("Content", ContentSchema); 

const LinkSchema =  new Schema({
    hash: String, 
    userId:{type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true}
})
export const LinkModel = model("Link", LinkSchema);
