import http from "http";
import { createApp } from "./app.js";
import { logger } from "./config/logger.js";
import env from "./config/env.js";
import { connectDB } from "./config/db.js";

const app = createApp();

const isServerless = !!process.env.VERCEL;

if (!isServerless) {
  import("./jobs/emailJob.js");
  async function start() {
    try {
      await connectDB();
      const server = http.createServer(app);
      server.listen(env.port, () =>
        console.log(`Server is running on port: ${env.port} [${env.nodeEnv}]`),
      );
      const shutdown = (signal) => {
        logger.info(`${signal} received, shutting down...`);
        server.close(() => process.exit(0));
      };
      process.on("SIGINT", () => shutdown("SIGINT"));
      process.on("SIGTERM", () => shutdown("SIGTERM"));
    } catch (error) {
      logger.error(`Failed to start server: ${error.message}`);
      process.exit(1);
    }
  }
  process.on("unhandledRejection", (reason) => {
    logger.error(`Unhandled Rejection: ${reason}`);
  });
  start();
}

export default app;
