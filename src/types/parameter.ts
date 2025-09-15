import type { MetObsValueTypeSchema, VersionSchema, MetObsParameterSchema } from "@/schemas/parameter";
import * as v from "valibot"

export type MetObsValueType = v.InferInput<typeof MetObsValueTypeSchema>;

export type VersionType = v.InferOutput<typeof VersionSchema>

export type MetObsParameter = v.InferOutput<typeof MetObsParameterSchema>