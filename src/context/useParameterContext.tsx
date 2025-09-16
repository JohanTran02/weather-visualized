import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'

type ParameterContextType = {
    parameterId: string,
    setParameterId: Dispatch<SetStateAction<string>>
}

export const ParameterContext = createContext<ParameterContextType>({
    parameterId: '',
    setParameterId: () => { },
});

export function ParameterProvider({ children }: { children: ReactNode }) {
    const [parameterId, setParameterId] = useState<string>('');

    return (
        <ParameterContext.Provider value={{ parameterId, setParameterId }}>
            {children}
        </ParameterContext.Provider>
    )
}