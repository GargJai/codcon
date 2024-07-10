import React from "react";
import "./App.css";

function List({ prop }) {
  const { title, host, url, start, hr_duration, color, icon } = prop;

  return (
    <div className="list-item" style={{ borderLeftColor: color }}>
      <div className="list-details">
        <h2>{title}</h2>
        <div className="list-timing">
          <p>Start date: {new Date(start).toLocaleDateString()}</p>
          <p>Start time: {new Date(start).toLocaleTimeString()}</p>
          <p>Duration: {hr_duration}</p>
        </div>
      </div>
      <img src={icon} alt={`${host} icon`} className="list-icon" />
    </div>
  );
}

export default List;
