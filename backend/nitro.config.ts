export default defineNitroConfig({
  publicAssets: [{ dir: "../frontend" }],
  esbuild: {
    options: {
      target: "node18",
    },
  },
  hooks: {
    close: async () => {
      await WireGuard.Shutdown();
    },
  },
});
