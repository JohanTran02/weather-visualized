import StationSamplingChart from "./StationSamplingChart";
import { UnitContext } from "@/context/useUnitContext";
import { useContext } from "react";

export default function StationChart({ stationId }: { stationId: string }) {
    const { samplingValueType } = useContext(UnitContext);

    return (
        <>
            {
                samplingValueType === "SAMPLING" && (
                    <StationSamplingChart stationId={stationId} />
                )
            }
        </>
    )
}