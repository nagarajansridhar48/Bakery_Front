import React, { useContext, useEffect, useState } from "react";
import logo from "./assets/home/img/Group 29.png";
import { CgChevronUp } from "react-icons/cg";
import { BiChevronDown, BiMenu, BiX } from "react-icons/bi";
import { Link, useNavigate } from "react-router";
import { FaHeart, FaRegUser, FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "./contexts/AuthContext";
import Profile from "./Profile";
import { FiSearch } from "react-icons/fi";
import { CartContext } from "./contexts/CartContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Nav = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:5050/display");
      setMenuItems(res.data.data || []);
    } catch (err) {
      console.error("Error fetching menu:", err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length > 0) {
      const filtered = menuItems.filter((item) =>
        item.recipe.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6)); // show max 6
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const foundItem = menuItems.find((item) =>
      item.recipe.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (foundItem) {
      navigate(`/menu/${foundItem._id}`); // Navigate to item page
    } else {
      // navigate("/menu"); // fallback
      toast.info("Item not found!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      })
    }
    setSearchQuery(""); // clear input
    setSuggestions([]);
  };

  const handleSelect = (item) => {
    navigate(`/menu/${item._id}`);
    setSearchQuery("");
    setSuggestions([]);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const token = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);
  console.log(user);

  const { cart } = useContext(CartContext);

  return (
    <div>
      <ToastContainer/>
      <header className="bg-choco text-cream flex items-center justify-between w-full px-6 py-3 fixed top-0 z-50">
        {/* Logo */}
        <Link to="/">
          <img src={logo} className="w-32 md:w-40" alt="Sweet Heart Logo" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8">
            <li className={isActive("/") ? "text-caramel font-bold" : "hover:drop-shadow-[0_0_3px_#FFF3E2]"}>
              <Link to="/">Home</Link>
            </li>

            {/* Menu Dropdown */}
            <li className="relative cursor-pointer">
              <button
                onClick={() => toggleDropdown("menu")}
                // className="flex items-center gap-1 hover:drop-shadow-[0_0_3px_#FFF3E2]"
                className={isActive("/menu") ? "text-caramel font-bold flex items-center gap-1" : "flex items-center gap-1 hover:drop-shadow-[0_0_3px_#FFF3E2]"}
              >
                Menu
                {activeDropdown === "menu" ? (
                  <CgChevronUp size={16} />
                ) : (
                  <BiChevronDown size={16} />
                )}
              </button>
              {activeDropdown === "menu" && (
                <ul className="absolute left-0 mt-2 w-40 rounded-lg bg-cream text-dark shadow-lg">
                  <li className="px-4 py-2 hover:bg-peach rounded-t-lg">
                    <Link to="/menu">All</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-peach">
                    <Link to="/menu/signature-sweets">Signature Sweets</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-peach">
                    <Link to="/menu/savory-bites">Savory Bites</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-peach rounded-b-lg">
                    <Link to="/menu/cakes-pastries">Cakes & Pastries</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="hover:drop-shadow-[0_0_3px_#FFF3E2]"><Link to="/aboutus">About us</Link></li>

          </ul>
        </nav>

        {/* Right Side */}
        {token ? (
          <div>
            <div className="hidden md:flex items-center gap-6">
              {/* Search Icon */}
              <form
                onSubmit={handleSearch}
                className="flex items-center bg-white rounded-3xl px-3 py-1"
              >
                <input
                  type="text"
                  value={searchQuery}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                  onChange={handleChange}
                  placeholder="Search..."
                  className="outline-none px-2 text-choco w-36"
                />
                <button type="submit" className="text-choco hover:text-peach">
                  <FiSearch size={20} />
                </button>
              </form>

              {suggestions.length > 0 && (
                <ul className="absolute top-15 right-19 bg-white text-choco rounded-lg shadow-md w-60 max-h-64 overflow-y-auto z-50">
                  {suggestions.map((item) => (
                    <li
                      key={item._id}
                      onClick={() => handleSelect(item)}
                      className="px-4 py-2 hover:bg-peach cursor-pointer"
                    >
                      {item.recipe}
                    </li>
                  ))}
                </ul>
              )}

              {/* Cart Icon */}
              <button className="hover:text-peach relative">
                {/* <Link to="/cart" className="hover:text-peach relative"> */}
                  <FaShoppingCart size={22} />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-peach text-choco text-xs font-bold rounded-full px-1">
                      {cart.length}
                    </span>
                  )}
                {/* </Link> */}
              </button>
              <button className="hover:text-peach relative">
                <Link to="/wishlist" className="hover:text-peach relative">
                  <FaHeart size={22} />
                </Link>
              </button>
              <Profile user={user} />
            </div>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-6">
            <button className="hover:text-peach">
              <FiSearch size={22} />
            </button>

            {/* Cart Icon */}
            <button className="hover:text-peach relative">
              <FaShoppingCart size={22} />
              {/* Example badge */}
              <span className="absolute -top-2 -right-2 bg-peach text-choco text-xs font-bold rounded-full px-1">
                2
              </span>
            </button>
            <Link
              to="/login"
              className="border-cream bg-cream text-choco px-4 py-2 inline-flex rounded-3xl hover:scale-95 transition"
            >
              <FaRegUser className="mt-1 mr-2" /> Login
            </Link>
          </div>
        )}

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <BiX size={28} /> : <BiMenu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-choco text-cream flex flex-col px-6 py-4 gap-4 relative">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white rounded-3xl px-3 py-1"
          >
            <input
              type="text"
              value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              onChange={handleChange}
              placeholder="Search..."
              className="outline-none px-2 text-choco w-full"
            />
            <button type="submit" className="text-choco hover:text-peach">
              <FiSearch size={20} />
            </button>
          </form>
          {suggestions.length > 0 && (
            <ul className="absolute top-12 left-0 bg-white text-choco rounded-lg shadow-md w-60 max-h-64 overflow-y-auto z-50">
              {suggestions.map((item) => (
                <li
                  key={item._id}
                  onClick={() => handleSelect(item)}
                  className="px-4 py-2 hover:bg-peach cursor-pointer"
                >
                  {item.recipe}
                </li>
              ))}
            </ul>
          )}
          <Link to="/" className={isActive("/") ? "text-caramel font-bold" : "hover:text-peach"}>
            Home
          </Link>
          <button
            onClick={() => toggleDropdown("menu")}
            className="flex items-center gap-1"
          >
            Menu
            {activeDropdown === "menu" ? <CgChevronUp /> : <BiChevronDown />}
          </button>
          {activeDropdown === "menu" && (
            <ul className="ml-4 space-y-2">
              <li>
                <Link to="/menu" className={isActive("/menu") ? "text-caramel font-bold" : "hover:text-peach"}>All</Link>
              </li>
              <li>
                <Link to="/signature-sweets">Signature Sweets</Link>
              </li>
              <li>
                <Link to="/menu/savory-bites">Savory Bites</Link>
              </li>
              <li>
                <Link to="/menu/cakes-pastries">Cakes & Pastries</Link>
              </li>
            </ul>
          )}
          
          <Link to="/aboutus" className="hover:text-peach">
            About us
          </Link>


          {token ? (
      <div className="flex items-center gap-4 mt-2">
        {/* <Link to="/cart" className="relative hover:text-peach"> */}
          <FaShoppingCart size={22} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-peach text-choco text-xs font-bold rounded-full px-1">
              {cart.length}
            </span>
          )}
        {/* </Link> */}
        <button className="hover:text-peach relative">
                <Link to="/wishlist" className="hover:text-peach relative">
                  <FaHeart size={22} />
                  {/* {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-peach text-choco text-xs font-bold rounded-full px-1">
                      {cart.length}
                    </span>
                  )} */}
                </Link>
              </button>
        <Profile user={user} />
      </div>
    ) : (
      <Link
        to="/login"
        className="border-cream bg-cream text-choco px-4 py-2 inline-flex rounded-3xl hover:scale-95 transition"
      >
        <FaRegUser className="mt-1 mr-2" /> Login
      </Link>
    )}
  </div>
      )}
    </div>
  );
};

export default Nav;
