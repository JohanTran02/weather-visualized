import type { Dispatch, SetStateAction } from "react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import type { StationDataType } from "@/types/station";

export default function SheetInfo({ sheetOpen, setSheetOpen, station }: { sheetOpen: boolean, setSheetOpen: Dispatch<SetStateAction<boolean>>, station: StationDataType | null }) {
    if (!station) return null;

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
                <SheetFooter>Based on data from SMHI</SheetFooter>
            </SheetContent>
        </Sheet>
    )
}