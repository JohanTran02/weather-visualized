import { createFileRoute } from "@tanstack/react-router";
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import { StationsLayer } from '@/components/StationsLayer'
import { ParameterList } from '@/components/ParameterList'
import { useState } from "react";
import SheetInfo from "@/components/SheetInfo";
import type { StationData } from "@/types/station";
import { UnitProvider } from "@/context/useUnitContext";
import { ParameterProvider } from "@/context/useParameterContext";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [station, setStation] = useState<StationData | null>(null);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

  return (
    <ParameterProvider>
      <UnitProvider>
        <div className='relative h-screen w-screen'>
          <SheetInfo sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} station={station} />
          <ParameterList />
          <MapContainer className="z-0" bounds={[[55, 10], [70, 25]]} zoom={13} scrollWheelZoom={false} zoomControl={false} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position="topright" />
            <StationsLayer setSheetOpen={setSheetOpen} setStation={setStation} />
          </MapContainer>
        </div>
      </UnitProvider>
    </ParameterProvider>
  );
}
