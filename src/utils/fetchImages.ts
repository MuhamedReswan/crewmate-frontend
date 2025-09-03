import { getImageUrl } from "@/api/common/common";

export const fetchImages = async <T extends Record<string, any>>(
  entity: T,
  mappings: [keyof T, React.Dispatch<any>][]
): Promise<void> => {
  const promises = mappings.map(([key, setter]) => {
    const value = entity[key];
    if (typeof value === "string" && value.trim() !== "") {
      return getImageUrl(value).then((res) => setter(res.data));
    }
    return Promise.resolve();
  });

  await Promise.all(promises);
};
