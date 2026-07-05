import mongoose from "mongoose";

const emailQueueSchema = new mongoose.Schema(
  {
    to: { type: String, required: true },
    subject: { type: String, required: true },
    html: { type: String, default: "" },
    text: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
      index: true,
    },
    attempts: { type: Number, default: 0 },
    errorMessage: { type: String, default: "" },
    sentAt: { type: Date },
  },
  { timestamps: true },
);

emailQueueSchema.index({ status: 1, createdAt: 1 });

const EmailQueueModel = mongoose.model("EmailQueue", emailQueueSchema);

export default EmailQueueModel;
