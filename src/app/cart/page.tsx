"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Heart } from "lucide-react";
import { useCart } from "@/providers/CartProvider";
import { useWishlist } from "@/providers/WishlistProvider";

/* ═══════════════════════════════════════════
   CART PAGE
   Full cart with item list, quantity controls,
   remove, and order summary.
   ═══════════════════════════════════════════ */

function formatPrice(amount: number): string {
  return (
    "₹" +
    amount.toLocaleString("en-IN")
  );
}

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } =
    useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #FDFAF5 0%, #F7F2EB 40%, #F5EFE5 70%, #FDFAF5 100%)",
      }}
    >
      <section className="pt-32 sm:pt-40 pb-24 sm:pb-32">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Decorative line */}
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
              Shopping
            </span>
            <h1 className="heading-xl text-center mb-3">Your Cart</h1>
            <p className="body-m text-center mb-12">
              {totalItems === 0
                ? "Your cart is currently empty."
                : `${totalItems} ${totalItems === 1 ? "item" : "items"} in your cart`}
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
                <ShoppingBag
                  size={24}
                  strokeWidth={1.5}
                  className="text-[#5A4A42]"
                />
              </div>
              <h2 className="heading-m mb-3">Nothing here yet</h2>
              <p className="body-s max-w-xs mx-auto mb-8">
                Explore our collections to discover timeless pieces crafted with
                heritage artistry.
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
            /* ── Cart Content ── */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* ── Left: Cart Items ── */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.1 + i * 0.06,
                    }}
                    className="flex gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl transition-all duration-300"
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid rgba(203,161,53,0.06)",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.02)",
                    }}
                  >
                    {/* Product Image */}
                    <Link
                      href={`/products/${item.slug}`}
                      className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden group"
                      style={{ background: "#FAF7F2" }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="120px"
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <Link
                          href={`/products/${item.slug}`}
                          className="block"
                        >
                          <h3 className="font-serif text-[15px] sm:text-[17px] font-medium text-[#2D241E] leading-snug hover:text-[#5E2E36] transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <span className="font-serif text-[14px] sm:text-[15px] text-[#5A4A42] mt-1 block">
                          {item.price}
                        </span>
                      </div>

                      {/* Quantity + Remove */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 sm:mt-0">
                        <div
                          className="flex items-center rounded-lg overflow-hidden"
                          style={{
                            border: "1px solid #E2D5C3",
                          }}
                        >
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center text-[#5A4A42] hover:text-[#2D241E] hover:bg-[#F5EFE5] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} strokeWidth={2} />
                          </button>
                          <span className="w-9 h-8 flex items-center justify-center font-sans text-[12px] font-semibold text-[#2D241E] border-x border-[#E2D5C3]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center text-[#5A4A42] hover:text-[#2D241E] hover:bg-[#F5EFE5] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} strokeWidth={2} />
                          </button>
                        </div>

                        {/* Divider on desktop only */}
                        <div className="hidden sm:block w-px h-5 bg-[#E2D5C3]/50" />

                        <div className="flex items-center gap-3 sm:gap-4">
                          <button
                            onClick={() => {
                              toggleWishlist({
                                id: item.id,
                                slug: item.slug,
                                name: item.name,
                                image: item.image,
                                price: item.price,
                                priceNumeric: item.priceNumeric,
                              });
                              removeFromCart(item.id);
                            }}
                            className={`flex items-center gap-1.5 font-sans text-[10px] sm:text-[11px] font-medium tracking-[0.04em] transition-colors ${
                              isInWishlist(item.id)
                                ? "text-[#5E2E36]"
                                : "text-[#5A4A42]/60 hover:text-[#5E2E36]"
                            }`}
                            aria-label="Move to wishlist"
                          >
                            <Heart
                              size={13}
                              strokeWidth={1.5}
                              fill={isInWishlist(item.id) ? "currentColor" : "none"}
                            />
                            <span className="hidden xs:inline sm:inline">Move to</span> Wishlist
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center gap-1.5 font-sans text-[10px] sm:text-[11px] font-medium tracking-[0.04em] text-[#5A4A42]/60 hover:text-[#B94A4A] transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={13} strokeWidth={1.5} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Continue Shopping */}
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 mt-4 font-sans text-[11px] font-semibold tracking-[0.15em] uppercase text-[#5A4A42] hover:text-[#5E2E36] transition-colors"
                >
                  <ArrowLeft size={14} strokeWidth={1.8} />
                  Continue Shopping
                </Link>
              </div>

              {/* ── Right: Order Summary ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2,
                }}
                className="lg:col-span-1"
              >
                <div
                  className="rounded-2xl p-6 sm:p-8 lg:sticky lg:top-28"
                  style={{
                    background: "#FAF7F2",
                    border: "1px solid rgba(203,161,53,0.08)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.02)",
                  }}
                >
                  <h3 className="font-sans text-[11px] font-semibold tracking-[0.25em] uppercase text-[#5E2E36] mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-sans text-[13px] text-[#5A4A42]">
                        Subtotal ({totalItems}{" "}
                        {totalItems === 1 ? "item" : "items"})
                      </span>
                      <span className="font-serif text-[15px] font-medium text-[#2D241E]">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-sans text-[13px] text-[#5A4A42]">
                        Shipping
                      </span>
                      <span className="font-sans text-[12px] font-medium text-[#6B8E5E]">
                        Complimentary
                      </span>
                    </div>

                    <div
                      className="my-4"
                      style={{
                        height: 1,
                        background: "rgba(203,161,53,0.08)",
                      }}
                    />

                    <div className="flex justify-between items-center">
                      <span className="font-sans text-[14px] font-semibold text-[#2D241E]">
                        Total
                      </span>
                      <span className="font-serif text-[18px] font-semibold text-[#2D241E]">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>

                  <button
                    className="w-full mt-8 py-3.5 rounded-xl font-sans text-[11px] font-semibold tracking-[0.18em] uppercase text-[#FDFAF5] transition-all duration-500 hover:shadow-lg"
                    style={{ background: "#2D241E" }}
                  >
                    Proceed to Checkout
                  </button>

                  <p className="text-center mt-4 font-sans text-[10px] text-[#5A4A42]/60 tracking-wider">
                    Taxes included · Free shipping across India
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
