import React from 'react';
import { Menu, Trash } from 'react-feather';
import '../styles/components/List.css';
// Placeholder for dragging elements
const placeholder = document.createElement('li');
placeholder.innerHTML = 'Move here';
placeholder.className = 'placeholder';
const List = ({ waypoints, setWaypoints }) => {
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
        setWaypoints(newWaypoints);
    };
    return (React.createElement("ul", { className: "List", onDragOver: onDragOver },
        waypoints.map((waypoint, i) => (React.createElement("li", { key: `${waypoint.lat}${waypoint.lng}`, "data-id": i, draggable: true, onDragEnd: onDragEnd, onDragStart: onDragStart },
            React.createElement("div", null,
                React.createElement(Menu, null)),
            React.createElement("span", { className: "listTitle" }, `Waypoint ${i + 1}`),
            React.createElement(Trash, { onClick: () => {
                    setWaypoints(waypoints.filter((w, index) => index !== i));
                } })))),
        React.createElement("li", { "data-id": waypoints.length, className: "lastPlaceholder" },
            React.createElement("hr", null))));
};
export default List;
