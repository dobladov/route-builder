import React from 'react';
import { Waypoint } from './App';

export interface Props {
  waypoints: Waypoint[]
}

const DownloadButton = ({ waypoints }: Props) => (
  <button
    className="btn"
    type="button"
    onClick={() => {
      const gpx = `
      <?xml version='1.0' encoding='UTF-8' standalone='yes' ?>
      <gpx version="1.1" >
        ${waypoints.map(({ lat, lng }, i) => (`
          <wpt lat="${lat}" lon="${lng}">
              <name>Waypoint ${i + 1}</name>
          </wpt>`
      ))}
      <trk>
        <name>Route</name>
        <trkseg>
        ${waypoints.map(({ lat, lng }) => (`<trkpt lat="${lat}" lon="${lng}"></trkpt>`))}
        </trkseg>
      </trk>
      </gpx>`;

      // TODO: maybe use a ref instead of creating dom here
      const link = document.createElement('a');
      link.setAttribute('href', `data:text/gpx;charset=utf-8,${encodeURIComponent(gpx)}`);
      link.setAttribute('download', `Waypoints ${new Date().toDateString()}.gpx`);
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }}
  >
    Download your Route
  </button>
);

export default DownloadButton;
