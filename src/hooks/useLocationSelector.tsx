import { LocationData } from "@/types/form.type";
import { UseFormSetValue, Path } from "react-hook-form";

export const useLocationSelector = <T extends Record<string, any>>(
  setValue: UseFormSetValue<T>,
  fieldName: Path<T>, // 👈 use Path<T> instead of keyof T
  setLocation?: (location: LocationData) => void,
  setMapVisible?: (value: boolean) => void
) => {
  const handleLocationSelect = (selectedLocation: LocationData) => {
    console.log("selectedLocation", selectedLocation);

    // update local state
    if (setLocation) {
      setLocation(selectedLocation);
    }
    setValue(
      fieldName,
      {
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        address: selectedLocation.address,
      } as any,
      { shouldValidate: true }
    );

    // close map modal if needed
    if (setMapVisible) setMapVisible(false);
  };

  return { handleLocationSelect };
};
