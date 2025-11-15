// import React, { useContext, useState } from "react";
// import { CartContext } from "../../contexts/CartContext";
// import { useNavigate } from "react-router";
// import Nav from "../../Nav";
// import Footer from "../../Footer";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";

// const Checkout = () => {
//   const { cart, clearCart } = useContext(CartContext);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     doorNo: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("cod"); //Cash On Delivery

//   const totalPrice = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePlaceOrder = async () => {
//   if (
//     !formData.name ||
//     !formData.mobile ||
//     !formData.doorNo ||
//     !formData.address ||
//     !formData.city ||
//     !formData.state ||
//     !formData.pincode
//   ) {
//     toast.error("Please fill in all receiving details", { autoClose: 2000 });
//     return;
//   }

//   const orderData = {
//     userId: localStorage.getItem("userId") || "12345", // ✅ use logged in user
//     items: cart,
//     deliveryDetails: {
//       receiverName: formData.name,
//       mobile: formData.mobile,
//       address: formData.address,
//       city: formData.city,
//       state: formData.state,
//       pincode: formData.pincode,
//       doorNo: formData.doorNo
//     },
//     paymentMethod,
//     totalPrice,
//   };

//   try {
//   const token = localStorage.getItem("token");
//   const res = await axios.post("http://localhost:5050/orders", orderData, {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
//   });

//   if (res.data && res.data.success) {
//     toast.success("Order placed successfully!", { autoClose: 3000 });
//     clearCart();
//     setTimeout(() => {
//     navigate("/orders");
//   }, 2000);
//   } else {
//     toast.error(res.data?.message || "Failed to place order");
//   }
// } catch (error) {
//   console.error("Error placing order:", error);
//   toast.error("Something went wrong");
// }
// };

//   return (
//     <>
//       <Nav />
//       <div className="p-10 bg-cream min-h-screen">
//         <ToastContainer position="top-right" />
//         <h1 className="text-3xl md:text-5xl font-bold text-dark text-center mb-10">
//           Checkout
//         </h1>

//         {cart.length === 0 ? (
//           <p className="text-center text-lg">Your cart is empty.</p>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {cart.map((item) => (
//                 <div
//                   key={item._id}
//                   className="bg-lavender shadow-lg rounded-xl p-4 flex flex-col justify-between"
//                 >
//                   <img
//                     src={`http://localhost:5050/files/${item.image}`}
//                     alt={item.recipe}
//                     className="h-40 w-full object-contain mb-4 rounded"
//                   />
//                   <div className="flex-1">
//                     <h2 className="font-bold text-lg mb-1">{item.recipe}</h2>
//                     <p className="text-gray-600">Price: ₹ {item.price}</p>
//                     <p className="text-gray-600">Quantity: {item.quantity}</p>
//                     <p className="mt-2 font-medium">
//                       Total: ₹ {item.price * item.quantity}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Grand total */}
//             <div className="text-right mt-8">
//               <h2 className="text-2xl font-bold mb-4">
//                 Grand Total: ₹ {totalPrice}
//               </h2>
//             </div>

//             {/* Receiving details form */}
//             <div className="mt-10 bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto">
//               <h2 className="text-2xl font-semibold mb-4 text-choco">
//                 Delivery Details
//               </h2>
//               <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label>Full Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Full Name"
//                     className="p-3 border rounded-lg w-full"
//                   />
//                 </div>
//                 <div>
//                   <label>Mobile Number</label>
//                   <input
//                     type="tel"
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleChange}
//                     placeholder="Mobile Number"
//                     className="p-3 border rounded-lg w-full"
//                   />
//                 </div>
//                 <div>
//                   <label>Door Number</label>
//                   <input
//                     type="text"
//                     name="doorNo"
//                     value={formData.doorNo}
//                     onChange={handleChange}
//                     placeholder="Door Number"
//                     className="p-3 border rounded-lg w-full"
//                   />
//                 </div>
//                 <div className="md:col-span-3">
//                   <label>Address</label>
//                   <input
//                     type="text"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     placeholder="Address"
//                     className="p-3 border rounded-lg w-full"
//                   />
//                 </div>
//                 <div>
//                   <label>City</label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     placeholder="City"
//                     className="p-3 border rounded-lg w-full"
//                   />
//                 </div>
//                 <div>
//                   <label>State</label>
//                   <input
//                     type="text"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleChange}
//                     placeholder="State"
//                     className="p-3 border rounded-lg w-full"
//                   />
//                 </div>
//                 <div>
//                   <label>Pincode</label>
//                   <input
//                     type="number"
//                     name="pincode"
//                     value={formData.pincode}
//                     onChange={handleChange}
//                     placeholder="Pincode"
//                     className="p-3 border rounded-lg w-full"
//                   />
//                 </div>
//               </form>
//             </div>

