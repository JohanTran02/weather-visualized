import { type MetObsStationSetDataType, type StationData, type StationSampling, type StationInterval, StationSamplingArraySchema, StationIntervalArraySchema } from "@/types/station";
import type { MetObsValueType } from "@/types/weather";
import { useMemo } from "react";
import { safeParse } from "valibot";

function isSamplingStation(station: StationData[]): station is StationSampling[] {
    const result = safeParse(StationSamplingArraySchema, station);
    return result.success;
}

function isIntervalStation(station: StationData[]): station is StationInterval[] {
    const result = safeParse(StationIntervalArraySchema, station);
    return result.success;
}

export function useGetActiveStations(data: MetObsStationSetDataType | undefined, samplingValueType: MetObsValueType): StationData[] {
    return useMemo(() => {
        const stations: StationData[] = data?.station ?? [];

        if (samplingValueType === "SAMPLING" && isSamplingStation(stations)) {
            return stations.filter((station) => station.value?.length);
        } else if (samplingValueType === "INTERVAL" && isIntervalStation(stations)) {
            return stations.filter((station) => station.value?.length);
        }

        return [];
    }, [data, samplingValueType]);
}