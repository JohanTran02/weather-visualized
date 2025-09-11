import {
    useQuery,
} from '@tanstack/react-query'
import { getParameters } from '@/api/version';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { SelectGroup } from '@radix-ui/react-select';
import { type Dispatch, type SetStateAction } from 'react';

export function ParameterList({ parameterId, setParameterId }: {
    parameterId: string, setParameterId: Dispatch<SetStateAction<string>>,
}) {
    const parametersQuery = useQuery({
        queryKey: ["parameters"],
        queryFn: getParameters
    })

    if (parametersQuery.isError) return <div>Error</div>

    if (parametersQuery.isPending) return <div>Loading...</div>;

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
                    <SelectGroup>
                        {
                            parametersQuery.data.resource?.map((parameter) => {
                                if (parameter.summary.includes('1 gång/tim'))
                                    return <SelectItem key={parameter.key + parameter.title} value={parameter.key ? parameter.key : ''}>{parameter.title}</SelectItem>
                                return null;
                            })
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div >
    )
}