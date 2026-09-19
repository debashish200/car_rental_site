import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getCarById } from "../../services/carService";

import "./CarDetails.css";

const BACKEND_URL = "http://127.0.0.1:8000";
function CarDetails() {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    fetchCarDetails();
  }, [id]);


  const fetchCarDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCarById(id);

      console.log("Car details:", response.data);

      setCar(response.data);

      // Select first image
      if (
        response.data.images &&
        response.data.images.length > 0
      ) {
        setSelectedImage(
  getImageUrl(response.data.images[0].image)
);
      }

    } catch (error) {
      console.error("Error fetching car:", error);

      setError(
        "Unable to load car details."
      );
    } finally {
      setLoading(false);
    }
  };
  const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "";
  }

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  return `${BACKEND_URL}${imagePath}`;
};


  if (loading) {
    return (
      <div className="car-details-status">
        <p>Loading car details...</p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="car-details-status">
        <p>{error}</p>
      </div>
    );
  }


  if (!car) {
    return (
      <div className="car-details-status">
        <p>Car not found.</p>
      </div>
    );
  }


  return (
    <div className="car-details-page">

      {/* =========================
          IMAGE SECTION
      ========================== */}

      <div className="car-gallery">

        {/* Main Image */}

        <div className="main-car-image">

          {selectedImage ? (
            <img
              src={selectedImage}
              alt={car.name}
            />
          ) : (
            <div className="no-image">
              No Image Available
            </div>
          )}

        </div>


        {/* Thumbnail Images */}

        {car.images &&
          car.images.length > 0 && (

            <div className="car-thumbnails">

              {car.images.map((image) => (

                <button
                  key={image.id}
                  className={
                    selectedImage === image.image
                      ? "thumbnail-button active"
                      : "thumbnail-button"
                  }
                  onClick={() =>
  setSelectedImage(getImageUrl(image.image))
}
                >

                  <img
  src={getImageUrl(image.image)}
  alt={`${car.name} ${image.id}`}
/>

                </button>

              ))}

            </div>

          )}

      </div>


      {/* =========================
          CAR INFORMATION
      ========================== */}

      <div className="car-information">

        <div className="car-title-section">

          <span className="car-brand">
            {car.brand}
          </span>

          <h1>{car.name}</h1>

          <p className="car-model">
            Model: {car.model}
          </p>

        </div>


        {/* Price */}

        <div className="car-price">

          <span>
            ₹{car.price_per_hour}
          </span>

          <small>
            / hour
          </small>

        </div>


        {/* Car Specifications */}

        <div className="car-specifications">

          <div className="specification">

            <span className="spec-label">
              Fuel Type
            </span>

            <strong>
              {car.fuel_type}
            </strong>

          </div>


          <div className="specification">

            <span className="spec-label">
              Transmission
            </span>

            <strong>
              {car.transmission}
            </strong>

          </div>


          <div className="specification">

            <span className="spec-label">
              Seats
            </span>

            <strong>
              {car.seats}
            </strong>

          </div>


          <div className="specification">

            <span className="spec-label">
              Location
            </span>

            <strong>
              {car.location}
            </strong>

          </div>

        </div>


        {/* Availability */}

        <div className="availability">

          <span
            className={
              car.is_available
                ? "available"
                : "not-available"
            }
          >
            {car.is_available
              ? "Available"
              : "Not Available"}
          </span>

        </div>


        {/* Owner */}

        <div className="car-owner">

          <span>
            Listed by
          </span>

          <strong>
            {car.owner}
          </strong>

        </div>


        {/* Book Button */}

        <button
          className="book-button"
          disabled={!car.is_available}
        >
          {car.is_available
            ? "Book Now"
            : "Currently Unavailable"}
        </button>

      </div>

    </div>
  );
}


export default CarDetails;