import * as v from "valibot"
import { MediaTypesUnion } from "./weather";
import { UnitKeySchema } from "./unit";

export const GeoBoxSchema = v.object({
    minLatitude: v.number(),
    minLongitude: v.number(),
    maxLatitude: v.number(),
    maxLongitude: v.number(),
});

export const LinkTypeSchema = v.object({
    rel: v.string(),
    type: v.pipe(v.string(), v.check((value) => {
        return MediaTypesUnion.some(ext => value.endsWith(ext))
    }, "Must end with a valid media type extension")),
    href: v.pipe(v.string(), v.url(), v.includes('.se')),
});

export type LinkType = v.InferInput<typeof LinkTypeSchema>

export const LinksTypeSchema = v.object({
    key: v.string(),
    updated: v.number(),
    title: v.string(),
    summary: v.string(),
    link: v.array(LinkTypeSchema)
});

export type LinksType = v.InferInput<typeof LinksTypeSchema>

export const GeoLinksTypeSchema = v.object({ ...LinksTypeSchema.entries, geoBox: GeoBoxSchema })

export type GeoLinksType = v.InferInput<typeof GeoLinksTypeSchema>;

export const ParameterLinksType = v.intersect([v.array(LinksTypeSchema), v.object({ ...GeoBoxSchema.entries, unit: UnitKeySchema })])