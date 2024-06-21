import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    image: {
        url: String,
        public_id: String, 
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Delegate",
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model("Post", PostSchema);

export default Post;