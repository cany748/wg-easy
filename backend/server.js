"use strict";

require("./services/Server");

const WireGuard = require("./services/WireGuard");

WireGuard.getConfig().catch((error) => {
  console.error(error);

  process.exit(1);
});

// Handle terminate signal
process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received.");
  await WireGuard.Shutdown();

  process.exit(0);
});

// Handle interupt signal
process.on("SIGINT", () => {
  console.log("SIGINT signal received.");
});
