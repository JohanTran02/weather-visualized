import { VersionSchema } from '@/types/parameter';
import { type VersionType } from '@/types/parameter';
import * as v from 'valibot'

//Can perhaps create types and use them in the api files?
export const getParameters = async (): Promise<VersionType> => {
    try {
        const response = await fetch('https://opendata-download-metobs.smhi.se/api/version/1.0.json');

        if (!response.ok) throw new Error(`HTTP error ${response.status}`)

        const data = await response.json();
        const result = v.parse(VersionSchema, data)
        console.log(result);

        return result;
    }
    catch (error) {
        console.error(JSON.stringify(error, null, 2));
        throw error;
    }
}