import React, { useEffect, useState } from "react";
import List from "./List";
import "./App.css";
import Title from "./Title";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000");
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Title></Title>
      <div className="app">
        <div >
          {data.map((el) => {
              return <List key={el.id} prop={el} />
          })}
        </div>
      </div>
    </>
  );
}

export default App;
