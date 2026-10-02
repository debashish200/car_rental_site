import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getCarById, updateCar, uploadCarImages,
    deleteCarImage,
} from "../../services/carService";
import "./EditCar.css";

function EditCar() {
    const { id } = useParams();
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

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageLoading, setImageLoading] = useState(false);

    // Fetch existing car
    useEffect(() => {
        const fetchCar = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getCarById(id);

                console.log("Car details:", response.data);

                const car = response.data;

                setFormData({
                    name: car.name || "",
                    brand: car.brand || "",
                    model: car.model || "",
                    price_per_hour: car.price_per_hour || "",
                    fuel_type: car.fuel_type || "",
                    transmission: car.transmission || "",
                    seats: car.seats || "",
                    location: car.location || "",
                    is_available: car.is_available ?? true,
                });
                setImages(car.images || []);
            } catch (error) {
                console.error("Error fetching car:", error);
                setError("Unable to load car details.");
            } finally {
                setLoading(false);
            }
        };

        fetchCar();
    }, [id]);

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
    const handleDeleteImage = async (imageId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this image?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setImageLoading(true);

            await deleteCarImage(imageId);

            setImages((previousImages) =>
                previousImages.filter((image) => image.id !== imageId)
            );

            setSuccess("Image deleted successfully.");
        } catch (error) {
            console.error("Error deleting image:", error);

            if (error.response?.data?.error) {
                setError(error.response.data.error);
            } else {
                setError("Unable to delete image.");
            }
        } finally {
            setImageLoading(false);
        }
    };
    const handleUploadImages = async () => {
        if (selectedImages.length === 0) {
            setError("Please select at least one image.");
            return;
        }

        try {
            setImageLoading(true);
            setError("");
            setSuccess("");

            const imageData = new FormData();

            selectedImages.forEach((image) => {
                imageData.append("images", image);
            });

            const response = await uploadCarImages(id, imageData);

            console.log("Uploaded images:", response.data);

            setImages((previousImages) => [
                ...previousImages,
                ...response.data.images,
            ]);

            setSelectedImages([]);

            setSuccess("Images uploaded successfully.");
        } catch (error) {
            console.error("Error uploading images:", error);

            if (error.response?.data?.error) {
                setError(error.response.data.error);
            } else {
                setError("Unable to upload images.");
            }
        } finally {
            setImageLoading(false);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        // Validation
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

        if (!formData.fuel_type) {
            setError("Please select a fuel type.");
            return;
        }

        if (!formData.transmission) {
            setError("Please select transmission.");
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
            setSaving(true);

            const carData = {
                name: formData.name.trim(),
                brand: formData.brand.trim(),
                model: formData.model.trim(),
                price_per_hour: Number(formData.price_per_hour),
                fuel_type: formData.fuel_type,
                transmission: formData.transmission,
                seats: Number(formData.seats),
                location: formData.location.trim(),
                is_available: formData.is_available,
            };

            const response = await updateCar(id, carData);

            console.log("Updated car:", response.data);

            setSuccess("Car updated successfully!");

            setTimeout(() => {
                navigate("/my-cars");
            }, 1500);
        } catch (error) {
            console.error("Error updating car:", error);

            if (error.response?.data) {
                const backendError = error.response.data;

                if (typeof backendError === "string") {
                    setError(backendError);
                } else {
                    const firstError = Object.values(backendError)[0];

                    if (Array.isArray(firstError)) {
                        setError(firstError[0]);
                    } else {
                        setError("Unable to update the car.");
                    }
                }
            } else {
                setError("Unable to update the car. Please try again.");
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="edit-car-page">
                <div className="edit-car-loading">
                    <p>Loading car details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="edit-car-page">
            <div className="edit-car-container">

                <div className="edit-car-header">
                    <div>
                        <h1>Edit Car</h1>
                        <p>Update your vehicle information</p>
                    </div>

                    <button
                        type="button"
                        className="back-button"
                        onClick={() => navigate("/my-cars")}
                    >
                        ← Back to My Fleet
                    </button>
                </div>

                <form className="edit-car-form" onSubmit={handleSubmit}>

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

                    <div className="edit-images-section">

                        <div className="edit-images-header">
                            <h3>Car Images</h3>
                            <p>Manage your car photos</p>
                        </div>

                        {images.length > 0 ? (
                            <div className="existing-images">
                                {images.map((image) => (
                                    <div className="existing-image-card" key={image.id}>

                                        <img
                                            src={
                                                image.image.startsWith("http")
                                                    ? image.image
                                                    : `${BACKEND_URL}${image.image}`
                                            }
                                            alt="Car"
                                        />

                                        <button
                                            type="button"
                                            className="delete-image-button"
                                            onClick={() => handleDeleteImage(image.id)}
                                            disabled={imageLoading}
                                        >
                                            Delete
                                        </button>

                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="no-images-message">
                                No images uploaded yet.
                            </p>
                        )}

                        <div className="image-upload-group">

                            <label>Add More Images</label>

                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                            />

                            <small>
                                Select one or more images to add to this car.
                            </small>

                            {selectedImages.length > 0 && (
                                <div className="selected-images">
                                    {selectedImages.map((image, index) => (
                                        <div
                                            className="selected-image-item"
                                            key={index}
                                        >
                                            {image.name}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedImages.length > 0 && (
                                <button
                                    type="button"
                                    className="upload-images-button"
                                    onClick={handleUploadImages}
                                    disabled={imageLoading}
                                >
                                    {imageLoading ? "Uploading..." : "Upload Images"}
                                </button>
                            )}

                        </div>

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
                            disabled={saving}
                        >
                            {saving ? "Updating Car..." : "Update Car"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}

export default EditCar;
