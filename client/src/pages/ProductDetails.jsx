import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, addToCart } = useContext(AppContext);
  const { id } = useParams();
  const product = products.find((product) => product._id === id);

  const [thumbnail, setThumbnail] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product?.image?.[0]) {
      setThumbnail(product.image[0]);
    }
    setQuantity(1);
    setIsAdded(false);
  }, [product, id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product._id);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Related products from the same category
  const relatedProducts = product
    ? products
        .filter((item) => item.category === product.category && item._id !== product._id)
        .slice(0, 4)
    : [];

  return (
    product && (
      <div className="mt-12 mb-20 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium">
          <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-emerald-600 transition-colors">Products</Link>
          <span className="mx-2">/</span>
          <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-emerald-600 capitalize transition-colors">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-emerald-600 dark:text-emerald-400 truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </nav>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white/70 dark:bg-slate-900/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl">
          {/* Images Gallery */}
          <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[420px] scrollbar-hide py-1">
              {product.image.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setThumbnail(img)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 bg-gray-50 dark:bg-slate-800
                    ${thumbnail === img ? "border-emerald-500 scale-95 shadow-md" : "border-transparent hover:border-gray-300 dark:hover:border-slate-700 opacity-70 hover:opacity-100"}`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Preview */}
            <div className="flex-1 bg-gradient-to-b from-gray-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 overflow-hidden flex items-center justify-center p-6 min-h-[350px] sm:min-h-[420px] relative group">
              <img
                src={thumbnail}
                alt={product.name}
                className="max-h-[320px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                Fresh & Organic
              </span>
            </div>
          </div>

          {/* Product Details Info */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                {product.inStock ? (
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> In Stock
                  </span>
                ) : (
                  <span className="text-xs font-medium text-red-500 flex items-center gap-1">
                    Out of Stock
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={i < (product.rating || 4) ? assets.star_icon : assets.star_dull_icon}
                      alt="star"
                      className="w-4 h-4"
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded">
                  {product.rating || 4.5} / 5
                </span>
                <span className="text-xs text-gray-400">(42 customer reviews)</span>
              </div>

              {/* Pricing */}
              <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-2xl mb-6 border border-gray-100 dark:border-slate-800 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  ₹{product.offerPrice}
                </span>
                {product.price > product.offerPrice && (
                  <>
                    <span className="text-base text-gray-400 line-through">₹{product.price}</span>
                    <span className="text-xs font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded">
                      SAVE {Math.round(((product.price - product.offerPrice) / product.price) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {/* Product Highlights / Bullet points */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2">Key Highlights</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
                  {product.description?.map((desc, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-gray-100 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between sm:justify-start border border-gray-200 dark:border-slate-700 rounded-2xl p-1 bg-gray-50 dark:bg-slate-800">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 transition"
                  >
                    -
                  </button>
                  <span className="px-5 font-bold text-gray-900 dark:text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-2xl font-bold transition-all duration-300 shadow-lg flex items-center justify-center gap-2
                    ${isAdded 
                      ? "bg-emerald-600 text-white shadow-emerald-500/30 scale-98"
                      : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25 active:scale-95"}`}
                >
                  <img src={assets.cart_icon} alt="" className="w-5 h-5 invert brightness-200" />
                  <span>{isAdded ? "Added to Cart! ✓" : "Add to Cart"}</span>
                </button>

                {/* Buy Now Button */}
                <button
                  onClick={() => {
                    handleAddToCart();
                    navigate("/cart");
                    scrollTo(0, 0);
                  }}
                  className="py-3.5 px-6 rounded-2xl font-bold bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 transition-all shadow-md active:scale-95"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct, idx) => (
                <ProductCard key={idx} product={relProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default ProductDetails;
