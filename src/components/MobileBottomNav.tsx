"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Search, Heart, ShoppingBag, User } from "lucide-react";
import { useWishlist } from "@/providers/WishlistProvider";
import { useCart } from "@/providers/CartProvider";

/* ═══════════════════════════════════════════
   MOBILE BOTTOM NAVIGATION
   Fixed bottom nav for mobile & small tablets.
   Hidden on lg+ breakpoints.
   Matches our luxury jewellery design system.
   ═══════════════════════════════════════════ */

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
  matchPaths?: string[];
}

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { items: wishlistItems } = useWishlist();
  const { items: cartItems } = useCart();

  const navItems: NavItem[] = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      matchPaths: ["/"],
    },
    {
      href: "/collections/rings",
      label: "Shop",
      icon: Search,
      matchPaths: ["/collections", "/products"],
    },
    {
      href: "/wishlist",
      label: "Wishlist",
      icon: Heart,
      badge: wishlistItems.length || undefined,
    },
    {
      href: "/cart",
      label: "Cart",
      icon: ShoppingBag,
      badge: cartItems.length || undefined,
    },
    {
      href: "/login",
      label: "Account",
      icon: User,
      matchPaths: ["/login", "/signup", "/profile"],
    },
  ];

  const isActive = (item: NavItem) => {
    if (item.href === "/" && pathname === "/") return true;
    if (item.href !== "/" && pathname.startsWith(item.href)) return true;
    if (item.matchPaths) {
      return item.matchPaths.some(
        (p) => p !== "/" && pathname.startsWith(p)
      );
    }
    return false;
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[190] lg:hidden"
      style={{
        background: "rgba(253,250,245,0.97)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(45,36,30,0.08)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.04)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around px-2 h-[60px]">
        {navItems.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] py-1 transition-colors duration-200"
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
            >
              {/* Active indicator dot */}
              {active && (
                <div
                  className="absolute -top-0.5 w-5 h-[2.5px] rounded-full"
                  style={{ background: "#5E2E36" }}
                />
              )}

              {/* Icon */}
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={active ? 2 : 1.5}
                  className="transition-colors duration-200"
                  style={{
                    color: active ? "#5E2E36" : "#5A4A42",
                  }}
                  fill={active && item.icon === Heart ? "#5E2E36" : "none"}
                />

                {/* Badge */}
                {item.badge && item.badge > 0 && (
                  <span
                    className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] flex items-center justify-center rounded-full font-sans text-[9px] font-bold px-1"
                    style={{ background: "#5E2E36", color: "#FDFAF5" }}
                  >
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className="font-sans text-[10px] leading-tight transition-colors duration-200"
                style={{
                  color: active ? "#5E2E36" : "#5A4A42",
                  fontWeight: active ? 600 : 400,
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
