import "./Testimonials.css";

import {
    FaStar,
    FaQuoteLeft
} from "react-icons/fa";

const testimonials = [

    {
        id:1,
        name:"Rahul Sharma",
        role:"Software Engineer",
        image:"https://i.pravatar.cc/150?img=11",
        review:"The booking process was incredibly smooth. The car was clean, comfortable and exactly as shown. Highly recommended!"
    },

    {
        id:2,
        name:"Priya Das",
        role:"Marketing Executive",
        image:"https://i.pravatar.cc/150?img=32",
        review:"Affordable pricing and excellent customer support. Booking took less than two minutes."
    },

    {
        id:3,
        name:"Aman Verma",
        role:"Business Owner",
        image:"https://i.pravatar.cc/150?img=15",
        review:"Fantastic experience! Professional service and well-maintained vehicles. Will definitely use again."
    }

];

function Testimonials(){

    return(

        <section className="testimonial-section">

            <div className="testimonial-title">

                <span>Testimonials</span>

                <h2>
                    What Our Customers Say
                </h2>

                <p>
                    Thousands of customers trust our platform
                    for safe and affordable car rentals.
                </p>

            </div>

            <div className="testimonial-grid">

                {

                    testimonials.map((item)=>(

                        <div
                            className="testimonial-card"
                            key={item.id}
                        >

                            <FaQuoteLeft className="quote"/>

                            <div className="stars">

                                <FaStar/>
                                <FaStar/>
                                <FaStar/>
                                <FaStar/>
                                <FaStar/>

                            </div>

                            <p className="review">

                                "{item.review}"

                            </p>

                            <div className="customer">

                                <img
                                    src={item.image}
                                    alt={item.name}
                                />

                                <div>

                                    <h3>{item.name}</h3>

                                    <span>{item.role}</span>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

        </section>

    )

}

export default Testimonials;