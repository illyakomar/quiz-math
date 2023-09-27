export default abstract class EnvService {
  public static get<T = NodeJS.ProcessEnv>(variableName: string): T {
    const value = process.env[variableName];
    if (!value) throw new Error(`Environment variable ${variableName} is not defined`);
    try {
      return JSON.parse(value);
    } catch {
      return value as unknown as T;
    }
  }
}
