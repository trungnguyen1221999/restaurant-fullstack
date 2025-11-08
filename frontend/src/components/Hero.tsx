import heroImg from "@/assets/hero.jpg";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full h-[95vh] flex items-center justify-center text-center overflow-hidden"
    >
      {/* Background Image */}
      <img
        src={heroImg}
        alt="Restaurant food"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />

      {/* Overlay Content */}
      <div className="relative z-10 max-w-2xl px-6">
        <h1 className="text-primary font-bold text-2xl md:text-4xl mb-4">
          Welcome to Kai Restaurant
        </h1>

        <h2 className="text-secondary text-lg md:text-xl mb-8">
          Savor a journey where classic recipes meet modern creativity,
          delivering unforgettable taste in every bite.
        </h2>

        <a
          href="#book"
          className="bg-primary text-primary-foreground font-medium px-6 py-3 rounded-md hover:opacity-90 transition"
        >
          Book a Table
        </a>
      </div>
    </section>
  );
};

export default Hero;
