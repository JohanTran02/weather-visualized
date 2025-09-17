import { SheetContext } from "@/context/useSheetContext";
import { StationContext } from "@/context/useStationContext";
import { UnitContext } from "@/context/useUnitContext";
import type { MetObsValueType } from "@/types/parameter";
import type { StationData } from "@/types/station";
import { type UnitKey, convertUnit } from "@/utils/unit";
import L from "leaflet";
import { useContext } from "react";
import { Marker } from "react-leaflet";

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

export default function StationMarker({ station, unitType, samplingType }: { station: StationData, unitType: UnitKey, samplingType: MetObsValueType | undefined }) {
    const { setUnitType, setSamplingValueType } = useContext(UnitContext);
    const { setStation } = useContext(StationContext);
    const { open } = useContext(SheetContext);

    return (
        <Marker
            key={station.key}
            position={[station.latitude, station.longitude]}
            icon={circleIcon(station, unitType)}
            eventHandlers={{
                click: () => {
                    setUnitType(unitType);
                    setSamplingValueType(samplingType);
                    setStation(station);
                    open();
                }
            }}
        >
        </Marker>
    )
}