//             {/* Payment details */}
//             <div className="mt-10 bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto">
//               <h2 className="text-2xl font-semibold mb-5 text-choco">
//                 Payment Details
//               </h2>
//               <div className="space-y-3">
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="cod"
//                     checked={paymentMethod === "cod"}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                   />
//                   Cash on Delivery
//                 </label>

//                 <label className="flex items-center gap-2 text-gray-500">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="upi"
//                     disabled
//                   />
//                   UPI / Card Payment (coming soon)
//                 </label>
//               </div>

//               {/* Place Order button */}
//               <div className="text-right mt-6">
//                 <button
//                   onClick={handlePlaceOrder}
//                   className="bg-green-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-green-700 transition duration-300"
//                 >
//                   Place Order
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Checkout;



// import React, { useContext, useEffect, useState } from "react";
// import { CartContext } from "../../contexts/CartContext";
// import { useLocation, useNavigate } from "react-router";
// import Nav from "../../Nav";
// import Footer from "../../Footer";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";

// const Checkout = () => {
//   const { cart, clearCart } = useContext(CartContext);
//   const navigate = useNavigate();
// const location=useLocation()
// const data=location.state
// const [ScriptLoaded, setScriptLoaded] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     doorNo: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("cod");
//   const [cardNumber, setCardNumber] = useState("");

//   useEffect(() => {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//         const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => setScriptLoaded(true);
//     script.onerror = () => alert("Razorpay SDK failed to load");
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//       }, []);

//   const totalPrice = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePlaceOrder = async () => {
//     if (
//       !formData.name ||
//       !formData.mobile ||
//       !formData.doorNo ||
//       !formData.address ||
//       !formData.city ||
//       !formData.state ||
//       !formData.pincode
//     ) {
//       toast.error("Please fill in all receiving details", { autoClose: 2000 });
//       return;
//     }

//     if (paymentMethod === "card" && (!cardNumber || cardNumber.length < 16)) {
//       toast.error("Please enter a valid 16-digit card number", {
//         autoClose: 2000,
//       });
//       return;
//     }

//     const orderData = {
//       userId: localStorage.getItem("userId") || "12345",
//       items: cart,
//       deliveryDetails: {
//         receiverName: formData.name,
//         mobile: formData.mobile,
//         address: formData.address,
//         city: formData.city,
//         state: formData.state,
//         pincode: formData.pincode,
//         doorNo: formData.doorNo,
//       },
//       paymentMethod,
//       totalPrice,
//     };

//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post("http://localhost:5050/orders", orderData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.data && res.data.success) {
//         toast.success("Order placed successfully!", { autoClose: 3000 });
//         clearCart();
//         setTimeout(() => navigate("/orders"), 2000);
//       } else {
//         toast.error(res.data?.message || "Failed to place order");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       toast.error("Something went wrong");
//     }
//     if (!ScriptLoaded) {
//       alert("Razorpay SDK not loaded yet");
//       return;
//     }

//     const options = {
//       key: "rzp_test_RIxDCEPrAengZM", // Test key
//       amount: data.product_price * 100, // in paise
//       currency: "INR",
//       name: "Artworld",
//       description: "Purchase Payment",
//       handler: async function (response) {
//         alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
//         try {
//           await axios.post("http://localhost:5050/orders", {
//             ...data,
//             razorpay_payment_id: response.razorpay_payment_id,
//           });
//           toast.success("Order saved successfully!");
//           navigate("/success", { state: response.razorpay_payment_id });
//         } catch (err) {
//           console.error("Error saving order:", err);
//           toast.error("Order save failed. Please contact support.");
//         }
//       },
//       prefill: {
//         name: "Sherril",
//         email: "sherrilkumar@gmail.com",
//         contact: "9486907680",
//       },
//       notes: {
//         address: "Razorpay corporate office",
//       },
//       theme: {
//         color: "#F37254",
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <>
//       <Nav />
//       <div className="p-10 bg-cream min-h-screen">
//         <ToastContainer position="top-right" />
//         <h1 className="text-3xl md:text-5xl font-bold text-dark text-center mb-10">
//           Checkout
//         </h1>

