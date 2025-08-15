import * as v from "valibot"

const PeriodUnionSchema = v.union([v.literal('latest-hour'), v.literal('latest-day'), v.literal('latest-months'), v.literal('corrected-archive')])
const MediaTypesUnion = ['application/atom+xml', 'application/xml', 'application/json', 'text/plain', 'application/vnd.iso.19139+xml'] as const;

export type PeriodUnionInput = v.InferInput<typeof PeriodUnionSchema>;

// ======== PORTAL BASE TYPES ========

// Shared geographic bounding box
// export interface GeoBox {
//     minLatitude: number;
//     minLongitude: number;
//     maxLatitude: number;
//     maxLongitude: number;
// }

const GeoBoxSchema = v.object({
    minLatitude: v.number(),
    minLongitude: v.number(),
    maxLatitude: v.number(),
    maxLongitude: v.number(),
});

type GeoBoxType = v.InferInput<typeof GeoBoxSchema>

// A single link with attributes
// export interface LinkType {
//     rel: string;
//     type: string;
//     href: string; // URI Link
// }

const LinkTypeSchema = v.array(v.object({
    rel: v.string(),
    type: v.pipe(v.string(), v.check((value) => {
        return MediaTypesUnion.some(ext => value.endsWith(ext))
    }, "Must end with a valid media type extension")),
    href: v.pipe(v.string(), v.url(), v.includes('.se')),
}));

type LinkType = v.InferInput<typeof LinkTypeSchema>

// Metadata block with optional key and multiple links
// export interface LinksType {
//     key?: string;
//     updated: string; // xs:dateTime → ISO string
//     title: string;
//     summary: string;
//     link?: LinkType[];
// }

export const LinksTypeSchema = v.array(v.object({
    key: v.optional(v.string()),
    updated: v.number(),
    title: v.string(),
    summary: v.string(),
    link: LinkTypeSchema
}))

export type LinksType = v.InferInput<typeof LinksTypeSchema>

// LinksType + GeoBox
export interface GeoLinksType extends LinksType {
    geoBox: GeoBoxType;
}

// LinksType + unit + GeoBox
export interface ParameterLinksType extends LinksType {
    unit: string;
    geoBox: GeoBoxType;
}

// ======== TOP-LEVEL ELEMENTS ========

export interface Api {
    updated: string; // xs:dateTime → ISO string
    title: string;
    summary: string;
    link?: LinkType[];
    category?: LinksType[];
}

export interface Category {
    key: string;
    updated: string; // xs:dateTime → ISO string
    title: string;
    summary: string;
    link?: LinkType[];
    version?: LinksType[];
}

// export interface Version {
//     key: string;
//     updated: string; // xs:dateTime → ISO string
//     title: string;
//     summary: string;
//     link?: LinkType[];
//     resource?: LinksType[];
// }

export const VersionSchema = v.object({
    key: v.string(),
    updated: v.number(),
    title: v.string(),
    summary: v.string(),
    link: v.optional(LinkTypeSchema),
    resource: v.optional(LinksTypeSchema),
})

export type VersionType = v.InferOutput<typeof VersionSchema>

// // Discriminated union for XML root elements
// export type PortalElement =
//     | (Api & { _type: "api" })
//     | (Category & { _type: "category" })
//     | (Version & { _type: "version" });

// DONE 
// ======== METOBS PARAMETER ========
export interface MetObsParameter {
    key: string;
    updated: string; // ISO date
    title: string;
    summary: string;
    unit: string;
    valueType: MetObsValueType;
    link?: LinkType[];
    stationSet?: LinksType[];
    station?: MetObsStationLinksType[];
}

// Root: Station
export interface MetObsStation {
    key: string;
    updated: string;
    title: string
    owner: string;
    ownerCategory: OwnerCategoryType;
    measuringStations: MeasuringStationsType;
    active: boolean;
    summary: string;
    from?: string; // optional ISO date
    to?: string;   // optional ISO date
    position?: MetObsPosition;
    link?: LinkType[];
    period?: LinksType[];
}

