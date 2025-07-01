export function pickDTOFields<T>(dtoShape: T, data: Record<string, unknown>): T {
  const result: Partial<T> = {};

  for (const key in dtoShape) {
    if (key in data) {
      result[key as keyof T] = data[key as keyof typeof data] as T[typeof key];
    }
  }

  return result as T;
}
