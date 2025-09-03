import {
    useQuery,
} from '@tanstack/react-query'
import { getStationSet } from '@/api/station'
import { FeatureGroup, Marker, Tooltip } from 'react-leaflet';
import { unit } from '@/types/unit';
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from 'leaflet';
import { useMemo, type Dispatch, type SetStateAction } from 'react';
import { useActiveStations } from '@/hook/useActiveStations';
import type { StationDataType } from '@/types/station';

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
export const StationsLayer = ({ parameterId, setSheetOpen, setStation }: { parameterId: string, setSheetOpen: Dispatch<SetStateAction<boolean>>, setStation: Dispatch<SetStateAction<StationDataType | null>> }) => {
    const { data, status } = useQuery({
        queryKey: ["stations", parameterId],
        queryFn: () => getStationSet(parameterId),
        enabled: !!parameterId
    });

    const stations = useActiveStations(data);

    const markers = useMemo(() => {
        if (!stations) return [];

        return stations.map((station) => (
            <Marker
                key={station.key}
                position={[station.latitude, station.longitude]}
                icon={circleIcon("blue", 20)}
                eventHandlers={{
                    click: () => {
                        setSheetOpen(true);
                        setStation(station);
                    }
                }}
            >
                <Tooltip direction='right' permanent opacity={1}>
                    {`${station.value?.[0]?.value}${data?.parameter?.unit ? unit[data.parameter.unit] : ''}`}
                </Tooltip>
            </Marker>
        ));
    }, [stations, setSheetOpen, setStation]);

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