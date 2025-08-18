import * as v from "valibot"
import { MetObsStationLinksTypeSchema } from "./station";
import { MetObsValueTypeSchema } from "./weather";
import { GeoLinksTypeSchema, LinksTypeSchema, LinkTypeSchema } from "./generic";

export const VersionSchema = v.object({
    key: v.string(),
    updated: v.number(),
    title: v.string(),
    summary: v.string(),
    link: v.optional(v.array(LinkTypeSchema)),
    resource: v.optional(v.array(GeoLinksTypeSchema)),
})

export type VersionType = v.InferOutput<typeof VersionSchema>

export const MetObsParameterSchema = v.object({
    key: v.string(),
    updated: v.number(),
    title: v.string(),
    summary: v.string(),
    unit: v.string(),
    valueType: MetObsValueTypeSchema,
    link: v.optional(v.array(LinkTypeSchema)),
    stationSet: v.optional(v.array(LinksTypeSchema)),
    station: v.optional(MetObsStationLinksTypeSchema)
})