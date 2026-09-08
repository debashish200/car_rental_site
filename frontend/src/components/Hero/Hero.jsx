import "./Hero.css";
import { Link } from "react-router-dom";

import heroCar from "../../assets/maincar.jpg"; // Add your car image here

function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">
        <h1>
          Drive Your <span>Dream Car</span><br />
          Anytime, Anywhere
        </h1>

        <p>
          Explore hundreds of premium cars at affordable prices.
          Fast booking, trusted agencies, and a seamless rental
          experience for every journey.
        </p>

        <div className="hero-buttons">

          <Link to="/cars" className="primary-btn">
            Explore Cars
          </Link>

          <Link to="/login" className="secondary-btn">
            Book Now
          </Link>

        </div>

        <div className="hero-stats">

          <div className="stat-card">
            <h2>500+</h2>
            <span>Cars</span>
          </div>

          <div className="stat-card">
            <h2>200+</h2>
            <span>Agencies</span>
          </div>

          <div className="stat-card">
            <h2>15K+</h2>
            <span>Customers</span>
          </div>

        </div>

      </div>

      <div className="hero-right">

        <img
          src={heroCar}
          alt="Luxury Car"
        />

      </div>

    </section>
  );
}

export default Hero;