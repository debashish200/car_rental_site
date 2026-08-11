import { useEffect, useState } from "react";
import API from "../services/api";
import CarCard from "../components/CarCard";

function Cars() {

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        API.get("cars/")
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);

    if (loading) {
        return <h2>Loading cars...</h2>;
    }

    return (
        <div>

            <h1>Available Cars</h1>

            <div className="car-grid">

                {cars.map(car => (
                    <CarCard
                        key={car.id}
                        car={car}
                    />
                ))}

            </div>

        </div>
    );
}

export default Cars;