export function isDataChanged<T>(
  original: T,
  updated: T,
  keysToCompare: (keyof T)[]
): boolean {
  return keysToCompare.some((key) => {
    const originalValue = original[key];
    const updatedValue = updated[key];

    if (
      typeof originalValue === "object" &&
      typeof updatedValue === "object" &&
      originalValue?.toString &&
      updatedValue?.toString
    ) {
      return originalValue.toString() !== updatedValue.toString();
    }

    return originalValue !== updatedValue;
  });
}
