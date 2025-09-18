import type { MetObsValueType } from "@/types/parameter";
import type { UnitKey } from "@/utils/unit";
import { createContext, type ReactNode } from "react";
import { Parameter, useParameter } from "./useParameterContext";

type ParameterResponse = {
    unit: UnitKey | undefined;
    valueType: MetObsValueType | undefined;
};

const selectUnitAndType = (data: ParameterResponse) => ({
    unit: data.unit,
    valueType: data.valueType,
});

function useParameterValues(parameterId: string) {
    return useParameter(parameterId, selectUnitAndType);
}

type UnitContextType = {
    unitType: UnitKey | undefined,
    samplingValueType: MetObsValueType | undefined,
}

export const UnitContext = createContext<UnitContextType>({
    unitType: undefined,
    samplingValueType: undefined,
});

export const UnitProvider = ({ children }: { children: ReactNode }) => {
    const parameterId = Parameter();
    const { data } = useParameterValues(parameterId);

    return (
        <UnitContext.Provider value={{ unitType: data?.unit, samplingValueType: data?.valueType }}>
            {children}
        </UnitContext.Provider>
    )
} 