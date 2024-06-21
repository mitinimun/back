import mongoose from "mongoose";

const CommitteeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        url: String,
        public_id: String, 
    }
});

const Committee = mongoose.model("Committee", CommitteeSchema);

export default Committee;