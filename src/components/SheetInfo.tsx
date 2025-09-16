import { useContext, type Dispatch, type SetStateAction } from "react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import type { MetObsIntervalValueType, MetObsSampleValueType, StationData } from "@/types/station";
import { convertUnit, type UnitKey } from "@/utils/unit";
import { UnitContext } from "@/context/useUnitContext";

function SamplingValuesTable({ values, unitType }: { values?: MetObsSampleValueType[], unitType: UnitKey | undefined }) {
    if (!values || values.length === 0) return <p>No sampling data</p>;
    if (!unitType) return <p>Undefined unit type</p>;

    return (
        <ul>
            {values.map(v => (
                <li key={v.date + unitType}>
                    Date: {v.date}, Value: {convertUnit(v.value, unitType)} , Quality: {v.quality}
                </li>
            ))}
        </ul>
    );
}

function IntervalValuesTable({ values, unitType }: { values?: MetObsIntervalValueType[], unitType: UnitKey | undefined }) {
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

export default function SheetInfo({ sheetOpen, setSheetOpen, station }: {
    sheetOpen: boolean,
    setSheetOpen: Dispatch<SetStateAction<boolean>>,
    station: StationData | null,
}) {
    const { unitType, samplingValueType } = useContext(UnitContext);
    if (!station || !samplingValueType) return null;

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{station.name}</SheetTitle>
                    <SheetDescription>{`${station.owner}'s measuring station`}</SheetDescription>
                    <p>Latitude: {station.latitude}°</p>
                    <p>Longitude: {station.longitude}°</p>
                    <p>Altitude: {station.height}m</p>
                </SheetHeader>
                {
                    samplingValueType === "SAMPLING" ? (
                        <SamplingValuesTable values={station.value as MetObsSampleValueType[]} unitType={unitType} />
                    ) : (
                        <IntervalValuesTable values={station.value as MetObsIntervalValueType[]} unitType={unitType} />
                    )
                }
                <SheetFooter>Based on data from SMHI</SheetFooter>
            </SheetContent>
        </Sheet>
    )
}