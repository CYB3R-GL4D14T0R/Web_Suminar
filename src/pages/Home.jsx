

function Home() {
  const frames = [
    { title: "CAR WASH", image: "/car00.png" },
    { title: "AUTO DETAILING", image: "/car00.png" },
    { title: "INTERIOR CLEANING", image: "/car00.png" },
    { title: "EXTERIOR CARE", image: "/car00.png" },
    { title: "POLISHING", image: "/car00.png" },
    { title: "ENGINE CLEANING", image: "/car00.png" },
    { title: "MOTOR WASH", image: "/car00.png" },
    { title: "PAINT PROTECTION", image: "/car00.png" },
    { title: "OUR SERVICES", image: "/car00.png" }
  ];

  return (
    <section className="home">

      {/* <div className="hero-text">
        <h2>YOUR CAR, OUR CARE</h2>
        <p>Professional Car Wash & Detailing</p>
      </div> */}

      <div className="frame-grid">

        {frames.map((item, index) => (
          <div className="frame" key={index}>

            <img src={item.image} alt={item.title} />

            <h3>{item.title}</h3>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Home;
