import {
    useQuery,
} from '@tanstack/react-query'
import { getStationSet } from '@/api/station'
import MarkerClusterGroup from "react-leaflet-markercluster";
import { useContext, } from 'react';
import { ParameterContext } from '@/context/useParameterContext';
import Stations from './Stations';

// StationsLayer
export const StationsLayer = () => {
    const { parameterId } = useContext(ParameterContext)
    const { data, status } = useQuery({
        queryKey: ["stations", parameterId],
        queryFn: () => {
            if (!parameterId) throw new Error(`Add parameter before`);
            return getStationSet(parameterId)
        },
        enabled: !!parameterId
    });

    if (status === "error") return <div>Error</div>;
    if (status === "pending") return <div>Loading...</div>;

    return (
        <MarkerClusterGroup>
            <Stations stations={data.station} unitType={data.parameter.unit} />
        </MarkerClusterGroup>
    );
};