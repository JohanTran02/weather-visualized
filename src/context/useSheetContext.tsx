import { createContext, useCallback, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'

type SheetContextType = {
    sheetOpen: boolean,
    setSheetOpen: Dispatch<SetStateAction<boolean>>,
    open: () => void,
    close: () => void,
}

export const SheetContext = createContext<SheetContextType>({
    sheetOpen: false,
    setSheetOpen: () => { },
    open: () => { },
    close: () => { }
});

export function SheetProvider({ children }: { children: ReactNode }) {
    const [sheetOpen, setSheetOpen] = useState<boolean>(false);

    const close = useCallback(() => {
        setSheetOpen(false);
    }, [])

    const open = useCallback(() => {
        setSheetOpen(true);
    }, [])

    return (
        <SheetContext.Provider value={{ sheetOpen, setSheetOpen, open, close }}>
            {children}
        </SheetContext.Provider>
    )
}