import {
    useQuery,
} from '@tanstack/react-query'
import { getStationSet } from '@/api/station'
import { FeatureGroup, Marker, } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from 'leaflet';
import { useMemo, type Dispatch, type SetStateAction } from 'react';
import { useGetActiveStations } from '@/hook/station';
import { type StationData } from '@/types/station';
import type { MetObsValueType } from '@/types/weather';
import type { UnitKey } from '@/types/unit';
import { convertUnit } from '@/utils/unit';

const circleIcon = (station: StationData, unit: UnitKey | undefined, size?: number) => {
    const iconDiv = document.createElement('div');
    const iconStationName = document.createElement('p');
    const iconStationValue = document.createElement('p');


    iconDiv.className = "flex flex-col items-center justify-center text-nowrap hover:underline font-semibold";
    iconStationName.textContent = station.name;
    iconStationValue.textContent = `${unit && convertUnit(station.value[0].value, unit)}`;

    iconDiv.append(iconStationName, iconStationValue);

    return L.divIcon({
        html: iconDiv,
        className: "",
        iconSize: size ? [size, size] : undefined,
    })
};

// StationsLayer
export const StationsLayer = ({ parameterId, setSheetOpen, setStation, setSamplingValueType, setUnitType }: {
    parameterId: string,
    setSheetOpen: Dispatch<SetStateAction<boolean>>,
    setStation: Dispatch<SetStateAction<StationData | null>>,
    setSamplingValueType: Dispatch<SetStateAction<MetObsValueType | null>>,
    setUnitType: Dispatch<SetStateAction<UnitKey | null>>,
}) => {
    const { data, status } = useQuery({
        queryKey: ["stations", parameterId],
        queryFn: () => {
            if (!parameterId) throw new Error(`Add parameter before`);
            return getStationSet(parameterId)
        },
        enabled: !!parameterId
    });

    const { activeStations, samplingType } = useGetActiveStations(data);

    const markers = useMemo(() => {
        if (!activeStations) return [];

        return activeStations.map((station) => (
            <Marker
                key={station.key}
                position={[station.latitude, station.longitude]}
                icon={circleIcon(station, data?.parameter.unit)}
                eventHandlers={{
                    click: () => {
                        if (data?.parameter) {
                            setUnitType(data.parameter.unit);
                        }
                        setSamplingValueType(samplingType);
                        setStation(station);
                        setSheetOpen(true);
                    }
                }}
            >
            </Marker>
        ));
    }, [data?.parameter, samplingType, setSamplingValueType, setUnitType, activeStations, setSheetOpen, setStation]);

    if (status === "error") return <div>Error</div>;
    if (status === "pending") return <div>Loading...</div>;

    return (
        <MarkerClusterGroup>
            <FeatureGroup>
                {markers}
            </FeatureGroup>
        </MarkerClusterGroup>
    );
};