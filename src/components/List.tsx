import React from 'react';
import { Menu, Trash } from 'react-feather';
import { Waypoint } from './App';

import '../styles/components/List.css';

export interface Props {
  waypoints: Waypoint[]
  setWaypoints: (waypoints: Waypoint[]) => void
}

const List = ({ waypoints, setWaypoints }: Props) => {
  let draggedItemIndex = null;
  let newOrder = null;

  const onDragStart = (e, index) => {
    draggedItemIndex = index;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    newOrder = null;
  };

  const onDragOver = (index) => {
    const draggedOverItemIndex = index;

    // Do nothing if the item drags over itself
    if (draggedItemIndex === draggedOverItemIndex) {
      return;
    }

    // Fix bug of dragging outside
    const movedItem = waypoints[draggedItemIndex];
    newOrder = waypoints.slice();
    newOrder.splice(draggedItemIndex, 1);
    newOrder.splice(draggedOverItemIndex, 0, movedItem);
  };

  const onDragEnd = () => {
    if (newOrder) {
      setWaypoints(newOrder);
      newOrder = null;
    }
  };

  return (
    <ul className="List">
      {waypoints.map((waypoint, i) => (
        <li
          key={`${waypoint.lat}${waypoint.lng}`}
          onDragOver={() => onDragOver(i)}
        >
          <div
            draggable
            onDragStart={(e) => onDragStart(e, i)}
            onDragEnd={onDragEnd}
          >
            <Menu />
          </div>
          <span className="listTitle">
            {`Waypoint ${i + 1}`}
          </span>
          <Trash
            onClick={() => {
              setWaypoints(waypoints.filter((w, index) => index !== i));
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default List;
