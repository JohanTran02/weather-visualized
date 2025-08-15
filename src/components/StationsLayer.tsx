import {
    useQuery,
} from '@tanstack/react-query'
import { getStationSet } from '@/api/station'
import { CircleMarker, FeatureGroup, Popup } from 'react-leaflet';


export function StationsLayer() {
    const { data, status } = useQuery({
        queryKey: ["stations"],
        queryFn: getStationSet
    })

    if (status === "error") return <div>Error</div>

    if (status === "pending") return <div>Loading...</div>;

    return (
        <FeatureGroup>
            {data.station?.map((station) => (
                <CircleMarker
                    key={station.key}
                    center={[station.latitude, station.longitude]}
                    radius={10}
                    fillColor='blue'
                    fillOpacity={0.4}
                    pathOptions={{ stroke: false }}
                >
                    <Popup>
                        {`Name: ${station.name}`} <br />
                        {`Owner: ${station.owner}`}
                    </Popup>
                </CircleMarker>
            ))}
        </FeatureGroup>
    )
}