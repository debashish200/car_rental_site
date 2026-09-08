import "./HowItWorks.css";

import {
    FaSearch,
    FaCarSide,
    FaCalendarCheck,
    FaSmileBeam
} from "react-icons/fa";

const steps = [

    {
        number: "01",
        icon: <FaSearch />,
        title: "Search Cars",
        description:
            "Browse hundreds of vehicles and quickly find the perfect car for your trip."
    },

    {
        number: "02",
        icon: <FaCarSide />,
        title: "Choose Your Car",
        description:
            "Compare cars, pricing, features and availability before making your choice."
    },

    {
        number: "03",
        icon: <FaCalendarCheck />,
        title: "Book Online",
        description:
            "Select pickup and return dates and confirm your booking within seconds."
    },

    {
        number: "04",
        icon: <FaSmileBeam />,
        title: "Enjoy Your Ride",
        description:
            "Pick up your vehicle and enjoy a comfortable, safe and memorable journey."
    }

];

function HowItWorks() {

    return (

        <section className="how-section">

            <div className="section-title">

                <span>How It Works</span>

                <h2>
                    Rent a Car in 4 Easy Steps
                </h2>

                <p>
                    Renting a car has never been easier.
                    Follow these simple steps and hit the road in minutes.
                </p>

            </div>

            <div className="steps-container">

                {steps.map((step, index) => (

                    <div className="step-card" key={index}>

                        <div className="step-number">

                            {step.number}

                        </div>

                        <div className="step-icon">

                            {step.icon}

                        </div>

                        <h3>{step.title}</h3>

                        <p>{step.description}</p>

                    </div>

                ))}

            </div>

        </section>

    );

}

export default HowItWorks;