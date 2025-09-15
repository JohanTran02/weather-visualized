import { MetObsDataTypeSchema } from '@/schemas/station';
import type { MetObsDataType } from '@/types/station';
import * as v from 'valibot'

export const getWeatherData = async (): Promise<MetObsDataType> => {
    try {
        const response = await fetch('https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/97120/period/latest-day/data.json');

        if (!response.ok) throw new Error(`HTTP error ${response.status}`)

        const data = await response.json();
        const result = v.parse(MetObsDataTypeSchema, data)

        console.log(result);
        return result;
    }
    catch (error) {
        console.error(JSON.stringify(error, null, 2));
        throw error;
    }
}