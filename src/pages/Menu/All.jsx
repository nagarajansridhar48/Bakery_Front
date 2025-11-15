import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Nav from "../../Nav";
import Footer from "../../Footer";
import SpecialDishesCards from "../Home/SpecialDishesCards";
import { FaFilter } from "react-icons/fa";
import axios from "axios";

const categories = [
  { name: "all", label: "All", path: "/menu" },
  { name: "Signature Sweets", label: "Sweets", path: "/menu/signature-sweets" },
  { name: "Savory Bites", label: "Savories", path: "/menu/savory-bites" },
  {
    name: "Cakes & Pastries",
    label: "Cakes & Pastries",
    path: "/menu/cakes-pastries",
  },
];

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const location = useLocation();
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5050/display");
      const data = res.data.data || [];
      setMenu(data);
      setFilteredItems(data);
    } catch (err) {
      console.log(err);
    }
  };
  // Fetch menu items
  useEffect(() => {
    fetchData();
  }, []);
  console.log(menu, "menu");

  // Set category based on URL
  useEffect(() => {
    const category = categories.find((c) => c.path === location.pathname);
    if (category) {
      setSelectedCategory(category.name);
      filterItems(category.name);
    }
  }, [location.pathname, menu]);

  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);
    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedItems = [...filteredItems];
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.recipe.localeCompare(b.recipe));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.recipe.localeCompare(a.recipe));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        sortedItems = [...menu];
    }
    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      {/* Filter & Sort */}
      <section className="bg-beige px-4 sm:px-6 md:px-12 lg:px-20 lg:pt-26 py-10 sm:py-20 md:py-24">
        {/* Categories and Sort */}
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start mb-6">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => {
                filterItems(cat.name);
                navigate(cat.path);
              }}
              className={`px-4 py-2 rounded-2xl font-semibold transition-colors duration-200 ${
                selectedCategory === cat.name
                  ? "bg-caramel text-white"
                  : "bg-white text-choco hover:bg-caramel hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}

          {/* Sort Dropdown */}
          <div className="flex flex-col sm:flex-row gap-2 sm:ml-auto w-full sm:w-auto mt-4 sm:mt-0">
            <div className="flex items-center sm:justify-center">
              <FaFilter className="h-6 w-6 text-choco" />
            </div>
            <select
              value={sortOption}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-4 py-2 rounded-2xl border border-choco bg-caramel text-white w-full sm:w-auto"
            >
              <option value="default">Default</option>
              <option value="A-Z">Name A-Z</option>
              <option value="Z-A">Name Z-A</option>
              <option value="low-to-high">Price Low-High</option>
              <option value="high-to-low">Price High-Low</option>
            </select>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentItems.map((item) => (
            <SpecialDishesCards key={item._id} item={item} />
          ))}
        </div>
      </section>

      {/* Pagination */}
      <section className="bg-cream px-20 py-3">
        <div className="flex justify-center my-8">
          {Array.from({
            length: Math.ceil(filteredItems.length / itemsPerPage),
          }).map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => paginate(idx + 1)}
              className={`mx-2 px-3 py-1 rounded-full ${
                currentPage === idx + 1
                  ? "bg-choco text-white transition-transform hover:scale-105 hover:shadow-xl hover:shadow-choco"
                  : "bg-white text-choco transition-transform hover:scale-105 hover:shadow-xl hover:shadow-gray-500"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MenuPage;
