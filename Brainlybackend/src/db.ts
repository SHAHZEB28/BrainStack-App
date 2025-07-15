import mongoose, {model, Schema} from "mongoose";

// This is the crucial change for deployment.
// It tells your application to use the DATABASE_URL from Render's environment variables.
// If it can't find that variable (like when you're running it locally),
// it will fall back to your local database connection.
const connectionString = process.env.DATABASE_URL || "mongodb://localhost:27017/brainly";

mongoose.connect(connectionString)
  .then(() => console.log("MongoDB connected successfully."))
  .catch(err => console.error("MongoDB connection error:", err));


const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String
})
export const UserModel = model("User", UserSchema); 

const ContentSchema =  new Schema({
    title: String,
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
