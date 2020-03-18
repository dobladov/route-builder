import React, { useState } from 'react';
import List from './List';
import Map from './Map';
import DownloadButton from './DownloadButton';
import '../styles/components/App.css';
const App = () => {
    const [waypoints, setWaypoints] = useState(JSON.parse(localStorage.getItem('waypoints')) || []);
    const setAndSaveWaypoints = (newWaypoints) => {
        localStorage.setItem('waypoints', JSON.stringify(newWaypoints));
        setWaypoints(newWaypoints);
    };
    return (React.createElement("div", { className: "App wrapper" },
        React.createElement("aside", null,
            React.createElement("h1", null, "Route Builder"),
            React.createElement(List, { waypoints: waypoints, setAndSaveWaypoints: setAndSaveWaypoints }),
            (waypoints.length > 0) && (React.createElement(DownloadButton, { waypoints: waypoints }))),
        React.createElement("main", null,
            React.createElement(Map, { waypoints: waypoints, setAndSaveWaypoints: setAndSaveWaypoints }))));
};
export default App;
