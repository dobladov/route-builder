import React, { useEffect, useState } from 'react';
import L from 'leaflet';

import { Waypoint } from './App';

import 'leaflet/dist/leaflet.css';
import '../styles/components/Map.css';

export interface Props {
  waypoints: Waypoint[]
  setWaypoints: (waypoints: Waypoint[]) => void
}

const Map = ({ waypoints, setWaypoints }:Props) => {
  const [map, setMap] = useState(null);
  const [layerPath, setLayerPath] = useState(null);

  // Removes a layer by the given Id
  const removeLayer = (id) => {
    const allLayers = [];
    map.eachLayer((layer) => {
      allLayers.push(layer);
    });

    // Find the layer in allLayers and delete it if found
    const currentMarkersLayer = allLayers.find((l) => l.id === id);
    if (currentMarkersLayer) {
      map.removeLayer(currentMarkersLayer);
    }
  };

  const updateMarkers = () => {
    // Clear the layers
    removeLayer('markers');
    layerPath.clearLayers();

    // Draw the path joining the waypoints
    L.polyline(waypoints.map((w) => [w.lat, w.lng]), {
      color: '#1085E3',
      weight: 8,
    }).addTo(layerPath);

    // Create a new layer for markers
    const newMarkers = new L.FeatureGroup();
    newMarkers.id = 'markers';

    // For each waypoint create and add a marker to the layer
    waypoints.forEach((m, i) => {
      const marker = new L.Marker([m.lat, m.lng], {
        icon: new L.DivIcon({
          html: `<div class="marker">${i + 1}</div>`,
        }),
      });
      newMarkers.addLayer(marker);
    });

    // Add the newMarkers to the map
    map.addLayer(newMarkers);
  };

  // Add the current latLng to the waypoints
  const handleClick = (e) => {
    const { latlng } = e;
    setWaypoints([...waypoints, latlng]);
  };

  useEffect(() => {
    // Set up the map on mount
    const initializeMap = () => {
      const m = L.map('map', {
        center: [52.5200, 13.4050],
        zoom: 13,
        layers: [
          L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          }),
        ],
      });
      setMap(m);
      const layerP = L.layerGroup().addTo(m);
      setLayerPath(layerP);
    };

    if (!map) {
      initializeMap();
    } else {
      // Add click listener
      map.on('click', handleClick);
      updateMarkers();
    }

    // CLean map listeners
    return () => {
      if (map) {
        map.off('click', handleClick);
      }
    };
  }, [map, waypoints]);

  return <div id="map" />;
};

export default Map;
