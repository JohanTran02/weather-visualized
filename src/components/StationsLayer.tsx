import {
    useQuery,
} from '@tanstack/react-query'
import { getStationSet } from '@/api/station'
import { CircleMarker, FeatureGroup, Popup, Tooltip } from 'react-leaflet';
import { unit } from '@/types/unit';
import MarkerClusterGroup from "react-leaflet-markercluster";


export function StationsLayer({ parameterId }: { parameterId: string }) {
    const { data, status } = useQuery({
        queryKey: ["stations", parameterId],
        queryFn: () => getStationSet(parameterId),
    })

    if (status === "error") return <div>Error</div>

    if (status === "pending") return <div>Loading...</div>;

    return (
        <MarkerClusterGroup>
            <FeatureGroup>
                {data.station?.map((station) =>
                    station.value?.[0]?.value ? (
                        <CircleMarker key={station.key}
                            center={[station.latitude, station.longitude]}
                            radius={10}
                            fillColor='blue'
                            fillOpacity={0.4}
                            pathOptions={{ stroke: false }}>
                            <Popup>
                                {`Name: ${station.name}`} <br />
                                {`Owner: ${station.owner}`}
                            </Popup>
                            <Tooltip direction='right' permanent opacity={1}>
                                {`${station.value?.[0]?.value}${data.parameter?.unit ? unit[data.parameter.unit] : ''}`}
                            </Tooltip>
                        </CircleMarker>
                    ) : null
                )}
            </FeatureGroup>
        </MarkerClusterGroup>
    )
}