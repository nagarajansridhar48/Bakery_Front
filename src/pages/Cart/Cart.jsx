import React, { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import Nav from "../../Nav";
import Footer from "../../Footer";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

const Cart = () => {
  const { cart, addToCart, decreaseQuantity, removeFromCart } =
    useContext(CartContext);

    const navigate = useNavigate();

  // calculate grand total
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // handle remove with toast
  const handleRemove = (id, name) => {
    removeFromCart(id);
    toast.error(`${name} removed from cart`, { autoClose: 2000 });
  };

  // handle checkout with toast
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.warning("Your cart is empty!", { autoClose: 2000 });
      return;
    }
    navigate("/checkout"); // Navigate to checkout page
  };

  useEffect(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, []);

  return (
    <>
      <Nav />
      <div className="p-10 h-auto bg-cream min-h-screen lg:mt-18 md:mt-16 sm:mt-10">
        <ToastContainer position="top-right" />
        <h1 className="text-3xl md:text-5xl font-bold text-dark text-center mb-10">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-lg">No items in your cart.</p>
        ) : (
          <div>
            {/* Items in cards */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white shadow-lg rounded-xl p-4 flex flex-col justify-between"
                >
                  <img
                    src={`http://localhost:5050/files/${item.image}`}
                    alt={item.recipe}
                    className="h-40 w-full object-contain mb-4 rounded"
                  />
                  <div className="flex-1">
                    <h2 className="font-bold text-lg mb-1">{item.recipe}</h2>
                    <p className="text-gray-600">₹ {item.price} (per item)</p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => decreaseQuantity(item._id)}
                        className="px-3 py-1 bg-gray-300 rounded-lg"
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="px-3 py-1 bg-gray-300 rounded-lg"
                      >
                        +
                      </button>
                    </div>

                    {/* Per-item total */}
                    <p className="mt-2 font-medium">
                      Total: ₹ {item.price * item.quantity}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemove(item._id, item.recipe)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Grand total and checkout */}
            <div className="text-right mt-8">
              <h2 className="text-2xl font-bold mb-4">
                Grand Total: ₹ {totalPrice}
              </h2>
              <button
                onClick={handleCheckout}
                className="bg-caramel text-white px-6 py-3 rounded-2xl font-semibold hover:bg-choco transition duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;




// import React, { useContext, useEffect } from "react";
// import { CartContext } from "../../contexts/CartContext";
// import Nav from "../../Nav";
// import Footer from "../../Footer";
// import { toast, ToastContainer } from "react-toastify";
// import { useNavigate } from "react-router";
// import axios from "axios";

// const Cart = () => {
//   const { cart, addToCart, decreaseQuantity, removeFromCart } =
//     useContext(CartContext);
    
//     const userId = localStorage.getItem("id");
//     const navigate = useNavigate();

//     const fetchCart = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5050/cart/${userId}`);
//       if (res.data) {
//         // Map backend items into context format with default quantity = 1
//         res.data.forEach((item) => {
//           addToCart({ ...item, quantity: item.quantity || 1, _id: item._id });
//         });
//       }
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userId]);

//   // calculate grand total
//   const totalPrice = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );






  // handle remove with toast
  // const handleRemove = async (itemId, recipe) => {
  //   try {
  //     await axios.delete(
  //       `http://localhost:5050/cart/remove`, { data: { userId, itemId } }
  //     );
  //     removeFromCart(itemId); // update context/localStorage
  //     toast.success(`${recipe} removed from cart`, { autoClose: 2000 });
  //   } catch (err) {
  //     console.error("Error removing from cart:", err);
  //     toast.error("Error removing from cart");
  //   }
  // };







//   const handleRemove = async (itemId, recipe) => {
//   try {
//     const res = await axios.delete(`http://localhost:5050/cart/remove`, {
//       data: { userId, itemId },
//     });

//     if (res.data.success) {
//       // await fetchCart();
//       removeFromCart(itemId); // update UI immediately
//       toast.error(`${recipe} removed from cart`, { autoClose: 2000 });
//     } else {
//       toast.warning(res.data.message || "Could not remove item");
//     }
//   } catch (err) {
//     console.error("Error removing from cart:", err.response?.data || err.message);
//     toast.error("Error removing from cart", { autoClose: 2000 });
//   }
// }

//   // handle checkout with toast
//   const handleCheckout = () => {
//     if (cart.length === 0) {
//       toast.warning("Your cart is empty!", { autoClose: 2000 });
//       return;
//     }
//     navigate("/checkout"); // Navigate to checkout page
//   };

//   return (
//     <>
//       <Nav />
//       <div className="p-10 h-auto bg-cream min-h-screen lg:mt-18 md:mt-16 sm:mt-10">
//         <ToastContainer position="top-right" />
//         <h1 className="text-3xl md:text-5xl font-bold text-dark text-center mb-10">
//           Your Cart
//         </h1>

//         {cart.length === 0 ? (
//           <p className="text-center text-lg">No items in your cart.</p>
//         ) : (
//           <div>
//             {/* Items in cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
//               {cart.map((item) => (
//                 <div
//                   key={item._id}
//                   className="bg-white shadow-lg rounded-xl p-4 flex flex-col justify-between"
//                 >
//                   <img
//                     src={`http://localhost:5050/files/${item.image}`}
//                     alt={item.recipe}
//                     className="h-40 w-full object-contain mb-4 rounded"
//                   />
//                   <div className="flex-1">
//                     <h2 className="font-bold text-lg mb-1">{item.recipe}</h2>
//                     <p className="text-gray-600">₹ {item.price} (per item)</p>

//                     {/* Quantity controls */}
//                     <div className="flex items-center gap-3 mt-2">
//                       <button
//                         onClick={() => decreaseQuantity(item._id)}
//                         className="px-3 py-1 bg-gray-300 rounded-lg"
//                       >
//                         -
//                       </button>
//                       <span className="font-semibold">{item.quantity}</span>
//                       <button
//                         onClick={() => addToCart(item)}
//                         className="px-3 py-1 bg-gray-300 rounded-lg"
//                       >
//                         +
//                       </button>
//                     </div>

//                     {/* Per-item total */}
//                     <p className="mt-2 font-medium">
//                       Total: ₹ {item.price * item.quantity}
//                     </p>
//                   </div>

//                   <button
//                     onClick={() => handleRemove(item._id, item.recipe)}
//                     className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* Grand total and checkout */}
//             <div className="text-right mt-8">
//               <h2 className="text-2xl font-bold mb-4">
//                 Grand Total: ₹ {totalPrice}
//               </h2>
//               <button
//                 onClick={handleCheckout}
//                 className="bg-caramel text-white px-6 py-3 rounded-2xl font-semibold hover:bg-choco transition duration-300"
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Cart;
