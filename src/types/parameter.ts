import type { MetObsValueTypeSchema } from "@/schemas/parameter";
import * as v from "valibot"

export type MetObsValueType = v.InferInput<typeof MetObsValueTypeSchema>;