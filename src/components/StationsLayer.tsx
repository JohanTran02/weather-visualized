import {
    useQuery,
} from '@tanstack/react-query'
import { getStationSet } from '@/api/station'
import { FeatureGroup, Marker, Popup, Tooltip } from 'react-leaflet';
import { unit } from '@/types/unit';
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from 'leaflet';

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


export function StationsLayer({ parameterId }: { parameterId: string }) {
    const { data, status } = useQuery({
        queryKey: ["stations", parameterId],
        queryFn: () => getStationSet(parameterId),
    })

    if (status === "error") return <div>Error</div>

    if (status === "pending") return <div>Loading...</div>;

    return (
        <MarkerClusterGroup >
            <FeatureGroup>
                {data.station?.map((station) =>
                    station.value?.[0]?.value ? (
                        <Marker key={station.key}
                            position={[station.latitude, station.longitude]}
                            icon={circleIcon("blue", 20)}>
                            <Popup>
                                {`Name: ${station.name}`} <br />
                                {`Owner: ${station.owner}`}
                            </Popup>
                            <Tooltip direction='right' permanent opacity={1}>
                                {`${station.value?.[0]?.value}${data.parameter?.unit ? unit[data.parameter.unit] : ''}`}
                            </Tooltip>
                        </Marker>
                    ) : null
                )}
            </FeatureGroup>
        </MarkerClusterGroup >
    )
}