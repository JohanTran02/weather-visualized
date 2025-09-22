import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import MapLayers from "./MapLayers";

export default function Map() {
    return (
        <MapContainer className="z-0" bounds={[[55, 10], [70, 25]]} zoom={13} scrollWheelZoom={false} zoomControl={false} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position="topright" />
            <MapLayers />
        </MapContainer>
    )
}