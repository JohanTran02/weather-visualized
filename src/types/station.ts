import type { OwnerCategoryTypeSchema, MeasuringStationsTypeSchema, PeriodUnionSchema, MetObsSampleValueTypeSchema, MetObsIntervalValueTypeSchema, MetObsStationSetSampleDataSchema, MetObsStationSetIntervalDataSchema, StationSchema, MetObsStationSetDataTypeSchema, MetObsDataTypeSchema } from "@/schemas/station";
import * as v from "valibot"

export type OwnerCategoryType = v.InferInput<typeof OwnerCategoryTypeSchema>;

export type MeasuringStationsType = v.InferInput<typeof MeasuringStationsTypeSchema>;

export type PeriodUnionInput = v.InferInput<typeof PeriodUnionSchema>;

export type MetObsDataType = v.InferOutput<typeof MetObsDataTypeSchema>;

export type MetObsSampleValueType = v.InferOutput<typeof MetObsSampleValueTypeSchema>;

export type MetObsIntervalValueType = v.InferOutput<typeof MetObsIntervalValueTypeSchema>;

export type MetObsStationSetDataType = v.InferOutput<typeof MetObsStationSetDataTypeSchema>;

export type MetObsStationSetSampleData = v.InferOutput<typeof MetObsStationSetSampleDataSchema>;

export type MetObsStationSetIntervalData = v.InferOutput<typeof MetObsStationSetIntervalDataSchema>;

export type StationData = v.InferOutput<typeof StationSchema>;