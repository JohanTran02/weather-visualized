import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select';
import { useContext } from 'react';
import { ParameterContext } from '@/context/useParameterContext';
import Parameters from './Parameters';

export function ParameterSelect() {
    const { parameterId, setParameterId } = useContext(ParameterContext);

    return (

        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]">
            <Select
                value={parameterId}
                onValueChange={(value) => {
                    setParameterId(value)
                }
                }>
                <SelectTrigger className="w-[280px] bg-white">
                    <SelectValue placeholder="Select a parameter" />
                </SelectTrigger>
                <SelectContent className="z-[1000]">
                    <Parameters />
                </SelectContent>
            </Select>
        </div >
    )
}