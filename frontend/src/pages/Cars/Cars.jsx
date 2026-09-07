import { useEffect, useState } from "react";
import API from "../../services/api";
import CarCard from "../../components/CarCard/CarCard";
import "./Cars.css";

function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await API.get("cars/");
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="cars-container">
        <h2>Loading Cars...</h2>
      </div>
    );
  }

  return (
    <div className="cars-container">
      <h1 className="cars-title">Available Cars</h1>

      <div className="cars-grid">
        {cars.length > 0 ? (
          cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
            />
          ))
        ) : (
          <h2>No Cars Available</h2>
        )}
      </div>
    </div>
  );
}

export default Cars;