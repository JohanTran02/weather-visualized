import * as v from 'valibot'
import { SMHIBaseSchema, LinkTypeSchema, LinksTypeSchema, GeoLinksTypeSchema } from './generic';
import { MetobsStationLinksType } from './station';
import { UnitKeySchema } from '@/utils/unit';

export const MetObsValueTypeSchema = v.union([v.literal('SAMPLING'), v.literal('INTERVAL')]);

export const VersionSchema = v.object({
    ...SMHIBaseSchema.entries,
    link: v.array(LinkTypeSchema),
    resource: v.array(GeoLinksTypeSchema),
});

export const MetObsParameterSchema = v.object({
    ...SMHIBaseSchema.entries,
    unit: UnitKeySchema,
    valueType: MetObsValueTypeSchema,
    link: v.array(LinkTypeSchema),
    stationSet: v.array(LinksTypeSchema),
    station: v.array(MetobsStationLinksType)
});