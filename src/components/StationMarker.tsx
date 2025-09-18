import { SheetContext } from "@/context/useSheetContext";
import { useStationDispatch } from "@/context/useStationContext";
import { UnitContext } from "@/context/useUnitContext";
import type { StationData } from "@/types/station";
import { type UnitKey, convertUnit } from "@/utils/unit";
import L from "leaflet";
import { useCallback, useContext, useMemo } from "react";
import { Marker } from "react-leaflet";

const useCircleIcon = (station: StationData, unit: UnitKey | undefined, size?: number) => {
    return useMemo(() => {
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
    }, [unit, station, size])
};

export default function StationMarker({ station }: { station: StationData }) {
    const { unitType } = useContext(UnitContext);
    const setStation = useStationDispatch();
    const { open } = useContext(SheetContext);
    const icon = useCircleIcon(station, unitType);

    const setSheetInfo = useCallback(() => {
        setStation(station);
        open();
    }, [setStation, open, station])

    const marker = useMemo(() => {
        return <Marker
            key={station.key}
            position={[station.latitude, station.longitude]}
            icon={icon}
            eventHandlers={{ click: setSheetInfo }}
        >
        </Marker>
    }, [setSheetInfo, icon, station])

    return marker
}