"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, X, ArrowLeft } from "lucide-react";
import { useWishlist } from "@/providers/WishlistProvider";
import { useCart } from "@/providers/CartProvider";

/* ═══════════════════════════════════════════
   WISHLIST PAGE
   Displays saved products with remove and
   add-to-cart actions.
   ═══════════════════════════════════════════ */

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = (item: (typeof items)[0]) => {
    addToCart({
      id: item.id,
      slug: item.slug,
      name: item.name,
      image: item.image,
      price: item.price,
      priceNumeric: item.priceNumeric,
    });
  };

  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #FDFAF5 0%, #F7F2EB 40%, #F5EFE5 70%, #FDFAF5 100%)",
      }}
    >
      <section className="pt-32 sm:pt-40 pb-24 sm:pb-32">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="mx-auto mb-6"
              style={{
                width: 48,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, #CBA135, transparent)",
                opacity: 0.5,
              }}
            />
            <span className="section-label block text-center mb-5">
              Saved Pieces
            </span>
            <h1 className="heading-xl text-center mb-3">Your Wishlist</h1>
            <p className="body-m text-center mb-12">
              {items.length === 0
                ? "You haven't saved any pieces yet."
                : `${items.length} ${items.length === 1 ? "piece" : "pieces"} you love`}
            </p>
          </motion.div>

          {items.length === 0 ? (
            /* ── Empty State ── */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15,
              }}
              className="max-w-md mx-auto text-center py-16 sm:py-24 rounded-2xl"
              style={{
                background: "#FAF7F2",
                border: "1px solid rgba(203,161,53,0.08)",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background: "#F5EFE5",
                  border: "1px solid rgba(203,161,53,0.08)",
                }}
              >
                <Heart
                  size={24}
                  strokeWidth={1.5}
                  className="text-[#5A4A42]"
                />
              </div>
              <h2 className="heading-m mb-3">Nothing saved yet</h2>
              <p className="body-s max-w-xs mx-auto mb-8">
                Browse our collections and tap the heart icon on any piece that
                catches your eye.
              </p>
              <Link
                href="/collections/rings"
                className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold tracking-[0.18em] uppercase text-[#FDFAF5] px-8 py-3.5 rounded-xl transition-all duration-500 hover:shadow-lg"
                style={{ background: "#2D241E" }}
              >
                Explore Collections
              </Link>
            </motion.div>
          ) : (
            /* ── Wishlist Grid ── */
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-7">
                {items.map((item, i) => {
                  const inCart = isInCart(item.id);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.1 + i * 0.06,
                      }}
                      className="group"
                    >
                      <div className="luxury-product-card gpu-accelerate">
                        {/* Image */}
                        <div
                          className="card-image-area relative w-full overflow-hidden rounded-t-[16px]"
                          style={{
                            paddingBottom: "100%",
                            background: "#FAF7F2",
                          }}
                        >
                          <Link href={`/products/${item.slug}`}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              className="object-contain p-6 sm:p-8 transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                            />
                          </Link>

                          {/* Remove button */}
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#5A4A42]/50 hover:text-[#B94A4A] hover:bg-white transition-all duration-300 z-10"
                            style={{
                              border: "1px solid rgba(203,161,53,0.08)",
                            }}
                            aria-label="Remove from wishlist"
                          >
                            <X size={14} strokeWidth={2} />
                          </button>
                        </div>

                        {/* Info */}
                        <div className="card-info-area px-4 sm:px-5 pt-3 pb-4 bg-white rounded-b-[16px]">
                          <Link href={`/products/${item.slug}`}>
                            <h3 className="product-title hover:text-[#5E2E36] transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                          <div className="flex items-center justify-between mt-1.5 gap-2">
                            <span className="product-price">{item.price}</span>
                            <button
                              onClick={() => handleAddToCart(item)}
                              className={`flex items-center gap-1.5 font-sans text-[10px] font-semibold tracking-[0.08em] uppercase px-3 py-1.5 rounded-lg transition-all duration-300 ${
                                inCart
                                  ? "bg-[#2D241E] text-[#FDFAF5]"
                                  : "bg-[#F5EFE5] text-[#2D241E] hover:bg-[#2D241E] hover:text-[#FDFAF5]"
                              }`}
                            >
                              <ShoppingBag size={12} strokeWidth={1.8} />
                              {inCart ? "In Cart" : "Add"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Continue Shopping */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 mt-8 font-sans text-[11px] font-semibold tracking-[0.15em] uppercase text-[#5A4A42] hover:text-[#5E2E36] transition-colors"
              >
                <ArrowLeft size={14} strokeWidth={1.8} />
                Continue Shopping
              </Link>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
