import type { MetObsSampleValueTypeSchema, MetObsIntervalValueTypeSchema, MetObsStationSetSampleDataSchema, MetObsStationSetIntervalDataSchema, StationSchema } from "@/schemas/station";
import * as v from "valibot"

export type MetObsSampleValueType = v.InferOutput<typeof MetObsSampleValueTypeSchema>;

export type MetObsIntervalValueType = v.InferOutput<typeof MetObsIntervalValueTypeSchema>;

export type MetObsStationSetSampleData = v.InferOutput<typeof MetObsStationSetSampleDataSchema>;

export type MetObsStationSetIntervalData = v.InferOutput<typeof MetObsStationSetIntervalDataSchema>;

export type StationData = v.InferOutput<typeof StationSchema>;