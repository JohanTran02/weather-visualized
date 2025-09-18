import { getParameter } from '@/api/parameter';
import type { MetObsValueType } from '@/types/parameter';
import type { UnitKey } from '@/utils/unit';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'

type ParameterResponse = {
    unit: UnitKey | undefined;
    valueType: MetObsValueType | undefined;
};

export function useParameter<T>(
    parameterId: string,
    select?: (data: ParameterResponse) => T
) {
    return useQuery({
        queryKey: ["parameter", parameterId],
        queryFn: () => getParameter(parameterId),
        enabled: !!parameterId,
        select,
    });
}

export const ParameterContextDispatch = createContext<Dispatch<SetStateAction<string>>>(() => { })

export const ParameterContext = createContext<string>('');

export function ParameterProvider({ children }: { children: ReactNode }) {
    const [parameterId, setParameterId] = useState<string>('');

    return (
        <ParameterContext.Provider value={parameterId}>
            <ParameterContextDispatch.Provider value={setParameterId}>
                {children}
            </ParameterContextDispatch.Provider>
        </ParameterContext.Provider>
    )
}

export const Parameter = () => useContext(ParameterContext);
export const ParameterDispatch = () => useContext(ParameterContextDispatch);