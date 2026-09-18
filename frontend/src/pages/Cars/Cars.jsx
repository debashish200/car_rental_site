import { useEffect, useState } from "react";
import { getCars } from "../../services/carService";

import "./Cars.css";

function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCars();

      console.log("Cars API Response:", response.data);

      setCars(response.data);
    } catch (error) {
      console.error("Cars API Error:", error);

      setError("Unable to load cars.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="cars-page">
        <h2>Loading cars...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cars-page">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="cars-page">
      <div className="cars-header">
        <h1>Available Cars</h1>
        <p>Choose a car that fits your journey.</p>
      </div>

      {cars.length === 0 ? (
        <div className="no-cars">
          <h2>No cars available</h2>
          <p>Please check again later.</p>
        </div>
      ) : (
        <div className="cars-grid">
          {cars.map((car) => (
            <div className="car-card" key={car.id}>
              <h2>{car.name}</h2>

              <p>
                <strong>Brand:</strong> {car.brand}
              </p>

              <p>
                <strong>Model:</strong> {car.model}
              </p>

              <p>
                <strong>Price:</strong> ₹{car.price_per_hour} / hour
              </p>

              <button>View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cars;