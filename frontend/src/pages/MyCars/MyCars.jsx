import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCars, deleteCar } from "../../services/carService";
import "./MyCars.css";

const BACKEND_URL = "http://127.0.0.1:8000";

function MyCars() {
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    return `${BACKEND_URL}${imagePath}`;
  };

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCars();

      console.log("Cars:", response.data);

      if (Array.isArray(response.data)) {
        setCars(response.data);
      } else if (Array.isArray(response.data.results)) {
        setCars(response.data.results);
      } else {
        setCars([]);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      setError("Unable to load cars.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (carId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this car?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCar(carId);

      setCars((previousCars) =>
        previousCars.filter((car) => car.id !== carId)
      );
    } catch (error) {
      console.error("Error deleting car:", error);

      if (error.response?.data) {
        console.error("Backend error:", error.response.data);
      }

      alert("Unable to delete the car.");
    }
  };

  if (loading) {
    return (
      <div className="my-cars-page">
        <div className="my-cars-loading">
          <p>Loading your cars...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
    <div className="my-cars-header">
      <div className="my-cars-heading"> 
        <h1>My Fleet</h1>
         <p>Manage and monitor your rental vehicles</p> 
         <div className="cars-count"> 
          <span>{cars.length}</span> <small> {cars.length === 1 ? "Vehicle" : "Vehicles"} in your fleet </small>
        </div>
        </div> <button className="add-car-button" onClick={() => navigate("/my-cars/add")} > + Add Car </button> 
      </div>

  {/* Error */ }
  {
    error && (
      <div className="my-cars-error">
        {error}
      </div>
    )
  }

  {/* Car count */ }
  {
    !error && (
      <div className="cars-count">
        {cars.length} car{cars.length !== 1 ? "s" : ""}
      </div>
    )
  }

  {/* Empty state */ }
  {
    !error && cars.length === 0 && (
      <div className="no-cars">
        <div className="empty-car-icon">🚗</div>

        <h2>No cars added yet</h2>

        <p>
          Start building your rental fleet by adding your first car.
        </p>

        <button
          className="add-car-button"
          onClick={() => navigate("/my-cars/add")}
        >
          + Add Your First Car
        </button>
      </div>
    )
  }

  {/* Cars */ }
  {
    !error && cars.length > 0 && (
      <div className="my-cars-grid">

        {cars.map((car) => {
          const carImage = car.images?.[0]?.image || "";

          return (
            <div className="my-car-card" key={car.id}>

              {/* Image */}
              <div className="my-car-image">

                {carImage ? (
                  <img
                    src={getImageUrl(carImage)}
                    alt={car.name}
                  />
                ) : (
                  <div className="car-image-placeholder">
                    🚗
                  </div>
                )}

                <span
                  className={`availability-badge ${car.is_available
                    ? "available"
                    : "unavailable"
                    }`}
                >
                  {car.is_available
                    ? "Available"
                    : "Unavailable"}
                </span>
              </div>

              {/* Content */}
              <div className="my-car-content">

                <div className="car-title-section">
                  <span className="car-brand">
                    {car.brand}
                  </span>

                  <h2>{car.name}</h2>

                  <p className="car-model">
                    Model: {car.model}
                  </p>
                </div>

                <div className="car-price">
                  <strong>₹{car.price_per_hour}</strong>
                  <span>/ hour</span>
                </div>

                <div className="car-info-grid">

                  <div className="car-info-item">
                    <span>Fuel</span>
                    <strong>{car.fuel_type}</strong>
                  </div>

                  <div className="car-info-item">
                    <span>Transmission</span>
                    <strong>{car.transmission}</strong>
                  </div>

                  <div className="car-info-item">
                    <span>Seats</span>
                    <strong>{car.seats}</strong>
                  </div>

                  <div className="car-info-item">
                    <span>Location</span>
                    <strong>{car.location}</strong>
                  </div>

                </div>

                {/* Actions */}
                <div className="car-actions">

                  <button
                    className="edit-car-button"
                    onClick={() =>
                      navigate(`/my-cars/edit/${car.id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-car-button"
                    onClick={() => handleDelete(car.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>
            </div>
          );
        })}

      </div>
    )
  }

    </div >
  );
}

export default MyCars;
