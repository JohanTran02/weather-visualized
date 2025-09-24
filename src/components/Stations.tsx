import type { StationSetData } from "@/types/station";
import { FeatureGroup } from 'react-leaflet';
import StationMarker from "./StationMarker";

export default function Stations({ stations }: { stations: StationSetData[] }) {
    return (
        <FeatureGroup>
            {stations.map((station) => (
                <StationMarker key={station.key} station={station} />
            ))}
        </FeatureGroup>
    )
}