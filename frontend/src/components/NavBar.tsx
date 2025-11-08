const NavBar = () => {
  return (
    <nav className="w-full border-b border-border bg-background text-foreground fixed top-0 left-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h2 className="text-primary font-bold text-2xl tracking-wide">
          <a href="#home">Kai Restaurant</a>
        </h2>

        {/* Navigation Links */}
        <ul className="flex items-center gap-8 text-secondary text-lg font-semibold">
          <li className="hover:text-primary transition-colors cursor-pointer">
           <a href="#menu"> Menu</a>
          </li>
          <li className="hover:text-primary transition-colors cursor-pointer">
           <a href="#book"> Book a Table</a>
          </li>
          <li className="hover:text-primary transition-colors cursor-pointer">
           <a href="#contact"> Contact</a>
          </li>
        </ul>

      </div>
    </nav>
  );
};


export default NavBar;
