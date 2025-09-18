import {
    useQuery,
} from '@tanstack/react-query'
import { getStationSet, type MetObsStationSetDataType } from '@/api/station'
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Parameter } from '@/context/useParameterContext';
import Stations from './Stations';
import { useCallback } from 'react';

export function useStations(
    parameterId: string,
) {
    return useQuery({
        queryKey: ["stationSet", parameterId],
        queryFn: () => {
            return getStationSet(parameterId)
        },
        enabled: !!parameterId,
        select: useCallback(selectStation, [])
    });
}

const selectStation = (data: MetObsStationSetDataType) => data.station.filter(station => station.value.length)

const useSelectedStation = (parameterId: string) => {
    return useStations(parameterId)
}

// StationsLayer
export const StationsLayer = () => {
    const parameterId = Parameter();
    const { data, status } = useSelectedStation(parameterId)

    if (status === "error") return <div>Error</div>;
    if (status === "pending") return <div>Loading...</div>;

    return (
        <MarkerClusterGroup>
            <Stations stations={data} />
        </MarkerClusterGroup>
    );
};