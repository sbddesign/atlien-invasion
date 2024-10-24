"use client"

// components/Map.js
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
  iconUrl: '/leaflet/images/marker-icon.png',
  shadowUrl: '/leaflet/images/marker-shadow.png',
});

function MapUpdater({ position }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [map, position]);

  return null;
}

const Map = ({ position }) => {
  const [mapPosition, setMapPosition] = useState(position);

  useEffect(() => {
    setMapPosition(position);
  }, [position]);

  return (
    <MapContainer center={mapPosition} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={mapPosition}>
        <Popup>You are here!</Popup>
      </Marker>
      <MapUpdater position={mapPosition} />
    </MapContainer>
  );
};

export default Map;
