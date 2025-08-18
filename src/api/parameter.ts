import * as v from 'valibot'
// import { MetObsStationSetDataTypeSchema, type MetObsStationSetDataType } from '@/types/weather';

export const getStationSet = async () => {
    try {
        const response = await fetch('https://opendata-download-metobs.smhi.se/api/version/1.0.json');

        if (!response.ok) throw new Error(`HTTP error ${response.status}`)

        const data = await response.json();
        // const result = v.parse(MetObsStationSetDataTypeSchema, data)
        // console.log(result);

        return data;
    }
    catch (error) {
        console.error(JSON.stringify(error, null, 2));
        throw error;
    }
}