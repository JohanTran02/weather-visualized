import * as v from 'valibot'
import { UnitKeySchema } from './unit';
import { LinksTypeSchema, LinkTypeSchema, SMHIBaseSchema } from './generic';

export const OwnerCategoryTypeSchema = v.union([v.literal('CLIMATE'), v.literal('NATIONAL')]);

export const MeasuringStationsTypeSchema = v.union([v.literal('ALL'), v.literal('CORE'), v.literal('ADDITIONAL')]);

export const PeriodUnionSchema = v.union([v.literal('latest-hour'), v.literal('latest-day'), v.literal('latest-months'), v.literal('corrected-archive'), v.literal('all')])

export const SMHIBaseMetObsPosition = v.object({
    height: v.number(),
    latitude: v.number(),
    longitude: v.number(),
})

export const MetObsPositionSchema = v.object({
    from: v.number(),
    to: v.number(),
    ...SMHIBaseMetObsPosition.entries
});

const SMHIBaseMetObsData = v.object({
    value: v.string(),
    quality: v.string(),
})

const SMHIStationOwnerData = v.object({
    owner: v.string(),
    ownerCategory: OwnerCategoryTypeSchema,
    measuringStations: MeasuringStationsTypeSchema,
})

export const MetObsSampleValueTypeSchema = v.object({
    ...SMHIBaseMetObsData.entries,
    date: v.number(),
});

export const MetObsIntervalValueTypeSchema = v.object({
    ...SMHIBaseMetObsData.entries,
    from: v.number(),
    to: v.number(),
    ref: v.string(),
});

export const MetObsStationSetSchema = v.object({
    ...SMHIBaseSchema.entries,
    link: v.array(LinkTypeSchema),
    period: v.array(LinksTypeSchema),
});

//Data structure for this API-call example https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/159880.json //MetObsStation
export const MetObsStationSchema = v.intersect([
    SMHIBaseSchema,
    v.object({
        ...SMHIStationOwnerData.entries,
        active: v.boolean(),
        from: v.number(),
        to: v.number(),
        position: MetObsPositionSchema,
        link: v.array(LinkTypeSchema),
        period: v.array(LinksTypeSchema),
    })
]);

export const MetobsStationLinksType = v.intersect([
    LinksTypeSchema,
    v.object({
        name: v.string(),
        ...SMHIStationOwnerData.entries,
        id: v.number(),
        ...SMHIBaseMetObsPosition.entries,
        active: v.boolean(),
        from: v.number(),
        to: v.number(),
    })
])

export const MetObsStationSetSampleDataSchema = v.object({
    key: v.string(),
    name: v.string(),
    ...SMHIStationOwnerData.entries,
    from: v.number(),
    to: v.number(),
    ...SMHIBaseMetObsPosition.entries,
    value: v.array(MetObsSampleValueTypeSchema),
})

export const MetObsStationSetSampleDataArray = v.array(MetObsStationSetSampleDataSchema);

export const MetObsStationSetIntervalDataSchema = v.object({
    key: v.string(),
    name: v.string(),
    ...SMHIStationOwnerData.entries,
    from: v.number(),
    to: v.number(),
    ...SMHIBaseMetObsPosition.entries,
    value: v.array(MetObsIntervalValueTypeSchema),
})

export const MetObsStationSetIntervalDataArray = v.array(MetObsStationSetIntervalDataSchema);

export const StationSchema = v.union([MetObsStationSetSampleDataSchema, MetObsStationSetIntervalDataSchema]);

const SMHIBaseStationParameterData = v.object({
    key: v.string(),
    name: v.string(),
    summary: v.string(),
    unit: UnitKeySchema,
})

const SMHIBaseStationPeriodData = v.object({
    key: v.string(),
    from: v.number(),
    to: v.number(),
    summary: v.string(),
    sampling: v.string(),
})

const SMHIBaseStationData = v.object({
    updated: v.number(),
    parameter: SMHIBaseStationParameterData,
    period: SMHIBaseStationPeriodData,
    link: v.array(LinkTypeSchema),
})

export const MetObsStationSetDataTypeSchema = v.object({
    ...SMHIBaseStationData.entries,
    station: v.array(StationSchema),
});

// https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/188790/period/latest-hour/data.json //metObsDataType metObsSampleData or metObsIntervalData
// Data from a station
export const MetObsDataTypeSchema = v.object({
    ...SMHIBaseStationData.entries,
    station: v.object({
        key: v.string(),
        name: v.string(),
        ...SMHIStationOwnerData.entries,
        height: v.number(),
    }),
    position: v.array(MetObsPositionSchema),
});

export const MetObsStationSampleDataSchema = v.intersect([
    MetObsDataTypeSchema,
    v.object({
        value: v.array(MetObsSampleValueTypeSchema)
    })
]);

export const MetObsStationIntervalDataSchema = v.intersect([
    MetObsDataTypeSchema,
    v.object({
        value: v.array(MetObsIntervalValueTypeSchema)
    })
]);