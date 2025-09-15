import * as v from 'valibot'

export const MediaTypesUnion = ['application/atom+xml', 'application/xml', 'application/json', 'text/plain', 'application/vnd.iso.19139+xml'] as const;

export const GeoBoxSchema = v.object({
    minLatitude: v.number(),
    minLongitude: v.number(),
    maxLatitude: v.number(),
    maxLongitude: v.number(),
});

export const SMHIBaseSchema = v.object({
    key: v.string(),
    updated: v.number(),
    title: v.string(),
    summary: v.string(),
})

export const LinkTypeSchema = v.object({
    rel: v.string(),
    type: v.pipe(v.string(), v.check((value) => {
        return MediaTypesUnion.some(ext => value.endsWith(ext))
    }, "Must end with a valid media type extension")),
    href: v.pipe(v.string(), v.url(), v.includes('.se')),
});

export const LinksTypeSchema = v.object({
    ...SMHIBaseSchema.entries,
    link: v.array(LinkTypeSchema)
});

export const GeoLinksTypeSchema = v.object({ ...LinksTypeSchema.entries, geoBox: GeoBoxSchema })