import type { StationSetData } from "@/types/station";
import { SheetDescription, SheetTitle } from "./ui/sheet";

export default function StationInfo({ station }: { station: StationSetData }) {
    return (
        <>
            <SheetTitle>{station.name}</SheetTitle>
            <SheetDescription>{`${station.owner}'s measuring station`}</SheetDescription>
            <p>Latitude: {station.latitude}°</p>
            <p>Longitude: {station.longitude}°</p>
            <p>Altitude: {station.height}m</p>
        </>
    )
}