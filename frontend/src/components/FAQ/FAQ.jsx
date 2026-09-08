import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./FAQ.css";

const faqData = [
  {
    question: "What documents are required to rent a car?",
    answer:
      "You need a valid Driving License, Aadhaar Card or Passport, and a government-issued ID proof."
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes. You can cancel your booking before the pickup time. Cancellation charges may apply depending on the policy."
  },
  {
    question: "Is there any security deposit?",
    answer:
      "Yes. A refundable security deposit is required before the vehicle is handed over."
  },
  {
    question: "Can someone else drive the rented car?",
    answer:
      "Yes, but the additional driver must also provide a valid driving license and be registered during booking."
  },
  {
    question: "Are your cars insured?",
    answer:
      "Yes. Every vehicle on our platform is fully insured and regularly inspected for safety."
  }
];

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className="faq-section">

      <div className="faq-heading">

        <span>Frequently Asked Questions</span>

        <h2>Have Questions? We've Got Answers.</h2>

        <p>
          Find answers to the most common questions about
          renting a vehicle through our platform.
        </p>

      </div>

      <div className="faq-container">

        {faqData.map((faq, index) => (

          <div
            className={`faq-item ${
              activeIndex === index ? "active" : ""
            }`}
            key={index}
          >

            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >

              <span>{faq.question}</span>

              {activeIndex === index ? (
                <FaMinus />
              ) : (
                <FaPlus />
              )}

            </button>

            <div
              className={`faq-answer ${
                activeIndex === index ? "show" : ""
              }`}
            >
              <p>{faq.answer}</p>
            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default FAQ;