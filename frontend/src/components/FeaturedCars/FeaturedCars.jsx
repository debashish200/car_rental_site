import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import CarCard from "../CarCard/CarCard";
import "./FeaturedCars.css";

function FeaturedCars() {

    const [cars, setCars] = useState([]);

    useEffect(() => {
        getCars();
    }, []);

    async function getCars() {

        try {

            const response = await API.get("cars/");

            setCars(response.data.slice(0, 6));

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <section className="featured-section">

            <div className="featured-header">

                <h2>Featured Cars</h2>

                <p>
                    Discover our most popular rental cars,
                    carefully selected for comfort,
                    safety and affordability.
                </p>

                <Link className="view-btn" to="/cars">
                    View All Cars →
                </Link>

            </div>

            <div className="featured-grid">

                {cars.map((car) => (

                    <CarCard
                        key={car.id}
                        car={car}
                    />

                ))}

            </div>

        </section>

    );

}

export default FeaturedCars;