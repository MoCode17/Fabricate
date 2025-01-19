interface EnvConfig {
  REPLICATE_API_TOKEN: string;
}

export const env: EnvConfig = {
  REPLICATE_API_TOKEN: import.meta.env.VITE_REPLICATE_API_TOKEN,
};