//         {cart.length === 0 ? (
//           <p className="text-center text-lg">Your cart is empty.</p>
//         ) : (
//           <>
//             {/* Cart Items */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {cart.map((item) => (
//                 <div
//                   key={item._id}
//                   className="bg-lavender shadow-lg rounded-xl p-4 flex flex-col justify-between"
//                 >
//                   <img
//                     src={`http://localhost:5050/files/${item.image}`}
//                     alt={item.recipe}
//                     className="h-40 w-full object-contain mb-4 rounded"
//                   />
//                   <div className="flex-1">
//                     <h2 className="font-bold text-lg mb-1">{item.recipe}</h2>
//                     <p className="text-gray-600">Price: ₹ {item.price}</p>
//                     <p className="text-gray-600">Quantity: {item.quantity}</p>
//                     <p className="mt-2 font-medium">
//                       Total: ₹ {item.price * item.quantity}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Grand Total */}
//             <div className="text-right mt-8">
//               <h2 className="text-2xl font-bold mb-4">
//                 Grand Total: ₹ {totalPrice}
//               </h2>
//             </div>

//             {/* Delivery Details */}
//             <div className="mt-10 bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto">
//               <h2 className="text-2xl font-semibold mb-4 text-choco">
//                 Delivery Details
//               </h2>
//               <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label>Full Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Full Name"
//                     className="p-3 border rounded-lg w-full"
//                   />
//                 </div>
//                 <div>
//                   <label>Mobile Number</label>
//                   <input
//                     type="tel"
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleChange}
//                     placeholder="Mobile Number"
//                     className="p-3 border rounded-lg w-full"
//                   />
//                 </div>
//                 <div>
//                   <label>Door Number</label>
//                   <input
//                     type="text"
//                     name="doorNo"
//                     value={formData.doorNo}
//                     onChange={handleChange}
//                     placeholder="Door Number"
//                     className="p-3 border rounded-lg w-full"
//                   />
//                 </div>
//                 <div className="md:col-span-3">
//                   <label>Address</label>
//                   <input
//                     type="text"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     placeholder="Address"
//                     className="p-3 border rounded-lg w-full"
//                   />
//                 </div>
//                 <div>
//                   <label>City</label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     placeholder="City"
//                     className="p-3 border rounded-lg w-full"
//                   />
//                 </div>
//                 <div>
//                   <label>State</label>
//                   <input
//                     type="text"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleChange}
//                     placeholder="State"
//                     className="p-3 border rounded-lg w-full"
//                   />
//                 </div>
//                 <div>
//                   <label>Pincode</label>
//                   <input
//                     type="number"
//                     name="pincode"
//                     value={formData.pincode}
//                     onChange={handleChange}
//                     placeholder="Pincode"
//                     className="p-3 border rounded-lg w-full"
//                   />
//                 </div>
//               </form>
//             </div>

//             {/* Payment Section */}
//             <div className="mt-10 bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto">
//               <h2 className="text-2xl font-semibold mb-5 text-choco">
//                 Payment Details
//               </h2>
//               <div className="space-y-3">
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="cod"
//                     checked={paymentMethod === "cod"}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                   />
//                   Cash on Delivery
//                 </label>

//                 <label className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="card"
//                     checked={paymentMethod === "card"}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                   />
//                   Credit / Debit Card
//                 </label>
//               </div>

//               {/* Show Card Input Only If Card Payment Selected */}
//               {paymentMethod === "card" && (
//                 <div className="mt-6 space-y-4">
//                   <label className="block font-medium text-gray-700 mb-1">
//                     Card Number
//                   </label>
//                   <input
//                     type="text"
//                     value={cardNumber}
//                     onChange={(e) =>
//                       setCardNumber(e.target.value.replace(/\D/g, ""))
//                     }
//                     maxLength="16"
//                     placeholder="Enter 16-digit card number"
//                     className="p-3 border rounded-lg w-full tracking-widest text-lg"
//                   />
//                 </div>
//               )}

//               <div className="text-right mt-6">
//                 <button
//                   onClick={handlePlaceOrder}
//                   className="bg-green-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-green-700 transition duration-300"
//                 >
//                   {paymentMethod === "card"
//                     ? `Pay ₹${totalPrice}`
//                     : "Place Order"}
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Checkout;





