import { factoryConfig } from "@cany748/eslint-config";
import nuxt from "./.nuxt/eslint.config.mjs";

export default factoryConfig().append(nuxt());
