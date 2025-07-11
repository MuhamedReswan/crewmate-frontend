export const handleLocationSelect = (
  location: { lat: number; lng: number; address: string },
  setLocation: (location: {
    lat: number;
    lng: number;
    address: string;
  }) => void,
  setMapVisible: (visible: boolean) => void
) => {
  console.log("Location from map picker handle:", location);
  setLocation({
    lat: location.lat,
    lng: location.lng,
    address: location.address,
  });
  setMapVisible(false);
};