import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useLocation, useNavigate } from "react-router";
import Nav from "../../Nav";
import Footer from "../../Footer";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    doorNo: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardNumber, setCardNumber] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => alert("Razorpay SDK failed to load");
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, mobile, doorNo, address, city, state, pincode } = formData;
    if (!name || !mobile || !doorNo || !address || !city || !state || !pincode) {
      toast.error("Please fill in all receiving details", { autoClose: 2000 });
      return false;
    }
    if (paymentMethod === "card" && (!cardNumber || cardNumber.length < 16)) {
      toast.error("Please enter a valid 16-digit card number", {
        autoClose: 2000,
      });
      return false;
    }
    return true;
  };

  const placeOrder = async (extraData = {}) => {
    try {
      const token = localStorage.getItem("token");
      const orderData = {
        userId: localStorage.getItem("userId") || "12345",
        items: cart,
        deliveryDetails: {
          receiverName: formData.name,
          mobile: formData.mobile,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          doorNo: formData.doorNo,
        },
        paymentMethod,
        totalPrice,
        ...extraData,
      };

      const res = await axios.post("http://localhost:5050/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data && res.data.success) {
        toast.success("Order placed successfully!", { autoClose: 2000 });
        clearCart();
        setTimeout(() => navigate("/orders"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong");
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    if (paymentMethod === "cod") {
      // COD order directly
      placeOrder();
    } else if (paymentMethod === "card") {
      // Razorpay payment
      if (!scriptLoaded) {
        alert("Razorpay SDK not loaded yet");
        return;
      }

      const options = {
        key: "rzp_test_RIxDCEPrAengZM", // Test key
        amount: totalPrice * 100, // in paise
        currency: "INR",
        name: "Sweet Heart",
        description: "Purchase Payment",
        handler: async function (response) {
          toast.success("Payment Successful!", { autoClose: 2000 });
          await placeOrder({
            razorpay_payment_id: response.razorpay_payment_id,
          });
        },
        prefill: {
          name: formData.name || "Customer",
          email: "customer@example.com",
          contact: formData.mobile || "9999999999",
        },
        notes: {
          address: formData.address,
        },
        theme: {
          color: "#6B4226",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  };

  return (
    <>
      <Nav />
      <div className="p-10 bg-cream min-h-screen">
        <ToastContainer position="top-right" />
        <h1 className="text-3xl md:text-5xl font-bold text-dark text-center mb-10">
          Checkout
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty.</p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-lavender shadow-lg rounded-xl p-4 flex flex-col justify-between"
                >
                  <img
                    src={`http://localhost:5050/files/${item.image}`}
                    alt={item.recipe}
                    className="h-40 w-full object-contain mb-4 rounded"
                  />
                  <div className="flex-1">
                    <h2 className="font-bold text-lg mb-1">{item.recipe}</h2>
                    <p className="text-gray-600">Price: ₹ {item.price}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="mt-2 font-medium">
                      Total: ₹ {item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Grand Total */}
            <div className="text-right mt-8">
              <h2 className="text-2xl font-bold mb-4">
                Grand Total: ₹ {totalPrice}
              </h2>
            </div>

            {/* Delivery Details */}
            <div className="mt-10 bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-choco">
                Delivery Details
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="p-3 border rounded-lg w-full"
                  />
                </div>
                <div>
                  <label>Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    className="p-3 border rounded-lg w-full"
                  />
                </div>
                <div>
                  <label>Door Number</label>
                  <input
                    type="text"
                    name="doorNo"
                    value={formData.doorNo}
                    onChange={handleChange}
                    placeholder="Door Number"
                    className="p-3 border rounded-lg w-full"
                  />
                </div>
                <div className="md:col-span-3">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="p-3 border rounded-lg w-full"
                  />
                </div>
                <div>
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="p-3 border rounded-lg w-full"
                  />
                </div>
                <div>
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="p-3 border rounded-lg w-full"
                  />
                </div>
                <div>
                  <label>Pincode</label>
                  <input
                    type="number"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    className="p-3 border rounded-lg w-full"
                  />
                </div>
              </form>
            </div>

            {/* Payment Section */}
            <div className="mt-10 bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold mb-5 text-choco">
                Payment Details
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Cash on Delivery
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Credit / Debit Card
                </label>
              </div>

              {paymentMethod === "card" && (
                <div className="mt-6 space-y-4">
                  <label className="block font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(e.target.value.replace(/\D/g, ""))
                    }
                    maxLength="16"
                    placeholder="Enter 16-digit card number"
                    className="p-3 border rounded-lg w-full tracking-widest text-lg"
                  />
                </div>
              )}

              <div className="text-right mt-6">
                <button
                  onClick={handlePlaceOrder}
                  className="bg-green-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-green-700 transition duration-300"
                >
                  {paymentMethod === "card"
                    ? `Pay ₹${totalPrice}`
                    : "Place Order"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
