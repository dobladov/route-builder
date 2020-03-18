import React from 'react';
import { Menu, Trash } from 'react-feather';
import '../styles/components/List.css';
const List = ({ waypoints, setWaypoints }) => {
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
    return (React.createElement("ul", { className: "List" }, waypoints.map((waypoint, i) => (React.createElement("li", { key: `${waypoint.lat}${waypoint.lng}`, onDragOver: () => onDragOver(i) },
        React.createElement("div", { draggable: true, onDragStart: (e) => onDragStart(e, i), onDragEnd: onDragEnd },
            React.createElement(Menu, null)),
        React.createElement("span", { className: "listTitle" }, `Waypoint ${i + 1}`),
        React.createElement(Trash, { onClick: () => {
                setWaypoints(waypoints.filter((w, index) => index !== i));
            } }))))));
};
export default List;
