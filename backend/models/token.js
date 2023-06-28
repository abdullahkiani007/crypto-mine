import mongoose, { Schema } from "mongoose";

const schema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
const model = mongoose.model("RefreshToken", schema, "tokens");
export default model;
