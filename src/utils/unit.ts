import { unit, type UnitKey } from "@/types/unit";

export function convertUnit(value: string, unitType: UnitKey) {
    return `${value} ${unit[unitType]}`;
}