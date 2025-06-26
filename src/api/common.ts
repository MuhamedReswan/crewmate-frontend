import API from "@/services/axios";

export const getImageUrl = async(key?: string) => {
    if (!key) return null;
const imageUrl = await API.get(`/imgage-url/${key}`);
console.log("imageUrl", imageUrl);
return imageUrl.data;
    }