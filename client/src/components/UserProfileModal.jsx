import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const UserProfileModal = ({ isOpen, onClose }) => {
  const { user, setUser, navigate } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user?.name || "Guest Customer");
  const [userEmail, setUserEmail] = useState(user?.email || "customer@freshcart.com");

  if (!isOpen) return null;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      name: userName,
      email: userEmail,
    }));
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 transition-all transform scale-100">
        {/* Header Gradient */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer"
          >
            ✕
          </button>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <img
                src={assets.profile_icon}
                alt="Profile Avatar"
                className="w-16 h-16 rounded-full border-2 border-white/80 object-cover shadow-md bg-white/20 p-1"
              />
              <span className="absolute bottom-0 right-0 bg-emerald-400 w-4 h-4 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                {user?.name || userName}
              </h2>
              <p className="text-xs text-emerald-100 mt-0.5">
                {user?.email || userEmail}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-emerald-50/80 border border-emerald-100 rounded-xl p-3 text-center">
              <span className="text-lg font-bold text-emerald-700">12</span>
              <p className="text-[11px] text-gray-500 font-medium mt-0.5">Orders</p>
            </div>
            <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-3 text-center">
              <span className="text-lg font-bold text-blue-700">2</span>
              <p className="text-[11px] text-gray-500 font-medium mt-0.5">Addresses</p>
            </div>
            <div className="bg-purple-50/80 border border-purple-100 rounded-xl p-3 text-center">
              <span className="text-lg font-bold text-purple-700">₹450</span>
              <p className="text-[11px] text-gray-500 font-medium mt-0.5">Saved</p>
            </div>
          </div>

          {/* Profile Form / View */}
          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition cursor-pointer"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-xs text-gray-500">Account Type</p>
                  <p className="text-sm font-semibold text-gray-800">FreshCart Member</p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                  Active
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-xs text-gray-500">Default Delivery Address</p>
                  <p className="text-sm font-semibold text-gray-800">123 Green Street, Main City</p>
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 py-2 px-4 border border-emerald-600 text-emerald-700 hover:bg-emerald-50 rounded-xl text-sm font-medium transition cursor-pointer"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => {
                    onClose();
                    navigate("/my-orders");
                  }}
                  className="flex-1 py-2 px-4 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-medium transition cursor-pointer"
                >
                  My Orders
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
