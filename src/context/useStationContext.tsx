import type { StationSetData } from '@/types/station';
import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'

const StationContext = createContext<StationSetData | null>(null);

const StationDispatchContext = createContext<Dispatch<SetStateAction<StationSetData | null>>>(() => { })

export function StationProvider({ children }: { children: ReactNode }) {
    const [station, setStation] = useState<StationSetData | null>(null);

    return (
        <StationContext.Provider value={station}>
            <StationDispatchContext.Provider value={setStation}>
                {children}
            </StationDispatchContext.Provider>
        </StationContext.Provider>
    )
}

export const useStation = () => useContext(StationContext);
export const useStationDispatch = () => useContext(StationDispatchContext);