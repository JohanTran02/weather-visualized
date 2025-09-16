import type { MetObsValueType } from "@/types/parameter";
import type { UnitKey } from "@/utils/unit";
import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

type UnitContextType = {
    unitType: UnitKey | undefined,
    samplingValueType: MetObsValueType | undefined,
    setUnitType: Dispatch<SetStateAction<UnitKey | undefined>>,
    setSamplingValueType: Dispatch<SetStateAction<MetObsValueType | undefined>>,
}

export const UnitContext = createContext<UnitContextType>({
    unitType: undefined,
    samplingValueType: undefined,
    setUnitType: () => { },
    setSamplingValueType: () => { }
});

export const UnitProvider = ({ children }: { children: ReactNode }) => {
    const [unitType, setUnitType] = useState<UnitKey | undefined>(undefined);
    const [samplingValueType, setSamplingValueType] = useState<MetObsValueType | undefined>(undefined)

    return (
        <UnitContext.Provider value={{ unitType, samplingValueType, setUnitType, setSamplingValueType }}>
            {children}
        </UnitContext.Provider>
    )
} 