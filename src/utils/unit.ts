import * as v from 'valibot'

export const unit = {
    'meter per sekund': 'm/s',
    'celsius': '°C',
    'watt per kvadratmeter': 'W/m²',
    'hektopascal': 'hPa',
    'kod': '',
    'meter': 'm',
    'millimeter per sekund': 'mm/s',
    'millimeter': 'mm',
    'procent': '%',
    'sekund': 's',
    'grader': '°'
} as const;

export const UnitKeySchema = v.picklist(
    Object.keys(unit) as (keyof typeof unit)[]
);

export type UnitKey = v.InferOutput<typeof UnitKeySchema>;

export function convertUnit(value: string, unitType: UnitKey) {
    return `${value} ${unit[unitType]}`;
}