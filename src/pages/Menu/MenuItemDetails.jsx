import React, { useEffect, useState, useContext } from "react";
import { Howl } from "howler";
import { useParams } from "react-router";
import axios from "axios";
import Nav from "../../Nav";
import Footer from "../../Footer";
import { CartContext } from "../../contexts/CartContext";
import { FaHeart, FaStar } from "react-icons/fa";
import heartSoundFile from "../../assets/home/bubblepop.mp3";


const MenuItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [isHeartFill, setHeartFill] = useState(false);

  const userId = localStorage.getItem("id");

  const sound = new Howl({ src: [heartSoundFile] });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (!item) return;
    const checkWishlist = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/wishlist/${userId}`);
        const wishlistItems = res.data || [];
        const alreadyLiked = wishlistItems.some((i) => i.itemId === item._id);
        setHeartFill(alreadyLiked);
      } catch (err) {
        console.error("Error checking wishlist:", err);
      }
    };
    checkWishlist();
  }, [item, userId]);


  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const handleHeart = async (itemId) => {
  const newState = !isHeartFill;
  setHeartFill(newState);

  if (newState) {
    // like → add to wishlist
    try {
      await axios.post("http://localhost:5050/wishlist/add", {
        userid: userId,
        item,
      });
      sound.play();
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  } else {
    // unlike → remove from wishlist
    try {
      await axios.delete(`http://localhost:5050/wishlist/remove/${userId}/${itemId}`, {
        data: { userId, itemId: item._id },
      });
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  }
};


  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/display`);
        const items = res.data.data || [];
        const foundItem = items.find((i) => i._id === id);
        setItem(foundItem);
        // setItem(res.data); // assuming backend sends single item object
      } catch (err) {
        console.error("Error fetching item details:", err);
      }
    };
    fetchItem();
  }, [id]);

  if (!item) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="bg-cream py-20 px-10 lg:mt-18">
        <section className="relative flex flex-col md:flex-row gap-10 bg-cream">
          <div
            className={`rating gap-1 absolute left-97 top-0 p-4 heartStar bg-choco cursor-pointer`}
            onClick={() => handleHeart(item._id)}
          >
            <FaHeart
              className={`h-5 w-5 transition-transform duration-300 ${
                isHeartFill ? "text-rose-500 scale-125" : "text-white"
              }`}
            />
          </div>

          {/* Image */}
          <div className="flex justify-center items-center mx-10">
            <div className="bg-gradient-to-r from-choco to-caramel rounded-3xl py-6 px-10">
              <img
                src={`http://localhost:5050/files/${item.image}`}
                alt={item.recipe}
                className="w-80 h-80 object-contain"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-3 mt-10 mx-10">
            <h1 className="text-3xl font-bold text-choco mb-4">
              {item.recipe}
            </h1>
            <p className="text-dark text-lg leading-relaxed">
              {item.description}
            </p>

            <div className="flex-row items-center text-[16px] font-semibold">
              <div className="text-caramel font-semibold border-2 rounded-2xl px-2 w-15 mb-6 flex items-center gap-1">
                <FaStar className="text-amber-400" /> {item.ratings}
              </div>
              <div className="text-pink-500 text-[20px]">
                ₹ {item.price} /-{" "}
                <span className="text-[16px] ml-3">
                  (Inclusive of all taxes)
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col md:flex-row gap-10 mt-20 ml-10 bg-cream">
          <div className="bg-mint rounded-3xl min-w-80 h-auto">
            <h1 className="text-[18px] text-dark text-center font-bold bg-cream rounded-3xl py-2 m-4">
              INGREDIENTS USED
            </h1>
            <div className="p-4">
              <ol>
                {item?.ingredients
                  ?.split(",") // convert string → array
                  ?.map((ingre, index) => (
                    <li key={index}>{index+1}. {ingre}</li>
                  ))
                }
              </ol>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MenuItemDetail;
