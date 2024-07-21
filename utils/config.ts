interface Config {
  apiBaseUrl: string;
  ecKey: string;
}

const config: Config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  ecKey: process.env.NEXT_PUBLIC_EC_KEY || "",
};

export default config;
