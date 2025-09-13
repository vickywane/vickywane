export interface ConfigOptionsValues {
  [key: string]: any;
}

export interface ConfigOptions<T> {
  development: T;
  production: T;
}

declare type NodeEnvType = "development" | "production";

const NODE_ENV: NodeEnvType =
  process.env.NODE_ENV !== "production"
    ? "development"
    : process.env.NODE_ENV;

export function configFactory<R>(configOptions: ConfigOptions<R>) {
  const env = NODE_ENV;

  if (env in configOptions) {
    return configOptions[env];
  }

  throw new Error(
    `Couldn't find a valid config for env: ${env} and options: ${configOptions}`
  );
}
