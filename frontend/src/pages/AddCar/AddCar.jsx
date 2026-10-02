import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCar, uploadCarImages } from "../../services/carService";
import "./AddCar.css";

function AddCar() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        model: "",
        price_per_hour: "",
        fuel_type: "",
        transmission: "",
        seats: "",
        location: "",
        is_available: true,
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        setSelectedImages(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!formData.name.trim()) {
            setError("Car name is required.");
            return;
        }

        if (!formData.brand.trim()) {
            setError("Brand is required.");
            return;
        }

        if (!formData.model.trim()) {
            setError("Model is required.");
            return;
        }

        if (!formData.price_per_hour || Number(formData.price_per_hour) <= 0) {
            setError("Please enter a valid price per hour.");
            return;
        }

        if (!formData.fuel_type.trim()) {
            setError("Fuel type is required.");
            return;
        }

        if (!formData.transmission.trim()) {
            setError("Transmission is required.");
            return;
        }

        if (!formData.seats || Number(formData.seats) <= 0) {
            setError("Please enter a valid number of seats.");
            return;
        }

        if (!formData.location.trim()) {
            setError("Location is required.");
            return;
        }

        try {
            setLoading(true);

            const carData = {
                name: formData.name.trim(),
                brand: formData.brand.trim(),
                model: formData.model.trim(),
                price_per_hour: Number(formData.price_per_hour),
                fuel_type: formData.fuel_type.trim(),
                transmission: formData.transmission.trim(),
                seats: Number(formData.seats),
                location: formData.location.trim(),
                is_available: formData.is_available,
            };

            //   const response = await createCar(carData);

            //   console.log("Car created:", response.data);

            //   setSuccess("Car added successfully!");

            const response = await createCar(carData);

            console.log("Car created:", response.data);

            const carId = response.data.id;

            if (selectedImages.length > 0) {
                const imageData = new FormData();

                selectedImages.forEach((image) => {
                    imageData.append("images", image);
                });

                await uploadCarImages(carId, imageData);

                console.log("Car images uploaded successfully");
            }

            setSuccess("Car and images added successfully!");

            setTimeout(() => {
                navigate("/my-cars");
            }, 1500);
        } catch (error) {
            console.error("Error creating car:", error);

            if (error.response?.data) {
                const backendError = error.response.data;

                if (typeof backendError === "string") {
                    setError(backendError);
                } else {
                    const firstError = Object.values(backendError)[0];

                    if (Array.isArray(firstError)) {
                        setError(firstError[0]);
                    } else {
                        setError("Unable to add the car.");
                    }
                }
            } else {
                setError("Unable to add the car. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-car-page">
            <div className="add-car-container">

                <div className="add-car-header">
                    <div>
                        <h1>Add New Car</h1>
                        <p>Add a car to your rental fleet</p>
                    </div>

                    <button
                        type="button"
                        className="back-button"
                        onClick={() => navigate("/my-cars")}
                    >
                        ← Back to My Cars
                    </button>
                </div>

                <form className="add-car-form" onSubmit={handleSubmit}>

                    {error && (
                        <div className="form-error">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="form-success">
                            {success}
                        </div>
                    )}

                    <div className="form-row">

                        <div className="form-group">
                            <label>Car Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Example: Swift"
                            />
                        </div>

                        <div className="form-group">
                            <label>Brand</label>
                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                placeholder="Example: Maruti"
                            />
                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group">
                            <label>Model</label>
                            <input
                                type="text"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                placeholder="Example: 2024"
                            />
                        </div>

                        <div className="form-group">
                            <label>Price Per Hour (₹)</label>
                            <input
                                type="number"
                                name="price_per_hour"
                                value={formData.price_per_hour}
                                onChange={handleChange}
                                placeholder="Example: 300"
                                min="1"
                            />
                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group">
                            <label>Fuel Type</label>
                            <select
                                name="fuel_type"
                                value={formData.fuel_type}
                                onChange={handleChange}
                            >
                                <option value="">Select fuel type</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electric">Electric</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Transmission</label>
                            <select
                                name="transmission"
                                value={formData.transmission}
                                onChange={handleChange}
                            >
                                <option value="">Select transmission</option>
                                <option value="Manual">Manual</option>
                                <option value="Automatic">Automatic</option>
                            </select>
                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group">
                            <label>Number of Seats</label>
                            <input
                                type="number"
                                name="seats"
                                value={formData.seats}
                                onChange={handleChange}
                                placeholder="Example: 5"
                                min="1"
                            />
                        </div>

                        <div className="form-group">
                            <label>Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Example: Bangalore"
                            />
                        </div>

                    </div>

                    <div className="form-group image-upload-group">
                        <label>Car Images</label>

                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />

                        <small>
                            You can select multiple images of the car.
                        </small>

                        {selectedImages.length > 0 && (
                            <div className="selected-images">
                                {selectedImages.map((image, index) => (
                                    <div className="selected-image-item" key={index}>
                                        <span>{image.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="availability-group">
                        <label className="availability-label">
                            <input
                                type="checkbox"
                                name="is_available"
                                checked={formData.is_available}
                                onChange={handleChange}
                            />
                            Car is currently available for booking
                        </label>
                    </div>

                    <div className="form-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => navigate("/my-cars")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? "Adding Car..." : "Add Car"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}

export default AddCar;
