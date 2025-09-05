import * as v from "valibot"
import { LinksTypeSchema, LinkTypeSchema } from "./generic";

export const PeriodUnionSchema = v.union([v.literal('latest-hour'), v.literal('latest-day'), v.literal('latest-months'), v.literal('corrected-archive'), v.literal('all')])
export const MediaTypesUnion = ['application/atom+xml', 'application/xml', 'application/json', 'text/plain', 'application/vnd.iso.19139+xml'] as const;

export type PeriodUnionInput = v.InferInput<typeof PeriodUnionSchema>;

// ======== BASIC TYPES ========
export const MetObsValueTypeSchema = v.union([v.literal('SAMPLING'), v.literal('INTERVAL')]);
export type MetObsValueType = v.InferInput<typeof MetObsValueTypeSchema>;

export const OwnerCategoryTypeSchema = v.union([v.literal('CLIMATE'), v.literal('NATIONAL')]);
export type OwnerCategoryType = v.InferInput<typeof OwnerCategoryTypeSchema>;

export const MeasuringStationsTypeSchema = v.union([v.literal('ALL'), v.literal('CORE'), v.literal('ADDITIONAL')]);
export type MeasuringStationsType = v.InferInput<typeof MeasuringStationsTypeSchema>;

export const MetObsPositionSchema = v.object({
    from: v.number(),
    to: v.number(),
    height: v.number(),
    latitude: v.number(),
    longitude: v.number(),
});

// ======== METOBS PERIOD ========
export const MetObsPeriodSchema = v.object({
    key: v.string(),
    updated: v.number(),
    title: v.string(),
    summary: v.string(),
    from: v.number(),
    to: v.number(),
    link: v.optional(v.array(LinkTypeSchema)),
    data: v.optional(v.array(LinksTypeSchema)),
});

export const MetObsDataTypeSchema = v.object({
    updated: v.number(),
    position: v.array(v.object({
        from: v.number(),
        to: v.number(),
        height: v.number(),
        latitude: v.number(),
        longitude: v.number(),
    })),
    link: v.optional(v.array(LinkTypeSchema)),
    parameter: v.object({
        key: v.string(),
        name: v.string(),
        summary: v.string(),
        unit: v.string(),
    }),
    station: v.object({
        key: v.string(),
        name: v.string(),
        owner: v.string(),
        ownerCategory: OwnerCategoryTypeSchema,
        measuringStations: MeasuringStationsTypeSchema,
        height: v.number(),
    }),
    period: v.object({
        key: v.string(),
        from: v.number(),
        to: v.number(),
        summary: v.string(),
        sampling: v.string(),
    }),
});

export type MetObsDataType = v.InferOutput<typeof MetObsDataTypeSchema>;