import React from 'react'
import { gsap } from 'gsap'
import './styles.css'

function App() {
  const animatePlane = () => {
    gsap.to(".plane", {
      x: "120vw",
      y: "-50vh",
      rotation: 15,
      duration: 5,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    })
  }

  return (
    <div className="container">
      <div className="plane" onClick={animatePlane}>✈️</div>
    </div>
  );
}


export default App
