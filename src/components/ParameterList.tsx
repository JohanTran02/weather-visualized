import {
    useQuery,
} from '@tanstack/react-query'
import { getParameters } from '@/api/parameter';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { SelectGroup } from '@radix-ui/react-select';
import { type Dispatch, type SetStateAction } from 'react';

export function ParameterList({ parameterId, setParameterId }: { parameterId: string, setParameterId: Dispatch<SetStateAction<string>> }) {
    const { data, status } = useQuery({
        queryKey: ["parameters"],
        queryFn: getParameters
    })

    if (status === "error") return <div>Error</div>

    if (status === "pending") return <div>Loading...</div>;

    return (

        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]">
            <Select
                value={parameterId}
                onValueChange={(value) => setParameterId(value)}>
                <SelectTrigger className="w-[280px] bg-white">
                    <SelectValue placeholder="Select a parameter" />
                </SelectTrigger>
                <SelectContent className="z-[1000]">
                    <SelectGroup>
                        {
                            data.resource?.map((parameter) => <SelectItem key={parameter.key ? parameter.key : ''} value={parameter.key ? parameter.key : ''}>{parameter.title}</SelectItem>)
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div >
    )
}