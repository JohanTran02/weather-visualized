import { createPortal } from 'react-dom'
import {
    useQuery,
} from '@tanstack/react-query'
import { getParameters } from '@/api/parameter';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { SelectGroup } from '@radix-ui/react-select';
import { useState } from 'react';

export function ParameterList() {
    const { data, status } = useQuery({
        queryKey: ["parameters"],
        queryFn: getParameters
    })

    const [selectedValue, setSelectedValue] = useState<string>('')

    if (status === "error") return <div>Error</div>

    if (status === "pending") return <div>Loading...</div>;

    return (

        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]">
            <Select
                value={selectedValue}
                onValueChange={(value) => setSelectedValue(value)}>
                <SelectTrigger className="w-[280px] bg-white">
                    <SelectValue placeholder="Select a parameter" />
                </SelectTrigger>
                <SelectContent className="z-[1000]">
                    <SelectGroup>
                        {
                            data.resource?.map((parameter) => <SelectItem key={parameter.key ? parameter.key : ''} value={parameter.title + parameter.summary}>{parameter.title}</SelectItem>)
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div >
    )
}