export interface MetObsStationSet {
    key: string;
    updated: string;
    title: string
    summary: string;
    link?: LinkType[];
    period?: LinksType[];
}

// Root: StationSet
export interface MetObsStationSetDataType {
    updated: string;
    parameter?: {
        key: string;
        name: string;
        summary: string;
        unit: string;
    }
    link?: LinkType[];
    period?: {
        key: string;
        from: string; //datetime
        to: string; //datetime
        summary: string;
        sampling: string;
    }
}

// ======== METOBS STATION LINK EXTENSIONS ========
export interface MetObsStationLinksType extends LinksType {
    name: string;
    owner: string;
    ownerCategory: OwnerCategoryType;
    measuringStations: MeasuringStationsType;
    id: number;
    latitude: number;
    longitude: number;
    height: number;
    active: boolean;
    from: string; //Datetime
    to: string; //Datetime
}

export interface MetObsPosition {
    from: string; //datetime
    to: string; //datetime
    height: number;
    latitude: number;
    longitude: number;
}

// ======== METOBS PERIOD ========
export interface MetObsPeriod {
    key: string;
    updated: string;
    title: string;
    summary: string;
    from: string; // ISO date
    to: string;   // ISO date
    link?: LinkType[];
    data?: LinksType[];
}

// ======== BASIC TYPES ========
export const MetObsValueTypeSchema = v.union([v.literal('SAMPLING'), v.literal('INTERVAL')]);
export type MetObsValueType = v.InferInput<typeof MetObsValueTypeSchema>;

export const OwnerCategoryTypeSchema = v.union([v.literal('CLIMATE'), v.literal('NATIONAL')]);
export type OwnerCategoryType = v.InferInput<typeof OwnerCategoryTypeSchema>;

export const MeasuringStationsTypeSchema = v.union([v.literal('ALL'), v.literal('CORE'), v.literal('ADDITIONAL')]);
export type MeasuringStationsType = v.InferInput<typeof MeasuringStationsTypeSchema>;

// ======== TOP-LEVEL METOBS ELEMENTS ========
// Root: API for metobs
export const MetObsDataTypeSchema = v.object({
    updated: v.number(),
    position: v.array(v.object({
        from: v.number(),
        to: v.number(),
        height: v.number(),
        latitude: v.number(),
        longitude: v.number(),
    })),
    link: v.optional(LinkTypeSchema),
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

export type MetObsDataType = v.InferInput<typeof MetObsDataTypeSchema>;

export interface MetObsSampleData extends MetObsDataType {
    value?: MetObsSampleValueType;
}

export interface MetObsIntervalData extends MetObsDataType {
    value?: MetObsSampleValueType;
}

export interface MetobsStationSetSampleData extends MetObsStationSetDataType {
    station?: {
        key: string;
        name: string;
        owner: string;
        ownerCategory: string;
        measuringStations: MeasuringStationsType;
        from: string;
        to: string;
        height: number;
        latitude: number;
        longitude: number;
        value?: MetObsSampleData
    }
}

export interface MetObsStationsSetIntervalData extends MetObsStationSetDataType {
    station?: {
        key: string;
        name: string;
        owner: string;
        ownerCategory: string;
        measuringStations: MeasuringStationsType;
        from: string;
        to: string;
        height: number;
        latitude: number;
        longitude: number;
        value?: MetObsSampleData
    }
}

export interface MetObsSampleValueType {
    date: string;
    value: string;
    quality: string;
}

export interface MetObsIntervalValueType {
    from: string;
    to: string;
    ref: string;
    value: string;
    quality: string;
}

// ======== Discriminated union for MetObs ========
export type MetObsElement =
    | (MetObsDataType & { _type: "metObsApi" })
    | (MetObsStation & { _type: "metObsStation" })
    | (MetObsStationSetDataType & { _type: "metObsStationSetDataType" });
