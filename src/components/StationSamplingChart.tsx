import { getStation } from "@/api/station";
import { Parameter } from "@/context/useParameterContext";
import { UnitContext } from "@/context/useUnitContext";
import type { MetObsSampleValueType } from "@/types/station";
import { unit } from "@/utils/unit";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { type TooltipContentProps, CartesianGrid, XAxis, YAxis, Tooltip, Line, LineChart } from "recharts";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

function useStationValues(stationId: string) {
    const parameterId = Parameter();

    return useQuery({
        queryKey: ["station", parameterId, stationId],
        queryFn: () => getStation(parameterId, stationId),
        enabled: !!stationId && !!parameterId,
    })
}

interface StationSamplingChartData {
    date: Date;
    value: number;
    quality: string;
}

/**
 * Converts the data to display on charts
 * @return {StationSamplingChartData[]} 
 */
function convertValues(values: MetObsSampleValueType[]): StationSamplingChartData[] {
    return values.map((value) => {
        return {
            quality: value.quality,
            date: new Date(value.date),
            value: parseInt(value.value),
        }
    })
}

interface ConvertToLocaleDateArgs {
    /** Date value to format (Date, ISO string, or timestamp). */
    input: Date | string | number;
    /** Locale code. Defaults to undefined. */
    locale?: Intl.LocalesArgument;
    /** Formatting options (see Intl.DateTimeFormat). */
    format?: Intl.DateTimeFormatOptions;
}

/**
 * Formats a date into a locale-aware string.
 *
 * @example
 * convertToLocaleDate({
 *   input: "2025-09-24T14:30:00Z",
 *   locale: "sv-SE",
 *   format: { hour: "2-digit", minute: "2-digit" }
 * });
 * // => "16:30"
 */
function convertToLocaleDate({
    input,
    locale = undefined,
    format = {},
}: ConvertToLocaleDateArgs): string {
    return new Date(input).toLocaleString(locale, format);
}

interface CustomTooltipContentProps extends TooltipContentProps<ValueType, NameType> {
    payload: StationSamplingChartData[];
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipContentProps) => {
    const { unitType } = useContext(UnitContext);
    const isVisible = active && payload && payload.length && unitType;
    const date = convertToLocaleDate({ input: label?.toString() as string });
    return (
        <div className="custom-tooltip bg-white border-2 text-center p-2">
            {isVisible && (
                <>
                    <p className="label">{`${date}`}</p>
                    <p className="intro">{`${payload[0].value} ${unit[unitType]}`}</p>
                </>
            )}
        </div>
    );
};


export default function StationSamplingChart({ stationId }: { stationId: string }) {
    const { unitType } = useContext(UnitContext);
    const { data, status } = useStationValues(stationId);

    if (status === "error") return <div>Error</div>;
    if (status === "pending") return <div>Loading...</div>;

    if (!unitType) return <p>Undefined unit type</p>;

    const values = convertValues(data.value as MetObsSampleValueType[]);

    return (
        <LineChart
            width={500}
            height={300}
            data={values}
            margin={{
                top: 10,
                right: 10,
                bottom: 10,
                left: 10
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(string: Date) => {
                const date = convertToLocaleDate({ input: string, locale: "sv-SE", format: { hour: '2-digit', minute: '2-digit' } });
                return date
            }} />
            <YAxis unit={unit[unitType]} />
            <Tooltip content={CustomTooltip} />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    );
}