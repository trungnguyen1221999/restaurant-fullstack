import { useState, useEffect } from "react";
import {
  Menu,
  Calendar,
  Phone,
  ChefHat,
  X,
  MapPin,
  Clock,
  Star,
  ShoppingCart,
  Settings,
} from "lucide-react";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-primary/20 shadow-xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <ChefHat className="w-8 h-8 text-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            </div>
            <a href="#home" className="group">
              <h2 className="text-primary font-bold text-2xl tracking-wide group-hover:scale-105 transition-transform duration-300">
                KAI
              </h2>
              <p className="text-white/60 text-xs tracking-widest -mt-1">
                RESTAURANT
              </p>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Navigation Links */}
            <ul className="flex items-center gap-6">
              {[
                { icon: Menu, label: "Menu", href: "#menu" },
                { icon: Calendar, label: "Reservations", href: "#book" },
                { icon: Phone, label: "Contact", href: "#contact" },
                { icon: Settings, label: "Admin", href: "/admin" },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className={`group flex items-center gap-2 transition-all duration-300 font-medium ${
                      item.label === "Admin"
                        ? "text-primary/80 hover:text-primary"
                        : "text-white/80 hover:text-primary"
                    }`}
                  >
                    <item.icon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Quick Info */}
              <div className="hidden xl:flex items-center gap-4 text-white/60 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>10AM - 11PM</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-primary fill-current" />
                  <span>4.9 Rating</span>
                </div>
              </div>

              {/* Cart Button */}
              <button className="relative p-2 rounded-full bg-black/40 backdrop-blur-sm border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* CTA Button */}
              <a
                href="#book"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
              >
                Reserve Now
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-black/40 backdrop-blur-sm border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-500 overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl border border-primary/20 p-6">
            {/* Mobile Navigation Links */}
            <ul className="space-y-4 mb-6">
              {[
                { icon: Menu, label: "Menu", href: "#menu" },
                { icon: Calendar, label: "Reservations", href: "#book" },
                { icon: Phone, label: "Contact", href: "#contact" },
                { icon: Settings, label: "Admin", href: "/admin" },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 transition-colors duration-300 font-medium py-2 ${
                      item.label === "Admin"
                        ? "text-primary/80 hover:text-primary"
                        : "text-white hover:text-primary"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                    {item.label === "Admin" && (
                      <span className="ml-auto bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Quick Info */}
            <div className="border-t border-primary/20 pt-4 space-y-3 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Open: 10AM - 11PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Downtown Location</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-primary fill-current" />
                <span>4.9 Rating (2.5k reviews)</span>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="mt-6 space-y-3">
              <a
                href="#book"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Reserve Table
              </a>
              <a
                href="tel:+123456789"
                className="w-full bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
