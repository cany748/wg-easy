import { defineConfig, presetIcons, presetUno, transformerCompileClass, transformerDirectives, transformerVariantGroup } from "unocss";
import presetRemToPx from "@unocss/preset-rem-to-px";

export default defineConfig({
  presets: [presetUno(), presetIcons(), presetRemToPx()],
  transformers: [transformerDirectives(), transformerVariantGroup(), transformerCompileClass()],
  rules: [["is-disabled", { opacity: "0.25", cursor: "default" }]],
  theme: {
    breakpoints: {
      xxs: "450px",
      xs: "576px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
});
