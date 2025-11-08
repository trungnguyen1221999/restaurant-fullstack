import heroImg from "@/assets/hero.jpg";
import line2 from "@/assets/line2.png";
import {
  ChefHat,
  Star,
  Calendar,
  MapPin,
  Phone,
  Clock,
  ArrowDown,
  Sparkles,
} from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={heroImg}
          alt="Restaurant food"
          className="absolute inset-0 w-full h-full object-cover scale-110 animate-pulse"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60"></div>
      </div>

      {/* Floating Icons Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ChefHat
          className="absolute top-20 left-10 w-8 h-8 text-primary/30 animate-bounce"
          style={{ animationDelay: "0s" }}
        />
        <Star
          className="absolute top-32 right-16 w-6 h-6 text-primary/40 animate-bounce"
          style={{ animationDelay: "1s" }}
        />
        <Sparkles
          className="absolute bottom-40 left-20 w-7 h-7 text-primary/25 animate-bounce"
          style={{ animationDelay: "2s" }}
        />
        <Star
          className="absolute bottom-60 right-24 w-5 h-5 text-primary/35 animate-bounce"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mt-10 mb-6">
          <Star className="w-4 h-4 text-primary fill-current" />
          <span className="text-white text-sm font-medium">
            Premium Dining Experience
          </span>
          <Star className="w-4 h-4 text-primary fill-current" />
        </div>

        {/* Main Title */}
        <div className="mb-6">
          <h1 className="text-primary font-bold text-4xl md:text-7xl lg:text-8xl mb-4 tracking-wide">
            KAI
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-primary"></div>
            <ChefHat className="w-8 h-8 text-primary" />
            <h2 className="text-white font-light text-xl md:text-2xl tracking-widest">
              RESTAURANT
            </h2>
            <ChefHat className="w-8 h-8 text-primary" />
            <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-primary"></div>
          </div>
          <img
            src={line2}
            alt="Decoration line"
            className="mx-auto opacity-80"
          />
        </div>

        {/* Subtitle */}
        <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed font-light">
          Savor a journey where{" "}
          <span className="text-primary font-medium">classic recipes</span> meet
          <span className="text-primary font-medium"> modern creativity</span>,
          delivering unforgettable taste in every bite.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          <div className="flex items-center gap-2 text-white/80">
            <Star className="w-5 h-5 text-primary fill-current" />
            <span className="font-semibold">4.9</span>
            <span className="text-sm">(2.5k reviews)</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-sm">Open 10AM - 11PM</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-sm">Downtown Location</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#book"
            className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:scale-105 flex items-center gap-2"
          >
            <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Book a Table
          </a>

          <a
            href="#menu"
            className="group bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 flex items-center gap-2"
          >
            <ChefHat className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            View Menu
          </a>

          <a
            href="tel:+123456789"
            className="group bg-black/40 backdrop-blur-sm border border-white/20 text-white hover:border-primary hover:text-primary font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2"
          >
            <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Call Now
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce translate-y-5 ">
        <ArrowDown className="w-6 h-6 text-primary" />
      </div>
    </section>
  );
};

export default Hero;
