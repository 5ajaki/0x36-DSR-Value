"use client";

import { useState } from "react";

export default function Home() {
  const [daiValue, setDaiValue] = useState(null);

  const calculateDaiValue = async () => {
    try {
      const response = await fetch("/api/calculate");
      const data = await response.json();
      setDaiValue(data.daiValue);
    } catch (error) {
      console.error("Error:", error);
      setDaiValue("Error occurred while calculating");
    }
  };

  return (
    <div>
      <h1>sDAI Calculator</h1>
      <button onClick={calculateDaiValue}>Calculate</button>
      {daiValue && <p>DAI Value: {daiValue}</p>}
    </div>
  );
}
