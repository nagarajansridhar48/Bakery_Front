import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import sweetgirl from "../../assets/home/img/heroimage.png";
import Catagories from "./Catagories";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SpecialDishesCards from "./SpecialDishesCards";
import Nav from "../../Nav";
import Footer from "../../Footer";
import { FaAngleLeft, FaAngleRight, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  // const [slider,setSlider] = useState(null);
  const slider = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true, // whether animation should happen only once
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5050/display")
      .then((res) => res.json())
      .then((resData) => {
        const items = resData.data || [];
        const topRated = [...items]
          .sort((a, b) => b.ratings - a.ratings)
          .slice(0, 8);
        setRecipes(topRated);
      })
      .catch((err) => console.error("Error fetching specials:", err));
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="overflow-x-hidden">
      <Nav />

      {/* HERO */}
      <section className="relative bg-linear-to-br from-cream to-caramel flex flex-col lg:flex-row justify-between items-center px-6 pt-24 md:px-12 lg:px-20 pb-16 lg:py-28 lg:mt-18">
        {/* Background floating sweets (hidden on small screens for better UX) */}
        <div className="hidden lg:block"></div>

        {/* Text */}
        <div
          className="flex flex-col gap-6 max-w-xl text-center items-start sm:items-center sm:justify-center lg:text-left lg:items-start xl:items-start"
          data-aos="fade-right"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-dark">
            Dive into the Magic of{" "}
            <span className="text-caramel">Sweetness & Savouries</span>
          </h1>
          <p className="text-base md:text-xl text-dark">
            Where every bite is a celebration of love, taste, and tradition.
          </p>
          <Link
            to="/menu"
            className="border-caramel bg-caramel text-white px-6 py-2 rounded-3xl hover:scale-95 hover:shadow-choco transition-transform"
          >
            Order Now
          </Link>
        </div>

        {/* Hero image */}
        <div
          className="rounded-full w-80 h-80 sm:w-96 sm:h-96 lg:h-80 lg:w-80 xl:m-auto bg-caramel flex items-center justify-center mt-10 lg:mt-20"
          data-aos="zoom-in"
        >
          <div className="rounded-full w-64 h-64 sm:w-80 sm:h-80 lg:h-72 lg:w-72 bg-choco shadow-xl shadow-choco flex items-center justify-center">
            <img
              src={sweetgirl}
              alt="Sweet Girl"
              className="w-full h-97 lg:h-80 object-contain rounded-full"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-beige px-6 md:px-12 lg:px-20 py-16">
        <div className="text-center">
          <p className="text-lg md:text-xl font-medium text-choco mb-5">
            CUSTOMER FAVOURITES
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-dark">
            Popular Categories
          </h1>
          <Catagories />
        </div>
      </section>

      {/* SPECIAL DISHES */}
      <section className="bg-cream px-6 md:px-12 lg:px-20 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
          <div
            className="sm:flex sm:flex-col sm:text-center md:text-left"
            data-aos="fade-right"
          >
            <p className="text-lg md:text-xl font-medium text-choco mb-3">
              SPECIAL DISHES
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-dark">
              Standout Sweets & Savories <br className="hidden md:block" /> from
              Our Menu
            </h1>
          </div>
          <div className="flex gap-4" data-aos="fade-left">
            <button
              onClick={() => slider?.current?.slickPrev()}
              className="border-4 border-choco p-2 rounded-full hover:shadow-choco"
            >
              <FaAngleLeft className="w-6 h-6 text-choco" />
            </button>
            <button
              onClick={() => slider?.current?.slickNext()}
              className="border-4 border-choco bg-choco p-2 rounded-full hover:shadow-choco"
            >
              <FaAngleRight className="w-6 h-6 text-cream" />
            </button>
          </div>
        </div>
        <Slider ref={slider} {...settings} className="mt-10">
          {recipes.map((item, index) => (
            <SpecialDishesCards key={index} item={item} />
          ))}
        </Slider>
        <div className="mt-4 ml-110 md:ml-136 lg:ml-300">
          <Link
            to="/menu"
            className="border-caramel bg-caramel text-white px-6 py-2 rounded-3xl hover:scale-95 hover:shadow-choco transition-transform"
          >
            View more
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
