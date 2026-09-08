import "./WhyChooseUs.css";

const features = [
  {
    icon: "🚗",
    title: "Wide Range of Cars",
    description:
      "Choose from hatchbacks, sedans, SUVs and luxury vehicles for every journey."
  },
  {
    icon: "💰",
    title: "Affordable Pricing",
    description:
      "Transparent pricing with no hidden charges or surprise fees."
  },
  {
    icon: "🛡️",
    title: "Safe & Verified Cars",
    description:
      "Every vehicle is regularly serviced and thoroughly inspected."
  },
  {
    icon: "⚡",
    title: "Instant Booking",
    description:
      "Book your favorite car within minutes through our easy platform."
  },
  {
    icon: "🕒",
    title: "24×7 Customer Support",
    description:
      "Our dedicated support team is available whenever you need assistance."
  },
  {
    icon: "⭐",
    title: "Trusted by Thousands",
    description:
      "Join hundreds of satisfied customers who choose us every day."
  }
];

function WhyChooseUs() {
  return (
    <section className="why-section">

      <div className="why-heading">

        <h2>Why Choose Us</h2>

        <p>
          Experience premium car rentals with unmatched quality,
          safety and convenience.
        </p>

      </div>

      <div className="why-grid">

        {features.map((item, index) => (

          <div className="feature-card" key={index}>

            <div className="feature-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.description}</p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default WhyChooseUs;