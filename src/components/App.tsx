import React, { useState } from 'react';

import List from './List';
import Map from './Map';
import DownloadButton from './DownloadButton';

import '../styles/components/App.css';

export interface Waypoint {
  lat: number
  lng: number
}

const App = () => {
  const [waypoints, setWaypoints] = useState<Waypoint[]>(
    JSON.parse(localStorage.getItem('waypoints')) || [],
  );

  const setAndSaveWaypoints = (newWaypoints) => {
    localStorage.setItem('waypoints', JSON.stringify(newWaypoints));
    setWaypoints(newWaypoints);
  };

  return (
    <div className="App wrapper">
      <aside>
        <h1>Route Builder</h1>

        <List
          waypoints={waypoints}
          setAndSaveWaypoints={setAndSaveWaypoints}
        />

        {(waypoints.length > 0) && (
          <DownloadButton
            waypoints={waypoints}
          />
        )}
      </aside>

      <main>
        <Map
          waypoints={waypoints}
          setAndSaveWaypoints={setAndSaveWaypoints}
        />
      </main>
    </div>
  );
};

export default App;
