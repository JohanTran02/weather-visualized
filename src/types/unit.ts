import type { UnitKeySchema } from "@/schemas/unit";
import * as v from "valibot"

export type UnitKey = v.InferOutput<typeof UnitKeySchema>;