import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost:5197/api",
    },
  },
});
