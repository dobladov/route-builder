import React from 'react';
const DownloadButton = ({ waypoints }) => {
    const gpx = `
  <?xml version='1.0' encoding='UTF-8' standalone='yes' ?>
    <gpx version="1.1" >
      ${waypoints.map(({ lat, lng }, i) => (`
        <wpt lat="${lat}" lon="${lng}">
            <name>Waypoint ${i + 1}</name>
        </wpt>`))}
    <trk>
      <name>Route</name>
      <trkseg>
      ${waypoints.map(({ lat, lng }) => (`<trkpt lat="${lat}" lon="${lng}"></trkpt>`))}
      </trkseg>
    </trk>
  </gpx>`;
    return (React.createElement("a", { href: `data:text/xml;charset=utf-8,${encodeURIComponent(gpx)}`, className: "btn", download: `Waypoints ${new Date().toDateString()}.gpx` }, "Download your Route"));
};
export default DownloadButton;
