import * as v from "valibot"

const PeriodUnionSchema = v.union([v.literal('latest-hour'), v.literal('latest-day'), v.literal('latest-months'), v.literal('corrected-archive'), v.literal('all')])
const MediaTypesUnion = ['application/atom+xml', 'application/xml', 'application/json', 'text/plain', 'application/vnd.iso.19139+xml'] as const;

export type PeriodUnionInput = v.InferInput<typeof PeriodUnionSchema>;

// ======== BASIC TYPES ========
export const MetObsValueTypeSchema = v.union([v.literal('SAMPLING'), v.literal('INTERVAL')]);
export type MetObsValueType = v.InferInput<typeof MetObsValueTypeSchema>;

export const OwnerCategoryTypeSchema = v.union([v.literal('CLIMATE'), v.literal('NATIONAL')]);
export type OwnerCategoryType = v.InferInput<typeof OwnerCategoryTypeSchema>;

export const MeasuringStationsTypeSchema = v.union([v.literal('ALL'), v.literal('CORE'), v.literal('ADDITIONAL')]);
export type MeasuringStationsType = v.InferInput<typeof MeasuringStationsTypeSchema>;

// ======== PORTAL BASE TYPES ========

const GeoBoxSchema = v.object({
    minLatitude: v.number(),
    minLongitude: v.number(),
    maxLatitude: v.number(),
    maxLongitude: v.number(),
});

type GeoBoxType = v.InferInput<typeof GeoBoxSchema>

const LinkTypeSchema = v.array(v.object({
    rel: v.string(),
    type: v.pipe(v.string(), v.check((value) => {
        return MediaTypesUnion.some(ext => value.endsWith(ext))
    }, "Must end with a valid media type extension")),
    href: v.pipe(v.string(), v.url(), v.includes('.se')),
}));

type LinkType = v.InferInput<typeof LinkTypeSchema>

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
    updated: number; // xs:dateTime → ISO string
    title: string;
    summary: string;
    link?: LinkType[];
    category?: LinksType[];
}

export interface Category {
    key: string;
    updated: number; // xs:dateTime → ISO string
    title: string;
    summary: string;
    link?: LinkType[];
    version?: LinksType[];
}

export const VersionSchema = v.object({
    key: v.string(),
    updated: v.number(),
    title: v.string(),
    summary: v.string(),
    link: v.optional(LinkTypeSchema),
    resource: v.optional(LinksTypeSchema),
})

export type VersionType = v.InferOutput<typeof VersionSchema>

// DONE 
// ======== METOBS PARAMETER ========
export interface MetObsParameter {
    key: string;
    updated: number; // ISO date
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
    updated: number;
    title: string
    owner: string;
    ownerCategory: OwnerCategoryType;
    measuringStations: MeasuringStationsType;
    active: boolean;
    summary: string;
    from?: number; // optional ISO date
    to?: number;   // optional ISO date
    position?: MetObsPosition;
    link?: LinkType[];
    period?: LinksType[];
}

export interface MetObsStationSet {
    key: string;
    updated: number;
    title: string
    summary: string;
    link?: LinkType[];
    period?: LinksType[];
}

// Root: StationSet
export const MetObsStationSetDataTypeSchema = v.object({
    updated: v.number(),
    station: v.optional(v.array(v.object({
        key: v.string(),
        name: v.string(),
        owner: v.string(),
        ownerCategory: OwnerCategoryTypeSchema,
        measuringStations: MeasuringStationsTypeSchema,
        from: v.number(),
        to: v.number(),
        height: v.number(),
        latitude: v.number(),
        longitude: v.number(),
        value: v.optional(
            v.array(v.union([
                v.object({
                    date: v.number(),
                    value: v.string(),
                    quality: v.string(),
                }),
                v.object({
                    from: v.number(),
                    to: v.number(),
                    ref: v.string(),
                    value: v.string(),
                    quality: v.string(),
                }),
            ]))
        ),
    }))),
    parameter: v.optional(v.object({
        key: v.string(),
        name: v.string(),
        summary: v.string(),
        unit: v.string(),
    })),
    link: v.optional(LinkTypeSchema),
    period: v.optional(v.object({
        key: v.string(),
        from: v.number(),
        to: v.number(),
        summary: v.string(),
        sampling: v.string(),
    })),
});

export type MetObsStationSetDataType = v.InferInput<typeof MetObsStationSetDataTypeSchema>;

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
    from: number; //Datetime
    to: number; //Datetime
}

export interface MetObsPosition {
    from: number; //datetime
    to: number; //datetime
    height: number;
    latitude: number;
    longitude: number;
}

// ======== METOBS PERIOD ========
export interface MetObsPeriod {
    key: string;
    updated: number;
    title: string;
    summary: string;
    from: number; // ISO date
    to: number;   // ISO date
    link?: LinkType[];
    data?: LinksType[];
}

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

export interface MetObsSampleValueType {
    date: number;
    value: string;
    quality: string;
}

export interface MetObsIntervalValueType {
    from: number;
    to: number;
    ref: string;
    value: string;
    quality: string;
}

// ======== Discriminated union for MetObs ========
export type MetObsElement =
    | (MetObsDataType & { _type: "metObsApi" })
    | (MetObsStation & { _type: "metObsStation" })
    | (MetObsStationSetDataType & { _type: "metObsStationSetDataType" });
