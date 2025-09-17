import type { StationData } from "@/types/station";
import StationMarker from "./StationMarker";
import { useGetActiveStationSet } from "@/hook/stationSet";
import type { UnitKey } from "@/utils/unit";
import { FeatureGroup } from 'react-leaflet';

export default function Stations({ stations, unitType }: { stations: StationData[], unitType: UnitKey }) {
    const { activeStations, samplingType } = useGetActiveStationSet(stations);

    return (
        <FeatureGroup>
            {activeStations.map((station) => (
                <StationMarker key={station.key} station={station} samplingType={samplingType} unitType={unitType} />
            ))}
        </FeatureGroup>
    )
}