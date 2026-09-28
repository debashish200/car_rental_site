
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyBookings } from "../../services/bookingService";
import { getCarById } from "../../services/carService";
import "./MyBookings.css";

const BACKEND_URL = "http://127.0.0.1:8000";

function MyBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    return `${BACKEND_URL}${imagePath}`;
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMyBookings();

        console.log("My bookings:", response.data);

        let bookingData = [];

        if (Array.isArray(response.data)) {
          bookingData = response.data;
        } else if (Array.isArray(response.data.results)) {
          bookingData = response.data.results;
        }

        // Get complete car details using booking.car ID
        const bookingsWithCars = await Promise.all(
          bookingData.map(async (booking) => {
            try {
              const carId =
                typeof booking.car === "object"
                  ? booking.car?.id
                  : booking.car;

              if (!carId) {
                return {
                  ...booking,
                  car_details: null,
                };
              }

              const carResponse = await getCarById(carId);

              return {
                ...booking,
                car_details: carResponse.data,
              };
            } catch (carError) {
              console.error(
                "Error fetching car details:",
                carError
              );

              return {
                ...booking,
                car_details: null,
              };
            }
          })
        );

        setBookings(bookingsWithCars);

      } catch (error) {
        console.error("Error fetching bookings:", error);

        if (error.response?.status === 401) {
          setError(
            "Your session has expired. Please login again."
          );
        } else {
          setError(
            "Unable to load your bookings."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // -----------------------------------
  // Loading
  // -----------------------------------

  if (loading) {
    return (
      <div className="my-bookings-status">
        <div className="loading-spinner"></div>
        <p>Loading your bookings...</p>
      </div>
    );
  }

  // -----------------------------------
  // Error
  // -----------------------------------

  if (error) {
    return (
      <div className="my-bookings-page">

        <div className="my-bookings-error">
          <h2>Unable to load bookings</h2>

          <p>{error}</p>

          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>

      </div>
    );
  }

  return (
    <div className="my-bookings-page">

      {/* Header */}

      <div className="my-bookings-header">

        <div>
          <h1>My Bookings</h1>

          <p>
            View your complete car rental history
          </p>
        </div>

        <button
          className="browse-cars-button"
          onClick={() => navigate("/cars")}
        >
          Browse Cars
        </button>

      </div>

      {/* Booking Count */}

      {bookings.length > 0 && (
        <div className="booking-count">
          {bookings.length} booking
          {bookings.length !== 1 ? "s" : ""}
        </div>
      )}

      {/* Empty */}

      {bookings.length === 0 ? (

        <div className="no-bookings">

          <div className="empty-car-icon">
            🚗
          </div>

          <h2>No bookings yet</h2>

          <p>
            You haven't booked a car yet.
          </p>

          <button
            className="browse-cars-button"
            onClick={() => navigate("/cars")}
          >
            Browse Cars
          </button>

        </div>

      ) : (

        <div className="bookings-list">

          {bookings.map((booking) => {

            // -----------------------------------
            // Car Details
            // -----------------------------------

            const carName =
              booking.car_details?.name ||
              "Car Rental";

            const carBrand =
              booking.car_details?.brand ||
              "";

            const carModel =
              booking.car_details?.model ||
              "";

            const carImage =
              booking.car_details?.images?.[0]?.image ||
              "";

            // -----------------------------------
            // Total Price
            // -----------------------------------

            const totalAmount =
              booking.total_price ??
              "0.00";

            // -----------------------------------
            // Status
            // -----------------------------------

            const status =
              booking.status ||
              "Confirmed";

            // -----------------------------------
            // Pickup Time
            // Backend field = start_date
            // -----------------------------------

            const formattedStart = booking.start_date
              ? new Date(
                  booking.start_date
                ).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "Not available";

            // -----------------------------------
            // Return Time
            // Backend field = end_date
            // -----------------------------------

            const formattedEnd = booking.end_date
              ? new Date(
                  booking.end_date
                ).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "Not available";

            // -----------------------------------
            // Duration
            // Calculate from start_date and end_date
            // -----------------------------------

            let duration = "—";

            if (
              booking.start_date &&
              booking.end_date
            ) {
              const start = new Date(
                booking.start_date
              );

              const end = new Date(
                booking.end_date
              );

              const difference =
                end - start;

              if (difference > 0) {
                const totalMinutes = Math.floor(
                  difference / (1000 * 60)
                );

                const days = Math.floor(
                  totalMinutes / (60 * 24)
                );

                const hours = Math.floor(
                  (totalMinutes % (60 * 24)) / 60
                );

                const minutes =
                  totalMinutes % 60;

                if (days > 0) {
                  duration = `${days} day${
                    days !== 1 ? "s" : ""
                  }`;

                  if (hours > 0) {
                    duration += ` ${hours} hour${
                      hours !== 1 ? "s" : ""
                    }`;
                  }
                } else if (hours > 0) {
                  duration = `${hours} hour${
                    hours !== 1 ? "s" : ""
                  }`;

                  if (minutes > 0) {
                    duration += ` ${minutes} min`;
                  }
                } else {
                  duration = `${minutes} min`;
                }
              }
            }

            return (

              <div
                className="booking-history-card"
                key={booking.id}
              >

                {/* Small Car Image */}

                <div className="booking-history-image">

                  {carImage ? (

                    <img
                      src={getImageUrl(carImage)}
                      alt={carName}
                    />

                  ) : (

                    <div className="booking-placeholder">
                      🚗
                    </div>

                  )}

                </div>

                {/* Main Details */}

                <div className="booking-history-content">

                  {/* Car */}

                  <div className="booking-car-details">

                    <span>
                      {carBrand}
                    </span>

                    <h2>
                      {carName}
                    </h2>

                    {carModel && (
                      <p>
                        Model: {carModel}
                      </p>
                    )}

                  </div>

                  {/* Status */}

                  <div
                    className={`booking-history-status ${status
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {status}
                  </div>

                  {/* Time */}

                  <div className="booking-time-details">

                    <div>
                      <span>Pickup</span>

                      <strong>
                        {formattedStart}
                      </strong>
                    </div>

                    <div className="time-separator">
                      →
                    </div>

                    <div>
                      <span>Return</span>

                      <strong>
                        {formattedEnd}
                      </strong>
                    </div>

                  </div>

                  {/* Duration */}

                  <div className="booking-duration">

                    <span>
                      Duration
                    </span>

                    <strong>
                      {duration}
                    </strong>

                  </div>

                  {/* Price */}

                  <div className="booking-history-price">

                    <span>
                      Total
                    </span>

                    <strong>
                      ₹{totalAmount}
                    </strong>

                  </div>

                </div>

              </div>

            );
          })}

        </div>

      )}

    </div>
  );
}

export default MyBookings;

