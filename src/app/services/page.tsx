"use client";

import { motion } from "framer-motion";

export default function ServicesPage() {
  const services = [
    {
      title: "Book Video Call Appointment",
      description:
        "Connect with our jewellery experts from the comfort of your home. Get personalized guidance, explore collections, and find your perfect piece.",
      href: "https://calendly.com/pachchigarandsonsonline/30min?back=1",
      cta: "Schedule a Call",
    },
    {
      title: "Book Try At Home",
      description:
        "Experience the luxury of trying our finest pieces at your doorstep. Our experts bring a curated selection tailored to your preferences.",
      href: "https://calendly.com/pachchigarandsonsonline/book-video-call-clone",
      cta: "Book Now",
    },
  ];

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
          {/* Decorative line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 48, opacity: 0.5 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
            className="mx-auto mb-6"
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, #CBA135, transparent)",
            }}
          />

          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2,
            }}
            className="section-label block text-center mb-5"
          >
            Personalised Experience
          </motion.span>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.3,
            }}
            className="heading-xl text-center mb-6"
          >
            Our Services
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.45,
            }}
            className="body-l text-center max-w-lg mx-auto mb-16"
          >
            We bring the showroom experience to you. Choose from our
            personalised services designed for your convenience.
          </motion.p>

          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
            {services.map((service, i) => (
              <motion.a
                key={service.title}
                href={service.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.55 + i * 0.12,
                }}
                className="group block rounded-2xl px-7 py-9 sm:px-8 sm:py-10 transition-all duration-500"
                style={{
                  background: "#FAF7F2",
                  border: "1px solid rgba(203,161,53,0.08)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.02)",
                }}
                whileHover={{
                  y: -4,
                  boxShadow:
                    "0 12px 36px rgba(0,0,0,0.05), 0 0 0 1px rgba(203,161,53,0.12)",
                }}
              >
                <h3 className="heading-m mb-3">{service.title}</h3>
                <p className="body-s mb-6">{service.description}</p>
                <span className="cta-text gap-2 group-hover:text-wine">
                  {service.cta}
                  <span className="transition-transform duration-500 inline-block group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
