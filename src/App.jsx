import React, {useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './styles.css';
import flighData from './components/flightData.json'

function App() {
  const[flightInfo, setFlightInfo] = useState(flighData.flight);
  
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
    <div className="container">
      <div className="plane" onClick={() => console.log(flightInfo)}>✈️</div>
      <div className="flight-info">
       <p><strong>Flight Number:</strong> {flightInfo.flight_number}</p>
       <p><strong>Departure:</strong> {flightInfo.departure}</p>
       <p><strong>Destination:</strong> {flightInfo.destination}</p>
       <p><strong>Status:</strong> {flightInfo.status}</p>
       <p><strong>Distance:</strong> {flightInfo.distance} km</p>
       <p><strong>Speed:</strong> {flightInfo.speed} km/h</p>
       <p><strong>Altitude:</strong> {flightInfo.altitude} m</p>
       </div>
       </div>
  );
}


export default App
