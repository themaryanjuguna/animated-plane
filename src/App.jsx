import React, {useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ProgressBar, AltitudeGauge, SpeedGauge, AltitudeChart } from './components/DashboardWidgets.jsx';
import './styles.css';
// import flighData from './components/flightData.json'

function App() {
  // const[flightInfo, setFlightInfo] = useState(flighData.flight);

  const [flightInfo, setFlightInfo] = useState({
    flight_number: "AA123",
    departure: "Nairobi",
    destination: "Mombasa",
    departure_time: "2024-12-15T08:00:00",
    arrival_time: "2024-12-15T09:30:00",
    status: "On time",
    distance: 400,  // kilometers
    speed: 250,  // km/h
    altitude: 10000,  // meters
    progress: 0,  // Percentage of journey
    history: [], // Array to track altitude history
  });

  // This will handle the "real-time" updates
  useEffect(() => {
    const interval = setInterval (() => {
    // Simulate updates to flight data every second
    setFlightInfo(prevData => {
      let newAltitude = prevData.altitude + (Math.random() * 100-50);// Random fluctuation in altitude
      let newSpeed = prevData.speed + (Math.random() * 10 -5);  // Random fluctuation in speed
      let newProgress = prevData.progress + 1;  // Increase progress by 1% per second

     // Update the altitude history
     const updatedHistory = [...prevData.history, { time: Date.now(), altitude: newAltitude }].slice(-20);

      return{
        ...prevData,
        altitude: Math.max(0, newAltitude), // Prevent negative altitude
        speed: Math.max(0,newSpeed), // Prevent negative speed
        progress: newProgress > 100 ? 100 : newProgress,
        history: updatedHistory,
      };
    });
  }, 1000);  // Update every 1 second

   // Cleanup the interval when the component unmounts
   return () => clearInterval(interval);
}, []);

useEffect (() =>{
  //use GSAP to animate the plane based on flight progress
  gsap.to(".plane", {
    x: `${flightInfo.progress *1.2}vw`, //Adjust based on progress
    y: `-${flightInfo.altitude /100}vh`, //set altitude Effect
    rotation: flightInfo.speed /25,
    duration: 5,
    ease: "power1.inOut",
  });
}, [flightInfo]);

return (
  <div className="dashboard-container">
    <div className="plane-container">
      <div className="plane">✈️</div>
    </div>

    <div className="dashboard">
      {/* Flight Overview Panel */}
      <div className="panel flight-overview">
        <h3>Flight Overview</h3>
        <p><strong>Flight Number:</strong> {flightInfo.flight_number}</p>
        <p><strong>Departure:</strong> {flightInfo.departure}</p>
        <p><strong>Destination:</strong> {flightInfo.destination}</p>
        <p><strong>Status:</strong> {flightInfo.status}</p>
      </div>

      {/* Gauges for Speed and Altitude */}
      <div className="panel gauges">
        <AltitudeGauge altitude={flightInfo.altitude} />
        <SpeedGauge speed={flightInfo.speed} />
      </div>

      {/* Progress Bar */}
      <div className="panel progress">
        <h3>Progress</h3>
        <ProgressBar progress={flightInfo.progress} />
      </div>

      {/* Altitude History Chart */}
      <div className="panel chart">
        <h3>Altitude History</h3>
        <AltitudeChart history={flightInfo.history} />
      </div>
    </div>
  </div>
);
}


export default App
