import { createFileRoute } from '@tanstack/react-router'
import { MapContainer, TileLayer } from 'react-leaflet'
import { StationsLayer } from '@/components/StationsLayer'
import { ParameterList } from '@/components/ParameterList'
import { useState } from 'react'

export const Route = createFileRoute('/weather')({
  component: RouteComponent,
})

function RouteComponent() {
  const [parameterId, setParameterId] = useState<string>('');

  if (status === "error") return <div>Error</div>

  if (status === "pending") return <div>Loading...</div>;

  return (
    <div className='relative h-screen w-screen test'>
      <ParameterList parameterId={parameterId} setParameterId={setParameterId} />
      <MapContainer bounds={[[55, 10], [70, 25]]} zoom={13} scrollWheelZoom={false} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <StationsLayer parameterId={parameterId} />
      </MapContainer>
    </div>
  )
}
