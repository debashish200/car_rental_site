import { useNavigate } from "react-router-dom";

function CarCard({ car }) {

    const navigate = useNavigate();

    return (
        <div className="car-card">

            <div className="car-image">
                🚗
            </div>

            <h2>{car.brand} {car.model}</h2>

            <p>₹{car.price_per_hour} / hour</p>

            <p>{car.location}</p>

            <button
                onClick={() => navigate(`/cars/${car.id}`)}
            >
                View Details
            </button>

        </div>
    );
}

export default CarCard;