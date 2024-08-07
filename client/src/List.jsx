import React from "react";
import "./App.css";

function List({ prop }) {
  const { title, host, url, start, hr_duration, color, icon } = prop;

  return (
    <div className="list-item" style={{}}>
      <div className="list-details">
        <a href={url} target="_blank">
          <h2>{title}</h2>
        </a>
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
