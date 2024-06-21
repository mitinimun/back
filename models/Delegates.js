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
        type: String,
    },
    isVeg: {
        type: String,
        required: true,
    },
    image: {
        url: String,
        public_id: String,
    },
    prevExp: {
        type: String,
    },
    grade: {
        type: Number
    },
    isVerified: {
        type: Boolean,
    },
    resetPasswordLink:{
        data: String,
        default: String,
    }
});

const Delegate = mongoose.model('Delegate', DelegateSchema);

export default Delegate;