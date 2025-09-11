import * as v from "valibot"
import { OwnerCategoryTypeSchema, MeasuringStationsTypeSchema, MetObsPositionSchema } from "./weather";
import { LinksTypeSchema, LinkTypeSchema } from "./generic";
import { UnitKeySchema } from "./unit";

export const MetObsSampleValueTypeSchema = v.object({
    date: v.number(),
    value: v.string(),
    quality: v.string(),
});

export type MetObsSampleValueType = v.InferOutput<typeof MetObsSampleValueTypeSchema>;

export const MetObsIntervalValueTypeSchema = v.object({
    from: v.number(),
    to: v.number(),
    ref: v.string(),
    value: v.string(),
    quality: v.string(),
});

export type MetObsIntervalValueType = v.InferOutput<typeof MetObsIntervalValueTypeSchema>;


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
    name: v.string(),
    id: v.number(),
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

export const StationSamplingSchema = v.object({
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
    value: v.array(MetObsSampleValueTypeSchema),
})

export type StationSampling = v.InferOutput<typeof StationSamplingSchema>;

export const StationSamplingArraySchema = v.array(StationSamplingSchema);

export const StationIntervalSchema = v.object({
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
    value: v.array(MetObsIntervalValueTypeSchema),
})
export const StationIntervalArraySchema = v.array(StationIntervalSchema);

export type StationInterval = v.InferOutput<typeof StationIntervalSchema>;

export const StationSchema = v.union([StationSamplingSchema, StationIntervalSchema]);

export type StationData = v.InferOutput<typeof StationSchema>;

export const MetObsStationSetDataTypeSchema = v.object({
    updated: v.number(),
    station: v.optional(v.array(StationSchema)),
    parameter: v.object({
        key: v.string(),
        name: v.string(),
        summary: v.string(),
        unit: UnitKeySchema,
    }),
    link: v.optional(v.array(LinkTypeSchema)),
    period: v.optional(v.object({
        key: v.string(),
        from: v.number(),
        to: v.number(),
        summary: v.string(),
        sampling: v.string(),
    })),
});

export type MetObsStationSetDataType = v.InferOutput<typeof MetObsStationSetDataTypeSchema>;
