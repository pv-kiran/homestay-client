import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Home, Navigation } from 'lucide-react';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

const MapView = ({ position, title, address }) => {
    if (!position || position.length !== 2) {
        return (
            <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
                Map location not available
            </div>
        );
    }

    const mapKey = `map-${position[0]}-${position[1]}-${Date.now()}`;

    return (
        <div className=" w-11/12 mx-auto h-[400px] rounded-lg overflow-hidden shadow-lg">
            <MapContainer
                key={mapKey}
                center={position}
                zoom={20}
                scrollWheelZoom={false}
                className="w-full h-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup className="text-sm">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <Home className="w-4 h-4" />
                                <span className="font-semibold">{title}</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <Navigation className="w-4 h-4 mt-1" />
                                <span>{address?.street}, {address?.city}, {address?.state}</span>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapView;