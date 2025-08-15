import * as v from 'valibot'
import { MetObsStationSetDataTypeSchema, type MetObsStationSetDataType } from '@/types/weather';

export const getStationSet = async (): Promise<MetObsStationSetDataType> => {
    try {
        const response = await fetch('https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station-set/all/period/latest-hour/data.json');

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