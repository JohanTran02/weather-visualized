import {
    useQuery,
} from '@tanstack/react-query'
import { getStationSet } from '@/api/station'
import { FeatureGroup, Marker, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from 'leaflet';
import { useMemo, type Dispatch, type SetStateAction } from 'react';
import { useGetActiveStations } from '@/hook/station';
import type { StationData } from '@/types/station';
import type { MetObsValueType } from '@/types/weather';
import { convertUnit } from '@/utils/unit';
import type { UnitKey } from '@/types/unit';

const circleIcon = (color: string, size = 20) => {
    const iconHTML = document.createElement('div');
    iconHTML.innerHTML = `<div style="
      width:${size}px;
      height:${size}px;
      border-radius:50%;
      background:${color};"></div>`;

    return L.divIcon({
        html: iconHTML,
        className: "", // important: no default styles
        iconSize: [size, size],
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
                icon={circleIcon("blue", 20)}
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
                <Tooltip direction='right' permanent opacity={1}>
                    {data && convertUnit(station.value[0].value, data.parameter.unit)}
                </Tooltip>
            </Marker>
        ));
    }, [activeStations, setSheetOpen, setStation]);

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