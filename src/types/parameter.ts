import * as v from "valibot"
import { MetObsStationSchema } from "./station";
import { MetObsValueTypeSchema } from "./weather";
import { GeoLinksTypeSchema, LinksTypeSchema, LinkTypeSchema } from "./generic";
import { UnitKeySchema } from "./unit";

export const VersionSchema = v.object({
    key: v.string(),
    updated: v.number(),
    title: v.string(),
    summary: v.string(),
    link: v.array(LinkTypeSchema),
    resource: v.array(GeoLinksTypeSchema),
})

export type VersionType = v.InferOutput<typeof VersionSchema>

export const MetObsParameterSchema = v.object({
    key: v.string(),
    updated: v.number(),
    title: v.string(),
    summary: v.string(),
    unit: UnitKeySchema,
    valueType: MetObsValueTypeSchema,
    link: v.array(LinkTypeSchema),
    stationSet: v.array(LinksTypeSchema),
    station: v.array(MetObsStationSchema)
})

export type MetObsParameter = v.InferOutput<typeof MetObsParameterSchema>