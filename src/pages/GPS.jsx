
// import { useEffect, useRef, useState } from "react";

// const API = "https://ALAMAT-NGROK/gps";

// function GPS() {
//   const hasSent = useRef(false);
//   const [status, setStatus] = useState("Menunggu GPS...");

//   useEffect(() => {
//     if (hasSent.current) return;
//     hasSent.current = true;

//     if (!navigator.geolocation) {
//       setStatus("GPS tidak didukung");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const data = {
//           lat: position.coords.latitude,
//           long: position.coords.longitude
//         };

//         try {
//           const response = await fetch(API, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json"
//             },
//             body: JSON.stringify(data)
//           });

//           if (!response.ok) {
//             throw new Error("HTTP " + response.status);
//           }

//           setStatus("GPS berhasil dikirim");

//         } catch (error) {
//           console.error(error);
//           setStatus("Gagal mengirim GPS");
//         }
//       },

//       (error) => {
//         setStatus(error.message);
//       },

//       {
//         enableHighAccuracy: true,
//         timeout: 15000,
//         maximumAge: 0
//       }
//     );

//   }, []);

//   return (
//     <section>
//       <h2>GPS TRACKER</h2>
//       <p>{status}</p>
//     </section>
//   );
// }

// export default GPS;

import { useEffect, useRef, useState } from "react";

import * as L from "leaflet";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Perbaikan icon marker untuk Vite
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

const API = "https://ALAMAT-NGROK/gps";

function GPS() {

  const hasSent = useRef(false);

  const [status, setStatus] = useState("Menunggu GPS...");

  const [position, setPosition] = useState(null);

  useEffect(() => {

    if (hasSent.current) return;

    hasSent.current = true;

    if (!navigator.geolocation) {
      setStatus("GPS tidak didukung");
      return;
    }

    navigator.geolocation.getCurrentPosition(

      async (gps) => {

        const data = {
          lat: gps.coords.latitude,
          long: gps.coords.longitude
        };

        // Simpan posisi untuk Leaflet
        setPosition(data);

        setStatus("GPS ditemukan, mengirim data...");

        // POST ke REST API
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

          setStatus("Lokasi ditemukan, tetapi POST gagal");

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

    <section className="gps-container">

      <h2>GPS TRACKER</h2>

      <p>{status}</p>

      {position && (

        <>

          <div className="gps-info">

            <p>Latitude: {position.lat}</p>

            <p>Longitude: {position.long}</p>

          </div>

          <MapContainer
            center={[position.lat, position.long]}
            zoom={16}
            scrollWheelZoom={true}
            className="gps-map"
          >

            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
              position={[position.lat, position.long]}
            >

              <Popup>
                <b>SUMINAR GPS TRACKER</b>
                <br />
                Latitude: {position.lat}
                <br />
                Longitude: {position.long}
              </Popup>

            </Marker>

          </MapContainer>

        </>

      )}

    </section>

  );

}

export default GPS;
