import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCarById } from "../../services/carService";
import { createBooking } from "../../services/bookingService";
import "./Booking.css";

const BACKEND_URL = "http://127.0.0.1:8000";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");

  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const [duration, setDuration] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  // -----------------------------------
  // Get image URL
  // -----------------------------------
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    return `${BACKEND_URL}${imagePath}`;
  };

  // -----------------------------------
  // Fetch car details
  // -----------------------------------
  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);

        const response = await getCarById(id);

        setCar(response.data);
      } catch (error) {
        console.error("Error fetching car:", error);
        setServerError("Unable to load car details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  // -----------------------------------
  // Calculate duration and amount
  // -----------------------------------
  useEffect(() => {
    if (!startDate || !startTime || !endDate || !endTime) {
      setDuration(0);
      setTotalAmount(0);
      return;
    }

    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);

    if (end <= start) {
      setDuration(0);
      setTotalAmount(0);
      return;
    }

    const differenceInMilliseconds = end - start;

    const differenceInHours =
      differenceInMilliseconds / (1000 * 60 * 60);

    setDuration(differenceInHours);

    if (car) {
      setTotalAmount(differenceInHours * Number(car.price_per_hour));
    }
  }, [
    startDate,
    startTime,
    endDate,
    endTime,
    car,
  ]);

  // -----------------------------------
  // Frontend validation
  // -----------------------------------
  const validateBooking = () => {
    const newErrors = {};

    if (!startDate) {
      newErrors.startDate = "Please select a pickup date.";
    }

    if (!startTime) {
      newErrors.startTime = "Please select a pickup time.";
    }

    if (!endDate) {
      newErrors.endDate = "Please select a return date.";
    }

    if (!endTime) {
      newErrors.endTime = "Please select a return time.";
    }

    // If fields are missing, stop here.
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    const now = new Date();

    // -----------------------------------
    // Start date/time cannot be in past
    // -----------------------------------
    if (start <= now) {
      newErrors.startDate =
        "Pickup date and time cannot be in the past.";

      newErrors.startTime =
        "Please select a future pickup time.";
    }

    // -----------------------------------
    // End must be after start
    // -----------------------------------
    if (end <= start) {
      newErrors.endDate =
        "Return date and time must be after pickup.";

      newErrors.endTime =
        "Return time must be after pickup time.";
    }

    // -----------------------------------
    // Car availability
    // -----------------------------------
    if (car && !car.is_available) {
      newErrors.general =
        "This car is currently unavailable.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // -----------------------------------
  // Confirm booking
  // -----------------------------------
  const handleBooking = async () => {
    setServerError("");

    const isValid = validateBooking();

    if (!isValid) {
      return;
    }

    try {
      setBookingLoading(true);

      const startDateTime = `${startDate}T${startTime}`;
      const endDateTime = `${endDate}T${endTime}`;

      const bookingData = {
        car: car.id,
        start_time: startDateTime,
        end_time: endDateTime,
      };

      console.log("Booking data:", bookingData);

      const response = await createBooking(bookingData);

      console.log("Booking successful:", response.data);

      // Go to My Bookings after successful booking
      navigate("/my-bookings", {
        state: {
          bookingSuccess: true,
          message: "Booking confirmed successfully!",
        },
      });
    } catch (error) {
      console.error("Booking error:", error);

      // Backend validation error
      if (error.response?.data) {
        const data = error.response.data;

        if (typeof data === "string") {
          setServerError(data);
        } else if (data.error) {
          setServerError(data.error);
        } else if (data.detail) {
          setServerError(data.detail);
        } else if (data.message) {
          setServerError(data.message);
        } else {
          setServerError(
            "Unable to complete the booking. Please check your selected time."
          );
        }
      } else {
        setServerError(
          "Unable to connect to the server. Please try again."
        );
      }
    } finally {
      setBookingLoading(false);
    }
  };

  // -----------------------------------
  // Loading
  // -----------------------------------
  if (loading) {
    return (
      <div className="booking-status">
        <p>Loading booking details...</p>
      </div>
    );
  }

  // -----------------------------------
  // Error
  // -----------------------------------
  if (!car) {
    return (
      <div className="booking-status">
        <p>Car not found.</p>
        <button onClick={() => navigate("/cars")}>
          Back to Cars
        </button>
      </div>
    );
  }

  // -----------------------------------
  // Main UI
  // -----------------------------------
  return (
    <div className="booking-page">

      {/* Back Button */}
      <button
        className="booking-back-button"
        onClick={() => navigate(`/cars/${car.id}`)}
      >
        ← Back to Car Details
      </button>

      {/* Page Heading */}
      <div className="booking-heading">
        <h1>Book Your Car</h1>
        <p>
          Select your pickup and return date and time
        </p>
      </div>

      <div className="booking-container">

        {/* -------------------------------- */}
        {/* LEFT SIDE */}
        {/* -------------------------------- */}

        <div className="booking-form-section">

          <div className="booking-card">

            <h2>Rental Details</h2>

            {/* Pickup */}
            <div className="booking-group">

              <h3>Pickup Details</h3>

              <div className="input-row">

                <div className="input-group">
                  <label>Pickup Date</label>

                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);

                      setErrors((prev) => ({
                        ...prev,
                        startDate: "",
                      }));
                    }}
                  />

                  {errors.startDate && (
                    <p className="validation-error">
                      {errors.startDate}
                    </p>
                  )}
                </div>

                <div className="input-group">
                  <label>Pickup Time</label>

                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => {
                      setStartTime(e.target.value);

                      setErrors((prev) => ({
                        ...prev,
                        startTime: "",
                      }));
                    }}
                  />

                  {errors.startTime && (
                    <p className="validation-error">
                      {errors.startTime}
                    </p>
                  )}
                </div>

              </div>

            </div>

            {/* Return */}
            <div className="booking-group">

              <h3>Return Details</h3>

              <div className="input-row">

                <div className="input-group">
                  <label>Return Date</label>

                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);

                      setErrors((prev) => ({
                        ...prev,
                        endDate: "",
                      }));
                    }}
                  />

                  {errors.endDate && (
                    <p className="validation-error">
                      {errors.endDate}
                    </p>
                  )}
                </div>

                <div className="input-group">
                  <label>Return Time</label>

                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => {
                      setEndTime(e.target.value);

                      setErrors((prev) => ({
                        ...prev,
                        endTime: "",
                      }));
                    }}
                  />

                  {errors.endTime && (
                    <p className="validation-error">
                      {errors.endTime}
                    </p>
                  )}
                </div>

              </div>

            </div>

            {/* General error */}
            {errors.general && (
              <div className="general-error">
                {errors.general}
              </div>
            )}

            {/* Backend error */}
            {serverError && (
              <div className="server-error">
                {serverError}
              </div>
            )}

          </div>

        </div>

        {/* -------------------------------- */}
        {/* RIGHT SIDE */}
        {/* -------------------------------- */}

        <div className="booking-summary-section">

          <div className="booking-summary">

            {/* Car image */}
            <div className="booking-car-image">

              {car.images && car.images.length > 0 ? (
                <img
                  src={getImageUrl(car.images[0].image)}
                  alt={car.name}
                />
              ) : (
                <div className="no-booking-image">
                  No Image Available
                </div>
              )}

            </div>

            {/* Car information */}
            <div className="booking-car-info">

              <span>{car.brand}</span>

              <h2>{car.name}</h2>

              <p>Model: {car.model}</p>

              <p>{car.location}</p>

            </div>

            {/* Price */}
            <div className="booking-price">

              <strong>
                ₹{car.price_per_hour}
              </strong>

              <span>/ hour</span>

            </div>

            <div className="summary-divider"></div>

            {/* Booking summary */}
            <div className="summary-details">

              <div className="summary-item">
                <span>Pickup</span>

                <strong>
                  {startDate && startTime
                    ? `${startDate} ${startTime}`
                    : "Not selected"}
                </strong>
              </div>

              <div className="summary-item">
                <span>Return</span>

                <strong>
                  {endDate && endTime
                    ? `${endDate} ${endTime}`
                    : "Not selected"}
                </strong>
              </div>

              <div className="summary-item">
                <span>Duration</span>

                <strong>
                  {duration > 0
                    ? `${duration} hour${duration !== 1 ? "s" : ""}`
                    : "--"}
                </strong>
              </div>

            </div>

            <div className="summary-divider"></div>

            {/* Total */}
            <div className="total-section">

              <span>Total Amount</span>

              <strong>
                ₹{totalAmount.toFixed(2)}
              </strong>

            </div>

            {/* Confirm */}
            <button
              className="confirm-booking-button"
              onClick={handleBooking}
              disabled={
                bookingLoading ||
                !car.is_available
              }
            >
              {bookingLoading
                ? "Confirming..."
                : "Confirm Booking"}
            </button>

            {/* Cancel */}
            <button
              className="cancel-booking-button"
              onClick={() =>
                navigate(`/cars/${car.id}`)
              }
            >
              Cancel
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Booking;