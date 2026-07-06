"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";
import type { ProductData } from "@/data/products";
import { useCart } from "@/providers/CartProvider";

/* ═══════════════════════════════════════════
   MOBILE STICKY ADD-TO-CART BAR
   ───────────────────────────────────────────
   Fixed bottom bar visible only on mobile
   (<768px). Slides up on mount, respects
   iPhone safe-area, uses existing cart logic.
   ═══════════════════════════════════════════ */

export default function MobileStickyCart({ product }: { product: ProductData }) {
  const { addToCart, isInCart } = useCart();
  const router = useRouter();
  const [justAdded, setJustAdded] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const inCart = isInCart(product.id);

  /* Reset justAdded after 2s */
  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(false), 2000);
    return () => clearTimeout(t);
  }, [justAdded]);

  const handleAddToCart = useCallback(() => {
    if (inCart) {
      router.push("/cart");
      return;
    }
    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      priceNumeric:
        parseInt(product.price.replace(/[₹,\s]/g, ""), 10) || 0,
    });
    setJustAdded(true);
  }, [addToCart, product, inCart, router]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="mobile-sticky-cart"
      >
        <button
          onClick={handleAddToCart}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
          onTouchStart={() => setIsPressed(true)}
          onTouchEnd={() => setIsPressed(false)}
          className="mobile-sticky-cart-btn"
          style={{
            transform: isPressed ? "scale(0.98)" : "scale(1)",
            background: inCart
              ? "linear-gradient(135deg, #2D5E36 0%, #3A7A48 100%)"
              : justAdded
                ? "linear-gradient(135deg, #2D5E36 0%, #3A7A48 100%)"
                : "linear-gradient(135deg, #5E2E36 0%, #7A4450 100%)",
          }}
          aria-label={inCart ? "Go to Cart" : "Add to Cart"}
        >
          {/* Icon */}
          <span className="mobile-sticky-cart-icon">
            {inCart || justAdded ? (
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Check size={18} strokeWidth={2.5} />
              </motion.div>
            ) : (
              <ShoppingBag size={18} strokeWidth={1.8} />
            )}
          </span>

          {/* Text */}
          <span className="mobile-sticky-cart-text">
            {inCart ? "Go to Cart" : justAdded ? "Added!" : "Add to Cart"}
          </span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
