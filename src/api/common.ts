import API from "@/services/axios";

export const getImageUrl = async(key?: string) => {
    if (!key) return null;
const imageUrl = await API.get(`/image-url/${key}`);
console.log("imageUrl", imageUrl);
return imageUrl.data;
    }