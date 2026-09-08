import "./CTA.css";
import { Link } from "react-router-dom";
import {
  FaCar,
  FaUsers,
  FaStar
} from "react-icons/fa";

function CTA() {
  return (
    <section className="cta-section">

      <div className="cta-overlay">

        <span className="cta-tag">
          🚗 Premium Car Rental
        </span>

        <h2>
          Ready for Your Next Adventure?
        </h2>

        <p>
          Explore hundreds of premium cars with affordable
          pricing, trusted agencies and instant online booking.
          Start your journey today.
        </p>

        <div className="cta-buttons">

          <Link to="/cars" className="cta-primary">
            Browse Cars
          </Link>

          <Link to="/login" className="cta-secondary">
            Book Now
          </Link>

        </div>

        <div className="cta-stats">

          <div className="cta-stat">

            <FaCar />

            <h3>500+</h3>

            <span>Cars</span>

          </div>

          <div className="cta-stat">

            <FaUsers />

            <h3>15K+</h3>

            <span>Customers</span>

          </div>

          <div className="cta-stat">

            <FaStar />

            <h3>4.9</h3>

            <span>Rating</span>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CTA;