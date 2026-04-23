
import { useEffect, useState } from "react";
import { getSecureDocumentUrl } from "@/api/common/common";

export const useSecureImage = (publicId?: string) => {
  const [url, setUrl] = useState<string | null>(null);
console.log("secure hook calleed publicId",publicId)
  useEffect(() => {
    if (!publicId) return;

    let interval: NodeJS.Timeout;

    const fetchUrl = async () => {
      try {

          console.log("called fetchurl function--------------------------------------------",)
        const result = await getSecureDocumentUrl(publicId);
        setUrl(result.data);
      } catch (err) {
        console.error("Failed to fetch secure image", err);
      }
    };

    // initial fetch
    fetchUrl();

    // 🔥 refresh BEFORE expiry (10 min → refresh at 9 min)
    interval = setInterval(fetchUrl, 9 * 60 * 1000);

    return () => clearInterval(interval);
  }, [publicId]);

  return url;
};