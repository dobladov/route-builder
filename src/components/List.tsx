import React from 'react';
import { Menu, Trash } from 'react-feather';
import { Waypoint } from './App';

import '../styles/components/List.css';

export interface Props {
  waypoints: Waypoint[]
  setAndSaveWaypoints: (waypoints: Waypoint[]) => void
}

// Placeholder for dragging elements
const placeholder = document.createElement('li');
placeholder.innerHTML = 'Move here';
placeholder.className = 'placeholder';

const List = ({ waypoints, setAndSaveWaypoints }: Props) => {
  let dragged;
  let over;

  const onDragStart = (e) => {
    dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', dragged);
    e.dataTransfer.setDragImage(dragged, 20, 20);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    dragged.style.display = 'none';

    if (e.target.dataset.id) {
      over = e.target;
      e.target.parentNode.insertBefore(placeholder, e.target);
    }
  };

  const onDragEnd = () => {
    dragged.style.display = 'flex';
    dragged.parentNode.removeChild(placeholder);

    const newWaypoints = waypoints.slice();
    const from = Number(dragged.dataset.id);
    const to = Number(over.dataset.id);

    newWaypoints.splice(to, 0, newWaypoints.splice(from, 1)[0]);
    setAndSaveWaypoints(newWaypoints);
  };

  return (
    <ul
      className="List"
      onDragOver={onDragOver}
    >
      {waypoints.map((waypoint, i) => (
        <li
          key={`${waypoint.lat}${waypoint.lng}`}
          data-id={i}
          draggable
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
        >
          <div>
            <Menu />
          </div>
          <span className="listTitle">
            {`Waypoint ${i + 1}`}
          </span>
          <button
            type="button"
            className="listButton"
            onClick={() => {
              setAndSaveWaypoints(waypoints.filter((w, index) => index !== i));
            }}
          >
            <Trash />
          </button>
        </li>
      ))}
      <li
        data-id={waypoints.length}
        className="lastPlaceholder"
      >
        <hr />
      </li>
    </ul>
  );
};

export default List;
