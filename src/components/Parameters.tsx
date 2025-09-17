import { useQuery } from "@tanstack/react-query";
import ParameterItem from "./ParameterItem";
import { SelectGroup } from "./ui/select";
import { getParameters } from "@/api/version";


export default function Parameters() {
    const { data, status } = useQuery({
        queryKey: ["parameters"],
        queryFn: getParameters
    })

    if (status === "error") return <div>Error</div>

    if (status === "pending") return <div>Loading...</div>;

    return (
        <SelectGroup>
            {
                data.resource.map((parameter) => {
                    if (parameter.summary.includes('1 gång/tim'))
                        return <ParameterItem key={parameter.key + parameter.title} parameter={parameter} />
                    return null;
                })
            }
        </SelectGroup>
    )
}