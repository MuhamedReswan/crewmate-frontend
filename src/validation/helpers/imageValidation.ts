export const imageValidation = () => {
  return (val: any) => {
    // ✅ Existing DB image (works for BOTH schemas)
    if (
      val &&
      typeof val === "object" &&
      "publicId" in val &&
      typeof val.publicId === "string" &&
      val.publicId.length > 0
    ) {
      return true;
    }

    // ✅ New file upload
    if (val instanceof File && val.size > 0) {
      return true;
    }

    return false;
  };
};
