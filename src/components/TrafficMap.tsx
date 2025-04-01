import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const trafficHotspots = [
  { lat: 40.7128, lng: -74.006, level: 'high', vehicles: { cars: 150, bikes: 30, buses: 10, trucks: 20 } },
  { lat: 40.7228, lng: -73.996, level: 'medium', vehicles: { cars: 80, bikes: 20, buses: 5, trucks: 10 } },
  { lat: 40.7328, lng: -74.016, level: 'low', vehicles: { cars: 30, bikes: 10, buses: 2, trucks: 5 } },
];

export default function TrafficMap() {
  const [hotspots, setHotspots] = useState(trafficHotspots);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live updates
      setHotspots(spots => spots.map(spot => ({
        ...spot,
        vehicles: {
          cars: Math.floor(Math.random() * 200),
          bikes: Math.floor(Math.random() * 50),
          buses: Math.floor(Math.random() * 15),
          trucks: Math.floor(Math.random() * 30),
        }
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[40.7128, -74.006]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {hotspots.map((hotspot, index) => (
          <Circle
            key={index}
            center={[hotspot.lat, hotspot.lng]}
            radius={500}
            pathOptions={{
              color: hotspot.level === 'high' ? 'red' : hotspot.level === 'medium' ? 'orange' : 'green',
              fillColor: hotspot.level === 'high' ? 'red' : hotspot.level === 'medium' ? 'orange' : 'green',
              fillOpacity: 0.5,
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold mb-2">Traffic Details</h3>
                <p>Cars: {hotspot.vehicles.cars}</p>
                <p>Bikes: {hotspot.vehicles.bikes}</p>
                <p>Buses: {hotspot.vehicles.buses}</p>
                <p>Trucks: {hotspot.vehicles.trucks}</p>
              </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
}