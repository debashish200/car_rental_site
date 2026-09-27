import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getCarById } from "../../services/carService";

import "./CarDetails.css";

const BACKEND_URL = "http://127.0.0.1:8000";

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return "";
    }

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    return `${BACKEND_URL}${imagePath}`;
  };

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getCarById(id);

        console.log("Car details:", response.data);

        setCar(response.data);

        if (
          response.data.images &&
          response.data.images.length > 0
        ) {
          setSelectedImage(
            getImageUrl(response.data.images[0].image)
          );

          setCurrentImageIndex(0);
        }
      } catch (error) {
        console.error("Error fetching car:", error);
        setError("Unable to load car details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  // Previous image
  const handlePreviousImage = () => {
    if (!car?.images?.length) return;

    const newIndex =
      currentImageIndex === 0
        ? car.images.length - 1
        : currentImageIndex - 1;

    setCurrentImageIndex(newIndex);

    setSelectedImage(
      getImageUrl(car.images[newIndex].image)
    );
  };

  // Next image
  const handleNextImage = () => {
    if (!car?.images?.length) return;

    const newIndex =
      currentImageIndex === car.images.length - 1
        ? 0
        : currentImageIndex + 1;

    setCurrentImageIndex(newIndex);

    setSelectedImage(
      getImageUrl(car.images[newIndex].image)
    );
  };

  // Select thumbnail
  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);

    setSelectedImage(
      getImageUrl(car.images[index].image)
    );
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

      {/* Back Button */}

      <button
        className="back-to-cars"
        onClick={() => navigate("/cars")}
      >
        ← Back to Cars
      </button>


      <div className="car-details-container">

        {/* =================================
            LEFT - IMAGE SLIDER
        ================================= */}

        <div className="car-gallery">

          <div className="main-image-container">

            {selectedImage ? (
              <>
                <img
                  src={selectedImage}
                  alt={car.name}
                  className="main-car-image"
                />

                {car.images &&
                  car.images.length > 1 && (
                    <>
                      <button
                        className="slider-arrow previous"
                        onClick={handlePreviousImage}
                      >
                        ‹
                      </button>

                      <button
                        className="slider-arrow next"
                        onClick={handleNextImage}
                      >
                        ›
                      </button>
                    </>
                  )}

              </>
            ) : (
              <div className="no-image">
                No Image Available
              </div>
            )}

          </div>


          {/* Image Counter */}

          {car.images &&
            car.images.length > 1 && (
              <div className="image-counter">
                {currentImageIndex + 1} / {car.images.length}
              </div>
            )}


          {/* Thumbnails */}

          {car.images &&
            car.images.length > 0 && (

              <div className="car-thumbnails">

                {car.images.map((image, index) => (

                  <button
                    key={image.id}
                    className={
                      index === currentImageIndex
                        ? "thumbnail-button active"
                        : "thumbnail-button"
                    }
                    onClick={() =>
                      handleThumbnailClick(index)
                    }
                  >
                    <img
                      src={getImageUrl(image.image)}
                      alt={`${car.name} ${index + 1}`}
                    />
                  </button>

                ))}

              </div>

            )}

        </div>


        {/* =================================
            RIGHT - CAR INFORMATION
        ================================= */}

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


          {/* Specifications */}

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


            <div className="specification">
              <span className="spec-label">
                Availability
              </span>

              <strong
                className={
                  car.is_available
                    ? "available-text"
                    : "not-available-text"
                }
              >
                {car.is_available
                  ? "Available"
                  : "Not Available"}
              </strong>
            </div>
          </div>


          {/* Buttons */}

          <div className="car-actions">

            <button
              className="book-button"
              disabled={!car.is_available}
              onClick={() =>
                navigate(`/cars/${car.id}/book`)
              }
            >
              {car.is_available
                ? "Book Now"
                : "Currently Unavailable"}
            </button>


            <button
              className="secondary-back-button"
              onClick={() => navigate("/cars")}
            >
              ← Back to Cars
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CarDetails;