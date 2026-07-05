import cron from "node-cron";
import EmailQueueModel from "../models/EmailQueueModel.js";
import { sendEmail } from "../services/emailService.js";
import { logger } from "../config/logger.js";

logger.info("Email cron job started");

// Check pending emails and send them every 5 seconds
cron.schedule("*/5 * * * * *", async () => {
  try {
    const email = await EmailQueueModel.findOneAndUpdate(
      { status: "pending" },
      { $set: { status: "processing" } },
      { sort: { createdAt: 1 } },
    );
    if (!email) return;

    logger.info(`[emailJob] Processing email to ${email.to}`);

    try {
      await sendEmail({
        to: email.to,
        subject: email.subject,
        html: email.html,
        text: email.text,
      });

      await EmailQueueModel.findByIdAndUpdate(email._id, {
        status: "sent",
        sentAt: new Date(),
      });
      logger.info(`[emailJob] Sent to ${email.to}`);
    } catch (err) {
      const attempts = email.attempts + 1;
      await EmailQueueModel.findByIdAndUpdate(email._id, {
        status: attempts >= 3 ? "failed" : "pending",
        attempts,
        errorMessage: err.message,
      });
      logger.error(`[emailJob] Failed for ${email.to}: ${err.message}`);
    }
  } catch (err) {
    logger.error(`[emailJob] Error: ${err.message}`);
  }
});

// Delete sent/failed emails older than 6 months
cron.schedule("0 0 * * *", async () => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  await EmailQueueModel.deleteMany({
    status: { $in: ["sent", "failed"] }, // Optional
    createdAt: { $lt: sixMonthsAgo },
  });
});
