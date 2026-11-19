import type { Config } from "@react-router/dev/config";

const basename = process.env.BASE_PATH ?? "/";

export default {
  basename,
  ssr: false,
} satisfies Config;
