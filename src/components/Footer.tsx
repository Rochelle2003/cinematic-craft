import { Link } from "react-router-dom";
import { Film, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
                <Film className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold bg-gradient-gold bg-clip-text text-transparent">
                CineVault
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Jouw premium bestemming voor de beste films. Ontdek, bekijk en deel je favoriete cinematische ervaringen.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigatie</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-muted-foreground hover:text-primary transition-colors">
                  Films
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-muted-foreground hover:text-primary transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Genres */}
          <div>
            <h3 className="font-semibold mb-4">Genres</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Action
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Drama
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Comedy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Thriller
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Sci-Fi
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">contact@cinevault.nl</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+31 20 123 4567</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  Filmstraat 123<br />
                  1000 AB Amsterdam
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} CineVault. Alle rechten voorbehouden.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};