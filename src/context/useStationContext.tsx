import type { StationData } from '@/types/station';
import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'

type StationContextType = {
    station: StationData | null,
    setStation: Dispatch<SetStateAction<StationData | null>>
}

export const StationContext = createContext<StationContextType>({
    station: null,
    setStation: () => { },
});

export function StationProvider({ children }: { children: ReactNode }) {
    const [station, setStation] = useState<StationData | null>(null);

    return (
        <StationContext.Provider value={{ station, setStation }}>
            {children}
        </StationContext.Provider>
    )
}