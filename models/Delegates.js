import mongoose from "mongoose";

const DelegateSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        reqiured: true,
    },
    commpref1: {
        type: String,
        required: true,
    },
    commpref2: {
        type: String,
        required: true,
    },
    commpref3: {
        type: String,
        required: true,
    },
    committee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Committee",
    },
    isVeg: {
        type: String,
        required: true,
    },
    image: {
        url: String,
        public_id: String,
    },
    isVerified: {
        type: Boolean,
    }
});

const Delegate = mongoose.model('Delegate', DelegateSchema);

export default Delegate;