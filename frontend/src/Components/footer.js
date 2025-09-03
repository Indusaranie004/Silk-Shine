import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-secondary-foreground font-bold text-sm">S&S</span>
              </div>
              <span className="font-bold text-xl">Silk&Shine</span>
            </div>
            <p className="text-muted mb-4 max-w-md">
              Experience luxury and elegance at Silk&Shine Salon. Our expert stylists are dedicated to bringing out your
              natural beauty with premium services and personalized care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-muted hover:text-accent transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="text-muted hover:text-accent transition-colors duration-200">
                  Services
                </a>
              </li>
              <li>
                <a href="/bookings" className="text-muted hover:text-accent transition-colors duration-200">
                  Book Appointment
                </a>
              </li>
              <li>
                <a href="/contact" className="text-muted hover:text-accent transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-muted">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-muted">info@silkshine.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-muted">123 Beauty Street, City, State 12345</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-muted">© 2024 Silk&Shine Salon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}