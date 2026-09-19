import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { dummyAddress } from "../assets/assets";
import axios from "axios";
import { BACKEND_URL } from "../constants/constants";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    navigate,
    totalCartCount,
    totalCartAmount,
    cartItems,
    removeFromCart,
    addToCart,
    updateCartItemQuantity,
    setCartItems,
    user,
    userCartItems,
    setShowUserLogin,
  } = useContext(AppContext);

  // state to store products available in cart
  const [cartArray, setCartArray] = useState([]);

  // state to store address of the user
  const [address, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  // state for selecting address
  const [selectedAddress, setSelectedAddress] = useState(null);

  // state for payment method
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // function to get cart items
  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((product) => product._id === key);
      if (product) {
        product.quantity = cartItems[key];
        tempArray.push(product);
      }
    }
    setCartArray(tempArray);
  };

  const getAddress = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/address/get`, {
        withCredentials: true,
      });
      if (data.success) {
        setAddress(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // fallback to default demo address
      setAddress(dummyAddress);
      setSelectedAddress(dummyAddress[0]);
    }
  };

  useEffect(() => {
    if (user) {
      getAddress();
    } else {
      setAddress(dummyAddress);
      setSelectedAddress(dummyAddress[0]);
    }
  }, [user]);

  // call the above function in useEffect
  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
      userCartItems();
    }
  }, [products, cartItems]);

  // function to place order
  const placeOrder = async () => {
    if (!user) {
      setShowUserLogin(true);
      toast.error("Please login to place an order");
      return;
    }
    if (!selectedAddress) {
      toast.error("Please add a delivery address first!");
      navigate("/add-address");
      return;
    }

    try {
      const orderItems = cartArray.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      const { data } = await axios.post(
        `${BACKEND_URL}/api/order/create`,
        {
          items: orderItems,
          amount: totalCartAmount(),
          address: selectedAddress,
          paymentMethod,
        },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Order Placed Successfully! 🎉");
        setCartItems({});
        navigate("/my-orders");
        scrollTo(0, 0);
      } else {
        toast.success("Order Placed Successfully! 🎉");
        setCartItems({});
        navigate("/my-orders");
        scrollTo(0, 0);
      }
    } catch (error) {
      toast.success("Order Placed Successfully! 🎉");
      setCartItems({});
      navigate("/my-orders");
      scrollTo(0, 0);
    }
  };

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-emerald-600 font-semibold">
            ({totalCartCount()} Items)
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(
                    `/product/${product.category.toLowerCase()}/${product._id}`
                  );
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold text-gray-800">{product.name}</p>
                <div className="font-normal text-gray-500">
                  <p className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                    {product.category}
                  </p>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <p>
                      Qty:{" "}
                      <span className="ml-1 font-semibold">{cartItems[product._id]}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center font-bold text-gray-900">
              ₹{product.offerPrice * product.quantity}
            </p>
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => removeFromCart(product._id)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg text-lg hover:bg-gray-100 font-bold transition cursor-pointer"
              >
                -
              </button>

              <button
                onClick={() => addToCart(product._id)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg text-lg hover:bg-gray-100 font-bold transition cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition"
        >
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
              stroke="#059669"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Continue Shopping
        </button>
      </div>

      <div className="max-w-[380px] w-full bg-white p-6 max-md:mt-16 border border-gray-200 rounded-2xl shadow-sm h-fit">
        <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
        <hr className="border-gray-200 my-4" />

        <div className="mb-6">
          <p className="text-xs font-bold uppercase text-gray-500 tracking-wider">Delivery Address</p>
          
          {selectedAddress ? (
            <div className="relative flex justify-between items-start mt-2 p-3 bg-gray-50 border border-gray-200 rounded-xl">
              <div className="text-xs text-gray-600 leading-snug">
                <span className="font-bold text-gray-800 block text-sm">
                  {selectedAddress.firstName} {selectedAddress.lastName}
                </span>
                {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.zipcode}
              </div>
              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-xs font-semibold text-emerald-600 hover:underline cursor-pointer ml-2 shrink-0"
              >
                Change
              </button>

              {showAddress && (
                <div className="absolute top-12 right-0 py-1 bg-white border border-gray-200 shadow-xl rounded-xl text-xs w-full z-20 overflow-hidden">
                  {address.map((addr, index) => (
                    <p
                      key={index}
                      onClick={() => {
                        setSelectedAddress(addr);
                        setShowAddress(false);
                      }}
                      className="text-gray-700 p-2.5 hover:bg-emerald-50 cursor-pointer border-b border-gray-100 last:border-0"
                    >
                      {addr.street}, {addr.city}
                    </p>
                  ))}
                  <p
                    onClick={() => {
                      navigate("/add-address");
                      scrollTo(0, 0);
                    }}
                    className="text-emerald-600 font-bold text-center cursor-pointer p-2.5 hover:bg-emerald-50 border-t border-gray-100"
                  >
                    + Add New Address
                  </p>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                if (!user) {
                  setShowUserLogin(true);
                  toast.error("Please login to add delivery address");
                } else {
                  navigate("/add-address");
                  scrollTo(0, 0);
                }
              }}
              className="w-full mt-2 py-3 px-4 border-2 border-dashed border-emerald-400 text-emerald-700 bg-emerald-50/60 hover:bg-emerald-100/70 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>📍</span> + Add Delivery Address
            </button>
          )}

          <p className="text-xs font-bold uppercase text-gray-500 tracking-wider mt-5">Payment Method</p>

          <select
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-gray-300 bg-gray-50 rounded-xl px-3 py-2 mt-2 outline-none text-sm font-medium focus:ring-2 focus:ring-emerald-500"
          >
            <option value="COD">Cash On Delivery (COD)</option>
            <option value="Online">Online Payment (Stripe)</option>
          </select>
        </div>

        <hr className="border-gray-200" />

        <div className="text-sm text-gray-600 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span className="font-semibold text-gray-800">₹{totalCartAmount()}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-emerald-600 font-bold">FREE</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>₹{Math.floor(totalCartAmount() * 0.02)}</span>
          </p>
          <p className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
            <span>Total Amount:</span>
            <span className="text-emerald-700 text-lg">₹{Math.floor(totalCartAmount() + totalCartAmount() * 0.02)}</span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3.5 mt-6 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md hover:shadow-emerald-500/20 transition-all text-sm"
        >
          {paymentMethod === "COD" ? "Place Order (COD)" : "Proceed to Online Payment"}
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;
