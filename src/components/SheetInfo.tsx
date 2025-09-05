import type { Dispatch, SetStateAction } from "react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import type { MetObsValueType } from "@/types/weather";
import type { MetObsIntervalValueType, MetObsSampleValueType, StationData } from "@/types/station";

function SamplingValuesTable({ values }: { values?: MetObsSampleValueType[] }) {
    if (!values || values.length === 0) return <p>No sampling data</p>;

    return (
        <ul>
            {values.map(v => (
                <li key={v.date}>
                    Date: {v.date}, Value: {v.value}, Quality: {v.quality}
                </li>
            ))}
        </ul>
    );
}

function IntervalValuesTable({ values }: { values?: MetObsIntervalValueType[] }) {
    if (!values || values.length === 0) return <p>No interval data</p>;

    return (
        <ul>
            {values.map(v => (
                <li key={v.from}>
                    From: {v.from}, To: {v.to}, Ref: {v.ref}, Value: {v.value}, Quality: {v.quality}
                </li>
            ))}
        </ul>
    );
}

export default function SheetInfo({ sheetOpen, setSheetOpen, station, samplingValueType }: { sheetOpen: boolean, setSheetOpen: Dispatch<SetStateAction<boolean>>, station: StationData | null, samplingValueType: MetObsValueType }) {
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
                        <SamplingValuesTable values={station.value as MetObsSampleValueType[]} />
                    ) : (
                        <IntervalValuesTable values={station.value as MetObsIntervalValueType[]} />
                    )
                }
                <SheetFooter>Based on data from SMHI</SheetFooter>
            </SheetContent>
        </Sheet>
    )
}