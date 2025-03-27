import { LocationData } from '@/types/form.type'
import React from 'react'
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet'

interface MapPreviewProps {
    location: LocationData;
}

const MapPreview: React.FC<MapPreviewProps> = ({ location }) => {
    return (
        <div className="w-full  flex justify-center items-center">
            <MapContainer
                center={[location?.lat, location?.lng]}
                zoom={10}
                style={{
                    height: "15rem",
                    width: "15rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[location?.lat, location?.lng]} title={location?.address}>
                    <Tooltip>
                        {location.address || "Selected Location"}
                    </Tooltip>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default MapPreview
