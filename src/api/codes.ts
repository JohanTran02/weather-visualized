import * as v from 'valibot'

const MetObsCodesData = v.object({
    key: v.number(),
    value: v.string(),
});

const MetObsCodesSchema = v.object({
    entry: v.array(MetObsCodesData)
});

type MetObsCodes = v.InferOutput<typeof MetObsCodesSchema>

export const getCodes = async (parameterId: string): Promise<MetObsCodes> => {
    try {
        const response = await fetch(`https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/${parameterId}/codes.json`);

        if (!response.ok) throw new Error(`HTTP error ${response.status}`)

        const data = await response.json();
        const result = v.parse(MetObsCodesSchema, data)

        return result;
    }
    catch (error) {
        console.error(JSON.stringify(error, null, 2));
        throw error;
    }
}