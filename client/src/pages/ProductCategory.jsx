import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductCategory = () => {
  const { products } = useContext(AppContext);
  const { category } = useParams();
  const [sortBy, setSortBy] = useState("relevant");

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category.toLowerCase()
  );

  // Filter products by category & inStock
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase() && product.inStock
  );

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.offerPrice - b.offerPrice;
    if (sortBy === "price-high") return b.offerPrice - a.offerPrice;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0; // default 'relevant'
  });

  return (
    <div className="mt-12 mb-20 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium">
        <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-emerald-600 transition-colors">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-emerald-600 dark:text-emerald-400 capitalize font-semibold">
          {searchCategory ? searchCategory.path : category}
        </span>
      </nav>

      {/* Hero Category Banner */}
      {searchCategory && (
        <div
          className="relative overflow-hidden rounded-3xl p-8 sm:p-12 mb-10 shadow-lg border border-gray-100 dark:border-slate-800 transition-all"
          style={{ backgroundColor: searchCategory.bgColor || "#F0F5DE" }}
        >
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-gray-800 dark:text-gray-200">
                Category Collection
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mt-3 mb-2 capitalize">
                {searchCategory.text}
              </h1>
              <p className="text-gray-700 max-w-md text-sm sm:text-base font-medium">
                Explore our fresh, hand-picked selection of high quality {searchCategory.path.toLowerCase()} delivered right to your doorstep.
              </p>
            </div>
            {searchCategory.image && (
              <img
                src={searchCategory.image}
                alt={searchCategory.text}
                className="w-32 sm:w-48 h-auto object-contain filter drop-shadow-xl hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>
        </div>
      )}

      {/* Toolbar: Category Quick Nav & Sorting Dropdown */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
        {/* Total items badge */}
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
          Showing <span className="text-emerald-600 dark:text-emerald-400 font-bold">{sortedProducts.length}</span> items
        </p>

        {/* Sort Options */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <label htmlFor="sort" className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-gray-200 text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer font-medium"
          >
            <option value="relevant">Featured / Relevant</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {sortedProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-gray-300 dark:border-slate-800 text-center">
          <span className="text-6xl mb-4">🥦</span>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            No products found in this category
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
            We are restocking soon! Check back later or explore other fresh categories.
          </p>
          <Link
            to="/products"
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
          >
            View All Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
