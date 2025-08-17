import * as v from "valibot"
import { OwnerCategoryTypeSchema, MeasuringStationsTypeSchema, MetObsPositionSchema } from "./weather";
import { LinksTypeSchema, LinkTypeSchema } from "./generic";

export type MetObsStationSetDataType = v.InferInput<typeof MetObsStationSetDataTypeSchema>;

export const MetObsStationSetSchema = v.object({
    key: v.string(),
    updated: v.number(),
    title: v.string(),
    summary: v.string(),
    link: v.optional(v.array(LinkTypeSchema)),
    period: v.optional(v.array(LinksTypeSchema)),
});

export const MetObsStationSchema = v.object({
    key: v.string(),
    updated: v.number(),
    title: v.string(),
    owner: v.string(),
    ownerCategory: OwnerCategoryTypeSchema,
    measuringStations: MeasuringStationsTypeSchema,
    active: v.boolean(),
    summary: v.string(),
    from: v.optional(v.number()),
    to: v.optional(v.number()),
    position: v.optional(MetObsPositionSchema),
    link: v.optional(v.array(LinkTypeSchema)),
    period: v.optional(v.array(LinksTypeSchema)),
});

export const MetObsStationLinksTypeSchema = v.object({
    name: v.string(),
    owner: v.string(),
    ownerCategory: OwnerCategoryTypeSchema,
    measuringStations: MeasuringStationsTypeSchema,
    id: v.number(),
    latitude: v.number(),
    longitude: v.number(),
    height: v.number(),
    active: v.boolean(),
    from: v.number(),
    to: v.number(),
});

export const MetObsStationSetDataTypeSchema = v.object({
    updated: v.number(),
    station: v.optional(v.array(v.object({
        key: v.string(),
        name: v.string(),
        owner: v.string(),
        ownerCategory: OwnerCategoryTypeSchema,
        measuringStations: MeasuringStationsTypeSchema,
        from: v.number(),
        to: v.number(),
        height: v.number(),
        latitude: v.number(),
        longitude: v.number(),
        value: v.optional(
            v.array(v.union([
                v.object({
                    date: v.number(),
                    value: v.string(),
                    quality: v.string(),
                }),
                v.object({
                    from: v.number(),
                    to: v.number(),
                    ref: v.string(),
                    value: v.string(),
                    quality: v.string(),
                }),
            ]))
        ),
    }))),
    parameter: v.optional(v.object({
        key: v.string(),
        name: v.string(),
        summary: v.string(),
        unit: v.string(),
    })),
    link: v.optional(v.array(LinkTypeSchema)),
    period: v.optional(v.object({
        key: v.string(),
        from: v.number(),
        to: v.number(),
        summary: v.string(),
        sampling: v.string(),
    })),
});

