import {
    useQuery,
} from '@tanstack/react-query'
import { getStationSet } from '@/api/station'
import { FeatureGroup, Marker, } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from 'leaflet';
import { useContext, useMemo, type Dispatch, type SetStateAction } from 'react';
import { useGetActiveStationSet } from '@/hook/stationSet';
import { type StationData } from '@/types/station';
import { convertUnit, type UnitKey } from '@/utils/unit';
import { ParameterContext } from '@/context/useParameterContext';
import { UnitContext } from '@/context/useUnitContext';
import { SheetContext } from '@/context/useSheetContext';

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
export const StationsLayer = ({ setStation }: {
    setStation: Dispatch<SetStateAction<StationData | null>>,
}) => {
    const { open } = useContext(SheetContext);
    const { parameterId } = useContext(ParameterContext)
    const { data, status } = useQuery({
        queryKey: ["stations", parameterId],
        queryFn: () => {
            if (!parameterId) throw new Error(`Add parameter before`);
            return getStationSet(parameterId)
        },
        enabled: !!parameterId
    });

    const { setUnitType, setSamplingValueType } = useContext(UnitContext);
    const { activeStations, samplingType } = useGetActiveStationSet(data?.station);

    const markers = useMemo(() => {
        if (!activeStations) return [];

        return activeStations.map((station) => (
            <Marker
                key={station.key}
                position={[station.latitude, station.longitude]}
                icon={circleIcon(station, data?.parameter.unit)}
                eventHandlers={{
                    click: () => {
                        setUnitType(data?.parameter.unit);
                        setSamplingValueType(samplingType);
                        setStation(station);
                        open();
                    }
                }}
            >
            </Marker>
        ));
    }, [data?.parameter.unit, samplingType, setSamplingValueType, setUnitType, activeStations, open, setStation]);

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