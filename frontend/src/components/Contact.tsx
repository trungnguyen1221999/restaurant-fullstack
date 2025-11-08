import { RESTAURANT_INFO } from "@/constants/bookingConstants";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  ChefHat,
  Github,
  Heart,
  Star,
} from "lucide-react";

const Contact = () => {
  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/trungnguyen1221999",
      label: "GitHub",
    },
  ];

  const quickLinks = [
    { name: "Menu", href: "#menu" },
    { name: "Reservations", href: "#book" },
    { name: "Contact", href: "#contact" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="bg-black/90 backdrop-blur-xl border-t border-primary/20"
    >
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ChefHat className="w-12 h-12 text-primary" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-primary tracking-wide">
                  KAI
                </h2>
                <p className="text-white/60 text-sm tracking-widest">
                  RESTAURANT
                </p>
              </div>
            </div>

            <p className="text-white/80 text-lg leading-relaxed max-w-md">
              Experience exceptional dining where classic recipes meet modern
              creativity, delivering unforgettable taste in every bite.
            </p>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-primary fill-current"
                    />
                  ))}
                </div>
                <span className="text-white font-semibold">
                  {RESTAURANT_INFO.rating}
                </span>
              </div>
              <span className="text-white/60">
                {RESTAURANT_INFO.reviewCount}
              </span>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <span className="text-white/80 font-medium">Follow Us:</span>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 rounded-full bg-black/40 border border-border/30 text-white/70 hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-2 h-2 bg-primary/50 rounded-full group-hover:bg-primary transition-colors duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              Contact Info
            </h3>
            <div className="space-y-4 text-white/70">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-white">Phone</p>
                  <p>{RESTAURANT_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-white">Email</p>
                  <p>{RESTAURANT_INFO.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-white">Location</p>
                  <p>{RESTAURANT_INFO.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-white">Hours</p>
                  <p>Mon - Sun: 10AM - 11PM</p>
                  <p className="text-sm text-white/50">
                    {RESTAURANT_INFO.bookingHours}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-white/60">
            <span>© {currentYear} KAI Restaurant. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2 text-white/60">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
            <span>by</span>
            <a
              href="https://github.com/trungnguyen1221999"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium transition-colors duration-300"
            >
              Kai - Trung Nguyen
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
