import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl my-4">
      {/* Background Banner Images */}
      <img
        src={assets.main_banner_bg}
        alt="FreshCart Banner"
        className="hidden md:block w-full object-cover min-h-[380px] lg:min-h-[440px]"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="FreshCart Banner"
        className="md:hidden w-full object-cover min-h-[320px]"
      />

      {/* Floating Trust Badges (Top Right) */}
      <div className="absolute top-4 right-4 hidden lg:flex flex-col gap-2 z-10">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm border border-white/50 text-xs font-semibold text-gray-700 animate-pulse">
          <span className="text-emerald-600 font-bold">⚡</span> 30-Min Express Delivery
        </div>
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm border border-white/50 text-xs font-semibold text-gray-700">
          <span className="text-emerald-600 font-bold">🌿</span> 100% Organic Produce
        </div>
      </div>

      {/* Glassmorphism Hero Overlay */}
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center p-6 md:p-12 lg:p-16 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-none">
        <div className="backdrop-blur-md bg-white/75 md:bg-white/70 border border-white/60 shadow-xl rounded-2xl p-6 md:p-8 max-w-full md:max-w-md lg:max-w-lg transition-all duration-300 hover:shadow-2xl hover:bg-white/80">
          
          {/* Badge Tag */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100/90 text-emerald-800 border border-emerald-300/60 mb-3 shadow-xs">
            <span>✨</span> Daily Organic Groceries
          </span>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight lg:leading-snug tracking-tight">
            Freshness You Can Trust, <span className="text-emerald-600 underline decoration-emerald-300/80 decoration-wavy">Savings You'll Love!</span>
          </h1>

          <p className="text-sm md:text-base text-gray-600 mt-3 leading-relaxed hidden sm:block">
            Order farm-fresh vegetables, fruits, dairy & daily essentials directly to your doorstep with instant price deals.
          </p>

          {/* Action Buttons with Micro-Animations */}
          <div className="flex items-center mt-6 font-medium gap-4 flex-wrap">
            <Link
              to={"/products"}
              className="group flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold bg-emerald-600 hover:bg-emerald-700 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-md hover:shadow-emerald-500/30"
            >
              Shop Now
              <img
                src={assets.white_arrow_icon}
                alt="arrow"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>

            <Link
              to={"/products"}
              className="group hidden sm:flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-emerald-900 bg-white/90 hover:bg-white border border-emerald-300/80 hover:border-emerald-500 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-xs hover:shadow-md"
            >
              Explore Deals
              <svg
                className="w-4 h-4 text-emerald-600 transition-transform duration-300 group-hover:translate-x-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
