import mongoose from "mongoose";

const OCSchema = new mongoose.Schema({
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
  team: {
    type: String,
    required: true,
  },
  isHead: {
    type: Boolean,
    required: true,
  }
});

const OC = mongoose.model("OC", OCSchema);

export default OC;
