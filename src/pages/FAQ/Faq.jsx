import React, { useEffect, useState } from "react";
import Nav from "../../Nav";
import Footer from "../../Footer";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

// const Faq = () => {
//     useEffect(() => {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     }, []);

//     return (
//       <>
//         <Nav />
//         <div className="bg-cream lg:mt-18 lg:px-20 lg:py-10 md:mt-18 md:py-10 md:px-20 sm:mt-16">
//             <h1 className="text-2xl md:text-4xl text-center font-bold text-dark mb-6 leading-snug">Frequently Asked Questions</h1>
//             <div>cc</div>
//         </div>
//       </>
//   )
// }

// export default Faq

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="faq-item border-b py-3">
      <button
        className="flex justify-between items-center w-full text-dark text-left font-semibold"
        onClick={() => setOpen(!open)}
      >
        {question}
        <span className="rounded-full bg-choco text-cream text-[18px]">{open ? <MdArrowDropUp/> : <MdArrowDropDown />}</span>
      </button>
      {open && <p className="mt-2 text-choco">{answer}</p>}
    </div>
  );
};

const Faq = () => {
  const faqs = [
    {
      question: "What is Sweet Heart?",
      answer: "Sweet Heart is a dessert and bakery brand offering cakes, pastries, and handmade sweets and savouries crafted with love.",
    },
    {
      question: "Do you take custom cake orders?",
      answer: "Yes! We accept custom cake and pastry orders for birthdays, weddings, and special occasions.",
    },
    {
      question: "What are your delivery options?",
      answer: "We offer same-day delivery within the city and standard delivery for nearby locations.",
    },
    {
      question: "Do you provide eggless or vegan options?",
      answer: "Absolutely! Sweet Heart offers eggless and vegan alternatives for most of our cakes and desserts.",
    },
    {
      question: "Can I place an order online?",
      answer: "Yes, you can order through our website or mobile app and get your treats delivered at your doorstep.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards, UPI, net banking, and cash on delivery.",
    },
    {
      question: "Do you offer bulk or corporate orders?",
      answer: "Yes, we handle bulk orders for parties, events, and corporate gifting with attractive discounts.",
    },
    {
      question: "What is your return policy?",
      answer: "You can return items within 2 hours of purchase.",
    },
    {
      question: "Do you offer international shipping?",
      answer: "No, we ship only in Chennai with no additional charges.",
    },
    {
      question: "How can I track my order?",
      answer: "Once shipped, you’ll receive a tracking ID via email.",
    },
  ];

  return (
    <>
      <Nav />
      <div className="bg-cream lg:mt-18 lg:px-20 lg:py-10 md:mt-18 md:py-10 md:px-20 sm:mt-16">
        <h1 className="text-2xl md:text-4xl text-center font-bold text-dark mb-10 leading-snug">
          Frequently Asked Questions
        </h1>
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Faq;
