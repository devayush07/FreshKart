import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

// Category pills config — matches assets.js categories paths
const CATEGORY_PILLS = [
  { label: "All", path: "all", emoji: "🛒" },
  { label: "Vegetables", path: "Vegetables", emoji: "🥦" },
  { label: "Fruits", path: "Fruits", emoji: "🍎" },
  { label: "Dairy", path: "Dairy", emoji: "🥛" },
  { label: "Drinks", path: "Drinks", emoji: "🧃" },
  { label: "Grains", path: "Grains", emoji: "🌾" },
  { label: "Bakery", path: "Bakery", emoji: "🍞" },
  { label: "Instant", path: "Instant", emoji: "🍜" },
];

const Products = () => {
  const { products, searchQuery } = useContext(AppContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const gridRef = useRef(null);

  // Filter by search query AND active category
  useEffect(() => {
    let result = products;

    // Apply search filter
    if (searchQuery.length > 0) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (activeCategory !== "all") {
      result = result.filter(
        (product) =>
          product.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    setFilteredProducts(result);
  }, [products, searchQuery, activeCategory]);

  // Smooth scroll to product grid on category change
  const handleCategoryChange = (path) => {
    setActiveCategory(path);
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  // Count products per category (in-stock only)
  const getCategoryCount = (path) => {
    if (path === "all") return products.filter((p) => p.inStock).length;
    return products.filter(
      (p) =>
        p.inStock &&
        p.category?.toLowerCase() === path.toLowerCase()
    ).length;
  };

  const inStockFiltered = filteredProducts.filter((p) => p.inStock);

  return (
    <div className="mt-16">
      {/* Page Title */}
      <h1 className="text-3xl lg:text-4xl font-medium dark:text-white">
        All Products
      </h1>

      {/* ── Category Filter Pills ── */}
      <div className="mt-6 mb-2">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORY_PILLS.map((cat) => {
            const count = getCategoryCount(cat.path);
            const isActive = activeCategory === cat.path;
            return (
              <button
                key={cat.path}
                onClick={() => handleCategoryChange(cat.path)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200
                  ${
                    isActive
                      ? "bg-emerald-500 border-emerald-500 text-white scale-105 shadow-md shadow-emerald-200 dark:shadow-emerald-900"
                      : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                  }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
                {/* Badge count */}
                <span
                  className={`ml-1 text-xs px-1.5 py-0.5 rounded-full font-semibold
                    ${
                      isActive
                        ? "bg-white/30 text-white"
                        : "bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400"
                    }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active filter indicator */}
        {activeCategory !== "all" && (
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>
              Showing{" "}
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {inStockFiltered.length}
              </span>{" "}
              {activeCategory} products
            </span>
            <button
              onClick={() => handleCategoryChange("all")}
              className="text-xs underline hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Clear filter ✕
            </button>
          </div>
        )}
      </div>

      {/* ── Product Grid ── */}
      <div
        ref={gridRef}
        className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        {inStockFiltered.length > 0 ? (
          inStockFiltered.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-600">
            <span className="text-6xl mb-4">🔍</span>
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-1">Try a different category or search term</p>
            <button
              onClick={() => handleCategoryChange("all")}
              className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-full text-sm hover:bg-emerald-600 transition-colors"
            >
              View all products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
