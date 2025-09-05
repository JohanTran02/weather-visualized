import { MetObsParameterSchema, type MetObsParameter } from '@/types/parameter';
import * as v from 'valibot'

export const getParameter = async (parameterId: string): Promise<MetObsParameter> => {
    try {
        const response = await fetch(`https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/${parameterId}.json`);

        if (!response.ok) throw new Error(`HTTP error ${response.status}`)

        const data = await response.json();
        const result = v.parse(MetObsParameterSchema, data)
        console.log(result);

        return result;
    }
    catch (error) {
        console.error(JSON.stringify(error, null, 2));
        throw error;
    }
}