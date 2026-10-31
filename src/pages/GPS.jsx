
import { useEffect, useRef, useState } from "react";

const API = "https://ALAMAT-NGROK/gps";

function GPS() {
  const hasSent = useRef(false);
  const [status, setStatus] = useState("Menunggu GPS...");

  useEffect(() => {
    if (hasSent.current) return;
    hasSent.current = true;

    if (!navigator.geolocation) {
      setStatus("GPS tidak didukung");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const data = {
          lat: position.coords.latitude,
          long: position.coords.longitude
        };

        try {
          const response = await fetch(API, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });

          if (!response.ok) {
            throw new Error("HTTP " + response.status);
          }

          setStatus("GPS berhasil dikirim");

        } catch (error) {
          console.error(error);
          setStatus("Gagal mengirim GPS");
        }
      },

      (error) => {
        setStatus(error.message);
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );

  }, []);

  return (
    <section>
      <h2>GPS TRACKER</h2>
      <p>{status}</p>
    </section>
  );
}

export default GPS;
