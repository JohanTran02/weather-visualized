import { useContext } from "react";
import { Sheet, SheetContent, SheetHeader } from "./ui/sheet";
import { SheetContext } from "@/context/useSheetContext";
import { useStation } from "@/context/useStationContext";
import StationChart from "./StationChart";
import StationInfo from "./StationInfo";

export default function SheetInfo() {
    const { sheetOpen, setSheetOpen } = useContext(SheetContext);
    const station = useStation();

    if (!station) return null;

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetContent side="bottom" >
                <div className="flex justify-between p-4">
                    <SheetHeader className="order-1">
                        <StationInfo station={station} />
                    </SheetHeader>
                    <StationChart key={station.key} stationId={station.key} />
                </div>
            </SheetContent>
        </Sheet>
    )
}