import { createFileRoute } from '@tanstack/react-router'
import { MapContainer, TileLayer } from 'react-leaflet'
import { useQuery } from '@tanstack/react-query'
import { getWeatherData } from '@/api/weather'
import { StationsLayer } from '@/components/StationsLayer'
import { ParameterList } from '@/components/ParameterList'

export const Route = createFileRoute('/weather')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, status } = useQuery({
    queryKey: ["weather"],
    queryFn: getWeatherData
  },);

  if (status === "error") return <div>Error</div>

  if (status === "pending") return <div>Loading...</div>;

  return (
    <div className='relative h-screen w-screen test'>
      <MapContainer center={[data.position[data.position.length - 1].latitude, data.position[data.position.length - 1].longitude]} zoom={13} scrollWheelZoom={false} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <StationsLayer />
      </MapContainer>
      <ParameterList />
    </div>
  )
}
