// import WireGuard from "./server/utils/WireGuard"

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "@nuxt/eslint", "@nuxtjs/i18n"],
  eslint: {
    config: {
      standalone: false,
    },
  },
  unocss: {
    preflight: true,
  },
  runtimeConfig: {
    public: {
      lang: "en",
    },
  },
  nitro: {
    esbuild: { options: { target: "node20" } },
    hooks: {
      close: async () => {
        // await WireGuard.Shutdown();
      },
    },
  },
});
