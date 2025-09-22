import { createFileRoute } from "@tanstack/react-router";
import { ParameterSelect } from '@/components/ParameterSelect'
import SheetInfo from "@/components/SheetInfo";
import { UnitProvider } from "@/context/useUnitContext";
import { ParameterProvider } from "@/context/useParameterContext";
import { SheetProvider } from "@/context/useSheetContext";
import { StationProvider } from "@/context/useStationContext";
import Map from "@/components/Map";

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
              <Map />
            </div>
          </StationProvider>
        </SheetProvider>
      </UnitProvider>
    </ParameterProvider>
  );
}
