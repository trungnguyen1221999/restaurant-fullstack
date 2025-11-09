import React from "react";
import {
  Crown,
  Utensils,
  Wine,
  Star,
  Award,
  Calendar,
  Phone,
  Sparkles,
} from "lucide-react";

import serv1 from "../assets/serv1.jpg";
import serv2 from "../assets/serv2.jpg";
import serv3 from "../assets/serv3.jpg";

const CategoryDisplay = () => {
  const services = [
    {
      id: 1,
      title: "Event Planning",
      subtitle: "Professional Event Services",
      description:
        "From birthdays to weddings, we create unforgettable moments with professional and dedicated event planning services.",
      image: serv1,
      icon: Crown,
      features: [
        "Themed decorations setup",
        "Custom premium menus",
        "Professional sound & lighting",
        "24/7 dedicated service",
      ],
      stats: { number: "500+", label: "Events" },
    },
    {
      id: 2,
      title: "Gourmet Cuisine",
      subtitle: "Fine Dining Experience",
      description:
        "Enjoy exquisite dishes crafted by top chefs using the finest fresh ingredients and culinary expertise.",
      image: serv2,
      icon: Utensils,
      features: [
        "Premium imported ingredients",
        "Michelin-experienced chefs",
        "Weekly rotating menus",
        "International culinary influences",
      ],
      stats: { number: "200+", label: "Dishes" },
    },
    {
      id: 3,
      title: "Signature Beverages",
      subtitle: "Exclusive Drink Collection",
      description:
        "Discover our unique collection of handcrafted cocktails, fine wines, and creative beverages meticulously prepared.",
      image: serv3,
      icon: Wine,
      features: [
        "Exclusive signature cocktails",
        "Premium wine selection",
        "Creative non-alcoholic drinks",
        "Professional bartender service",
      ],
      stats: { number: "100+", label: "Beverages" },
    },
  ];

  return (
    <section
      id="categories"
      className="py-24 bg-black relative overflow-hidden"
    >
      {/* Subtle Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/5 rounded-full border border-white/10">
            <Sparkles className="w-5 h-5 text-[var(--primary)]" />
            <span className="text-sm font-semibold text-white uppercase tracking-wider">
              Our Premium Services
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Exceptional
            <span className="text-[var(--primary)]"> Experiences</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            From luxury event planning to fine dining cuisine, we deliver
            professional service with premium quality and attention to detail.
          </p>
        </div>

        {/* Services Grid - Display All */}
        <div className="space-y-20">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Content Section */}
              <div
                className={`space-y-8 ${
                  index % 2 === 1 ? "lg:col-start-2" : ""
                }`}
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-6">
                    <service.icon className="w-5 h-5 text-[var(--primary)]" />
                    <span className="text-sm font-medium text-white">
                      {service.subtitle}
                    </span>
                  </div>

                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="w-2 h-2 rounded-full bg-[var(--primary)] flex-shrink-0"></div>
                      <span className="text-white text-sm font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Statistics */}
                <div className="flex items-center gap-6">
                  <div className="text-center p-6 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <div className="text-3xl font-bold text-[var(--primary)] mb-1">
                      {service.stats.number}
                    </div>
                    <div className="text-sm text-gray-400 font-medium">
                      {service.stats.label}
                    </div>
                  </div>

                  <div className="text-center p-6 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <div className="text-3xl font-bold text-white mb-1">
                      24/7
                    </div>
                    <div className="text-sm text-gray-400 font-medium">
                      Service
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Section */}
              <div
                className={`relative rounded-3xl overflow-hidden group ${
                  index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                }`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[500px] object-cover transform transition-transform duration-700 group-hover:scale-110"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Rating Badge */}
                <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center">
                  <Star className="w-6 h-6 text-[var(--primary)] mx-auto mb-1" />
                  <div className="text-white font-bold text-sm">4.9</div>
                </div>

                {/* Premium Badge */}
                <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center">
                  <Award className="w-6 h-6 text-[var(--primary)] mx-auto mb-1" />
                  <div className="text-white font-bold text-sm">Premium</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryDisplay;
