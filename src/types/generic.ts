import { GeoLinksTypeSchema, LinkTypeSchema, LinksTypeSchema, } from "@/schemas/generic";
import * as v from "valibot"

export type LinkType = v.InferInput<typeof LinkTypeSchema>

export type LinksType = v.InferInput<typeof LinksTypeSchema>

export type GeoLinksType = v.InferInput<typeof GeoLinksTypeSchema>;