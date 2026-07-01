import API from "@/services/axios";

export const getImageUrl = async (key?: string) => {
  if (!key) return null;
  const imageUrl = await API.get(`/image-url/${key}`);
  console.log("imageUrl", imageUrl);
  return imageUrl.data;
};

export const getSecureDocumentUrl = async (publicId?: string) => {
  if (!publicId) return null;
  const encodedId = encodeURIComponent(publicId);
  const imageUrl = await API.get(`/documents/${encodedId}`);
  console.log("imageUrl", imageUrl);
  return imageUrl.data;
};
