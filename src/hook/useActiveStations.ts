import type { MetObsStationSetDataType } from "@/types/station";
import { useMemo } from "react";

export function useActiveStations(data: MetObsStationSetDataType | undefined) {
    return useMemo(() => {
        // If data is undefined, return empty array
        const stations = data?.station ?? [];

        // Filter only stations that have at least one defined value
        return stations.filter((station) => station.value?.[0]?.value !== undefined);
    }, [data]);
}