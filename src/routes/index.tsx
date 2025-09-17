import { createFileRoute } from "@tanstack/react-router";
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import { StationsLayer } from '@/components/StationsLayer'
import { ParameterSelect } from '@/components/ParameterSelect'
import SheetInfo from "@/components/SheetInfo";
import { UnitProvider } from "@/context/useUnitContext";
import { ParameterProvider } from "@/context/useParameterContext";
import { SheetProvider } from "@/context/useSheetContext";
import { StationProvider } from "@/context/useStationContext";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <ParameterProvider>
      <UnitProvider>
        <SheetProvider>
          <StationProvider>
            <div className='relative h-screen w-screen'>
              <SheetInfo />
              <ParameterSelect />
              <MapContainer className="z-0" bounds={[[55, 10], [70, 25]]} zoom={13} scrollWheelZoom={false} zoomControl={false} style={{ height: '100vh', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="topright" />
                <StationsLayer />
              </MapContainer>
            </div>
          </StationProvider>
        </SheetProvider>
      </UnitProvider>
    </ParameterProvider>
  );
}
