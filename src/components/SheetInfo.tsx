import { useContext } from "react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import type { MetObsIntervalValueType, MetObsSampleValueType } from "@/types/station";
import { convertUnit, unit } from "@/utils/unit";
import { UnitContext } from "@/context/useUnitContext";
import { SheetContext } from "@/context/useSheetContext";
import { useStation } from "@/context/useStationContext";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis, type TooltipContentProps } from 'recharts'
import { useQuery } from "@tanstack/react-query";
import { getStation } from "@/api/station";
import { Parameter } from "@/context/useParameterContext";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

function useStationValues(stationId: string) {
    const parameterId = Parameter();

    return useQuery({
        queryKey: ["station", parameterId, stationId],
        queryFn: () => getStation(parameterId, stationId),
        enabled: !!stationId && !!parameterId,
    })
}

/**
 * Converts the data to display on charts
 * @param {MetObsSampleValueType[]} values 
 * @returns 
 */
function convertValues(values: MetObsSampleValueType[]) {
    return values.map((value) => {
        return {
            ...value,
            date: new Date(value.date),
            value: parseInt(value.value),
        }
    })
}

const CustomTooltip = ({ active, payload, label }: TooltipContentProps<ValueType, NameType>) => {
    const { unitType } = useContext(UnitContext);
    const isVisible = active && payload && payload.length && unitType;
    const date = new Date(label?.toString() as string).toLocaleString('sv-SE');
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


function SamplingValuesTable({ stationId }: { stationId: string }) {
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
                const date = new Date(string).toLocaleString("sv-SE", { hour: '2-digit', minute: '2-digit' })
                return date
            }} />
            <YAxis unit={unit[unitType]} />
            <Tooltip content={CustomTooltip} />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    );
}

function IntervalValuesTable({ values, }: { values?: MetObsIntervalValueType[] }) {
    const { unitType } = useContext(UnitContext);

    if (!values || values.length === 0) return <p>No interval data</p>;
    if (!unitType) return <p>Undefined unit type</p>;

    return (
        <ul>
            {values.map(v => (
                <li key={v.from + unitType}>
                    From: {v.from}, To: {v.to}, Ref: {v.ref}, Value: {convertUnit(v.value, unitType)}, Quality: {v.quality}
                </li>
            ))}
        </ul>
    );
}

export default function SheetInfo() {
    const { sheetOpen, setSheetOpen } = useContext(SheetContext);
    const { samplingValueType } = useContext(UnitContext);
    const station = useStation();

    if (!station || !samplingValueType) return null;

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetContent side="bottom">
                <SheetHeader>
                    <SheetTitle>{station.name}</SheetTitle>
                    <SheetDescription>{`${station.owner}'s measuring station`}</SheetDescription>
                    <p>Latitude: {station.latitude}°</p>
                    <p>Longitude: {station.longitude}°</p>
                    <p>Altitude: {station.height}m</p>
                </SheetHeader>
                {
                    samplingValueType === "SAMPLING" ? (
                        <SamplingValuesTable key={station.key} stationId={station.key} />
                    ) : (
                        <IntervalValuesTable values={station.value as MetObsIntervalValueType[]} />
                    )
                }
                <SheetFooter>Based on data from SMHI</SheetFooter>
            </SheetContent>
        </Sheet>
    )
}