export function getEnvVariables(key: string): string {
  const variable = process.env[key];
  if (!variable) {
    throw new Error(`environment variable ${key} not found`);
  }
  return variable;
}
