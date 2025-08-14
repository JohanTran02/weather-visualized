import { createFileRoute } from '@tanstack/react-router'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {
  useQuery,
} from '@tanstack/react-query'
import { getWeatherData } from '@/api/weather'


export const Route = createFileRoute('/weather')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeatherData()
  });

  return (
    <MapContainer center={[59.334591, 18.063240]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[59.334591, 18.063240]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}
