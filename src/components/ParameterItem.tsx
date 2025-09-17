import type { GeoLinksType } from "@/types/generic";
import { SelectItem } from "./ui/select";

export default function ParameterItem({ parameter }: { parameter: GeoLinksType }) {
    return (
        <SelectItem
            value={parameter.key ? parameter.key : ''}
        >
            {parameter.title}
        </SelectItem>
    )
}