import { type MetObsStationSetDataType, type StationData, type StationSampling, type StationInterval, StationSamplingArraySchema, StationIntervalArraySchema } from "@/types/station";
import type { MetObsValueType } from "@/types/weather";
import { useMemo } from "react";
import { safeParse } from "valibot";

interface ActiveStationsResult {
    activeStations: StationData[];
    samplingType: MetObsValueType | null;
}

function isSamplingStation(station: StationData[]): station is StationSampling[] {
    const result = safeParse(StationSamplingArraySchema, station);
    return result.success;
}

function isIntervalStation(station: StationData[]): station is StationInterval[] {
    const result = safeParse(StationIntervalArraySchema, station);
    return result.success;
}

export function useGetActiveStations(
    data: MetObsStationSetDataType | undefined
): ActiveStationsResult {

    const { activeStations, samplingType }: ActiveStationsResult = useMemo(() => {
        const stations = data?.station ?? [];
        if (!stations.length) return { activeStations: [], samplingType: null };

        if (isSamplingStation(stations)) {
            return {
                activeStations: stations.filter((s) => s.value?.length),
                samplingType: "SAMPLING",
            };
        } else if (isIntervalStation(stations)) {
            return {
                activeStations: stations.filter((s) => s.value?.length),
                samplingType: "INTERVAL",
            };
        }

        return { activeStations: [], samplingType: null };
    }, [data?.station]);

    return { activeStations, samplingType };
}