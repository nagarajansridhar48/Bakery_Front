import React from "react";
import img from "../../assets/home/categories/sweets.png";
import img1 from "../../assets/home/categories/savory.png";
import img2 from "../../assets/home/categories/cakesn'pastries.png"

const categoryItems = [
  {
    id: 1,
    title: "Signature Sweets",
    description1: "(Indian & Fusion Delights)",
    description2: "45+ dishes",
    image: img,
  },
  {
    id: 2,
    title: "Savory Bites",
    description1: "(Crispy, Spicy & Flavorful Snacks)",
    description2: "50+ dishes",
    image: img1,
  },
  {
    id: 3,
    title: "Cakes & Pastries",
    description1: "(Custom-made for all occasions)",
    description2: "100+ dishes",
    image: img2,
  },
  {
    id: 4,
    title: "Browse All",
    description1: "(Explore sweet & savory delights)",
    description2: "250+ dishes",
    image: img,
  },
];

const Catagories = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-10 lg:grid-cols-2 xl:grid-cols-4 xl:gap-20 gap-8 justify-items-center mt-12 w-full px-6">
      {categoryItems.map((item) => (
        <div
          key={item.id}
          className="shadow-lg rounded-3xl bg-white py-6 px-5 w-full sm:w-70 lg:w-80 xl:w-70 text-center cursor-pointer hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"
          data-aos="flip-left"
          data-aos-duration="2000"
        >
          <div className="flex w-full justify-center">
            <img
              src={item.image}
              alt={item.title}
              className="bg-peach p-5 rounded-full h-40 w-40 object-contain"
            />
          </div>
          <div className="mt-5 space-y-1">
            <h1 className="text-choco text-lg sm:text-xl font-bold">{item.title}</h1>
            <p className="text-caramel font-medium text-sm sm:text-base">{item.description1}</p>
            <p className="text-gray-500 font-medium text-xs sm:text-sm">{item.description2}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Catagories;