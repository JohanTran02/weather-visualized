import { MetObsStationSetDataTypeSchema, type MetObsStationSetDataType } from '@/types/station';
import * as v from 'valibot'

export const getStationSet = async (parameterId: string): Promise<MetObsStationSetDataType> => {
    try {
        if (!parameterId) throw new Error(`Add parameter before`);
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