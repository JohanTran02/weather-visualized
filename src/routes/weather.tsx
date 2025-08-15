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
  const { data, status } = useQuery({
    queryKey: ["weather"],
    queryFn: getWeatherData
  },);


  if (status === "error") return <div>Error</div>

  if (status === "pending") return <div>Loading...</div>;

  return (

    <MapContainer center={[data.position[2].latitude, data.position[2].longitude]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[data.position[2].latitude, data.position[2].longitude]}>
        <Popup>
          {`Name: ${data.station.name}`} <br />
          {`Owner: ${data.station.owner}`}
        </Popup>
      </Marker>
    </MapContainer>
  )
}
