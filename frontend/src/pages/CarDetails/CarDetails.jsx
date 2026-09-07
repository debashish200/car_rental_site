import "./CarCard.css";

function CarCard({ car }) {
  return (
    <div className="car-card">

      <img
        src={
          car.image ||
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800"
        }
        alt={car.brand}
      />

      <div className="car-info">

        <h2>
          {car.brand} {car.model}
        </h2>

        <p>₹ {car.price_per_hour} / Hour</p>

        <button>Book Now</button>

      </div>
    </div>
  );
}

export default CarCard;