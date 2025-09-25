import { useContext } from "react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import type { MetObsIntervalValueType } from "@/types/station";
import { convertUnit } from "@/utils/unit";
import { UnitContext } from "@/context/useUnitContext";
import { SheetContext } from "@/context/useSheetContext";
import { useStation } from "@/context/useStationContext";
import StationSamplingChart from "./StationSamplingChart";

function IntervalValuesTable({ values, }: { values?: MetObsIntervalValueType[] }) {
    const { unitType } = useContext(UnitContext);

    if (!values || values.length === 0) return <p>No interval data</p>;
    if (!unitType) return <p>Undefined unit type</p>;

    return (
        <ul>
            {values.map(v => (
                <li key={v.from + unitType}>
                    From: {v.from}, To: {v.to}, Ref: {v.ref}, Value: {convertUnit(v.value, unitType)}, Quality: {v.quality}
                </li>
            ))}
        </ul>
    );
}

export default function SheetInfo() {
    const { sheetOpen, setSheetOpen } = useContext(SheetContext);
    const { samplingValueType } = useContext(UnitContext);
    const station = useStation();

    if (!station || !samplingValueType) return null;

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetContent side="bottom">
                <SheetHeader>
                    <SheetTitle>{station.name}</SheetTitle>
                    <SheetDescription>{`${station.owner}'s measuring station`}</SheetDescription>
                    <p>Latitude: {station.latitude}°</p>
                    <p>Longitude: {station.longitude}°</p>
                    <p>Altitude: {station.height}m</p>
                </SheetHeader>
                {
                    samplingValueType === "SAMPLING" ? (
                        <StationSamplingChart key={station.key} stationId={station.key} />
                    ) : (
                        <IntervalValuesTable values={station.value as MetObsIntervalValueType[]} />
                    )
                }
                <SheetFooter>Based on data from SMHI</SheetFooter>
            </SheetContent>
        </Sheet>
    )
}