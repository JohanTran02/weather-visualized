
import { MetObsStationSetDataTypeSchema, StationSchema } from '@/schemas/station';
import * as v from 'valibot'

export type MetObsStationSetDataType = v.InferOutput<typeof MetObsStationSetDataTypeSchema>;

export type MetObsStationDataType = v.InferOutput<typeof StationSchema>;

export const getStationSet = async (parameterId: string): Promise<MetObsStationSetDataType> => {
    try {
        const response = await fetch(`https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/${parameterId}/station-set/all/period/latest-hour/data.json`);

        if (!response.ok) throw new Error(`HTTP error ${response.status}`)

        const data = await response.json();
        const result = v.parse(MetObsStationSetDataTypeSchema, data)
        console.log(result);

        return result;
    }
    catch (error) {
        console.error(JSON.stringify(error, null, 2));
        throw error;
    }
}

export const getStation = async (parameterId: string, stationId: string): Promise<MetObsStationDataType> => {
    try {
        const response = await fetch(`https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/${parameterId}/station/${stationId}/period/latest-day/data.json`);

        if (!response.ok) throw new Error(`HTTP error ${response.status}`)

        const data = await response.json();
        const result = v.parse(StationSchema, data);

        return result;
    }
    catch (error) {
        console.error(JSON.stringify(error, null, 2));
        throw error;
    }
}