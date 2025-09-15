import { MetObsStationSetSampleDataSchema } from "@/schemas/station";
import type { MetObsValueType } from "@/types/parameter";
import { type StationData, type MetObsStationSetSampleData } from "@/types/station";
import { useMemo } from "react";
import { array, safeParse } from 'valibot'

const MetObsStationSetSampleDataArray = array(MetObsStationSetSampleDataSchema);

interface ActiveStationsResult {
    activeStations: StationData[];
    samplingType: MetObsValueType | null;
}

interface NormalizedStationResult {
    stations: StationData[],
    samplingType: MetObsValueType | null
}

function isSamplingStation(station: StationData[] | StationData): station is MetObsStationSetSampleData[] {
    const result = safeParse(MetObsStationSetSampleDataArray, station);
    return result.success;
}

/**
 * Helper function that normalizes a station or array of stations and determines their sampling type.
 *
 * @param {StationData | StationData[]} [station] - A single station or an array of stations. Optional.
 * @returns {NormalizedStationResult} The normalized stations and their sampling type.
 */
export function checkStationType(
    station?: StationData[] | StationData
): NormalizedStationResult {
    if (!station) return { stations: [], samplingType: null };

    const normalizedStations = Array.isArray(station) ? station : [station];

    if (normalizedStations.length === 0) {
        return { stations: [], samplingType: null };
    }

    return {
        stations: normalizedStations,
        samplingType: isSamplingStation(normalizedStations) ? "SAMPLING" : "INTERVAL",
    };
}

export function useGetActiveStationSet(
    data: StationData[] | undefined
): ActiveStationsResult {

    return useMemo(() => {
        const { stations, samplingType } = checkStationType(data);

        return { activeStations: stations.filter((station) => station.value.length), samplingType: samplingType };
    }, [data]);
}