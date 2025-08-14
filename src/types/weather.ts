import * as v from "valibot"

//Kolla på variants i valibot imorgon
const PeriodUnion = v.union([v.literal('latest-hour'), v.literal('latest-day'), v.literal('latest-months'), v.literal('corrected-archive')])

export type PeriodUnionInput = v.InferInput<typeof PeriodUnion>;

// ======== PORTAL BASE TYPES ========

// Shared geographic bounding box
export interface GeoBox {
    minLatitude: number;
    minLongitude: number;
    maxLatitude: number;
    maxLongitude: number;
}

// A single link with attributes
export interface LinkType {
    rel: string;
    type: string;
    href: string; // URI Link
}

// Metadata block with optional key and multiple links
export interface LinksType {
    key?: string;
    updated: string; // xs:dateTime → ISO string
    title: string;
    summary: string;
    link?: LinkType[];
}

// LinksType + GeoBox
export interface GeoLinksType extends LinksType {
    geoBox: GeoBox;
}

// LinksType + unit + GeoBox
export interface ParameterLinksType extends LinksType {
    unit: string;
    geoBox: GeoBox;
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

export interface Version {
    key: string;
    updated: string; // xs:dateTime → ISO string
    title: string;
    summary: string;
    link?: LinkType[];
    resource?: LinksType[];
}

// Discriminated union for XML root elements
export type PortalElement =
    | (Api & { _type: "api" })
    | (Category & { _type: "category" })
    | (Version & { _type: "version" });

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
export type MetObsValueType = 'SAMPLING' | 'INTERVAL';
export type OwnerCategoryType = 'CLIMATE' | 'NATIONAL';
export type MeasuringStationsType = 'ALL' | 'CORE' | 'ADDITIONAL';

// ======== TOP-LEVEL METOBS ELEMENTS ========

// Root: API for metobs
export interface MetObsDataType {
    updated: string;
    position?: MetObsPosition,
    link?: LinkType[];
    parameter: {
        key: string;
        name: string;
        summary: string;
        unit: string;
    }
    station: {
        key: string;
        name: string;
        owner: string;
        ownerCategory: OwnerCategoryType;
        measuringStations: MeasuringStationsType;
        height: number;
    }
    period: {
        key: string;
        from: string; //datetime
        to: string; //datetime
        summary: string;
        sampling: string;
    }
}

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
