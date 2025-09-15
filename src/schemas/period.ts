import * as v from 'valibot'

import { LinkTypeSchema, LinksTypeSchema, SMHIBaseSchema } from './generic';

export const MetObsPeriodSchema = v.intersect([
    SMHIBaseSchema,
    v.object({
        from: v.number(),
        to: v.number(),
        link: v.array(LinkTypeSchema),
        data: v.array(LinksTypeSchema),
    })
]);