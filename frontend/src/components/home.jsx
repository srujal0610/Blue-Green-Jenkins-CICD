import React, { useState, useEffect } from "react";
// import React from 'react';
import { Building2, Phone, Mail, Users, Briefcase, Star, ChevronRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from "react-router-dom"; // Assuming you're using React Router

function Home() {
  
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);

  
    // useEffect(() => {
    //   // Check if user is authenticated (Example: stored in localStorage)
    //   const token = sessionStorage.getItem("isAuthenticated"); // Adjust as per your auth mechanism
    //   console.log(token)
    //   setIsAuthenticated(!!token); // Convert to boolean
    // }, []);
    useEffect(() => {
      const token = sessionStorage.getItem("isAuthenticated");
      const userRole = sessionStorage.getItem("role");
    
      console.log("Token:", token);  // Check if token is set
      console.log("Role:", userRole); // Check what role is stored
    
      setIsAuthenticated(!!token);
      setRole(userRole || "guest"); 
    }, []);
    
    
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar*/}
      <nav className="fixed w-full z-10 backdrop-blur-lg bg-black/50 border-b border-zinc-800/50 transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Building2 className="h-8 w-8 text-sky-400" />
          <span className="ml-2 text-xl font-bold">DiamondLabor</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <Link to="#about" className="hover:text-sky-400 transition-colors duration-300">About</Link>
          <Link to="#testimonials" className="hover:text-sky-400 transition-colors duration-300">Testimonials</Link>
          <Link to="#contact" className="hover:text-sky-400 transition-colors duration-300">Contact</Link>
          {!isAuthenticated && (
            <Link to="/login" className="hover:text-sky-400 transition-colors duration-300">Login</Link>
          )}
          {isAuthenticated ? (
  <>
    {role === "manager" && (
      <>
        <Link to="/manager" className="hover:text-sky-400 transition-colors duration-300">Manager</Link>
        <Link to="/addworker" className="hover:text-sky-400 transition-colors duration-300">Add Worker</Link>
        <Link to="/register" className="hover:text-sky-400 transition-colors duration-300">Register</Link>
      </>
    )}
    
    {role === "worker" && (
      <>
        <Link to="/worker" className="hover:text-sky-400 transition-colors duration-300">Worker</Link>
      </>
    )}

    <button
      onClick={() => {
        sessionStorage.removeItem("isAuthenticated");
        sessionStorage.removeItem("role");
        setIsAuthenticated(false);
        setRole(null);
      }}
      className="hover:text-red-400 transition-colors duration-300"
    >
      Logout
    </button>
  </>
) : (
   <Link to="/login" className="hover:text-sky-400 transition-colors duration-300"></Link>
)}


        </div>
      </div>
    </nav> 
    
      {/* Hero Section */}
      <section id="home" className="pt-24 pb-12 px-6 bg-gradient-to-b from-black to-zinc-950">
        <div className="container mx-auto text-center">
          {/* <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-500 hover:scale-105 transform">
            Professional Labor Management Solutions
          </h1> */}
          
          <h1 className="text-5xl font-bold mb-6 text-transparent bg-gradient-to-r from-green-400 to-green-600 bg-clip-text" style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              This is Green Version - Professional Labor Management Solutions
        </h1>
 

          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Streamline your workforce management with our comprehensive solutions
          </p>
          <button className="bg-sky-500 hover:bg-sky-400 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/20">
            Get Started
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 backdrop-blur-xl bg-black/30 border-y border-zinc-800/50">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          <div className="transform transition-all duration-300 hover:scale-105">
            <p className="text-4xl font-bold text-sky-400">500+</p>
            <p className="text-zinc-400">Clients Served</p>
          </div>
          <div className="transform transition-all duration-300 hover:scale-105">
            <p className="text-4xl font-bold text-sky-400">10k+</p>
            <p className="text-zinc-400">Workers Placed</p>
          </div>
          <div className="transform transition-all duration-300 hover:scale-105">
            <p className="text-4xl font-bold text-sky-400">98%</p>
            <p className="text-zinc-400">Satisfaction Rate</p>
          </div>
          <div className="transform transition-all duration-300 hover:scale-105">
            <p className="text-4xl font-bold text-sky-400">15+</p>
            <p className="text-zinc-400">Years Experience</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 bg-black">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">About Us</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="transform transition-all duration-500 hover:scale-[1.02]">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Team working" 
                className="rounded-lg shadow-2xl border border-zinc-800/50 hover:shadow-sky-500/10"
              />
            </div>
            <div className="backdrop-blur-sm bg-black/20 p-8 rounded-lg border border-zinc-800/50">
              <h3 className="text-2xl font-semibold mb-4">Excellence in Labor Management</h3>
              <p className="text-zinc-400 mb-6">
                With over 15 years of experience, we've been at the forefront of revolutionizing 
                how businesses manage their workforce. Our commitment to excellence and innovation 
                has made us a trusted partner for organizations across the globe.
              </p>
              <button className="flex items-center text-sky-400 hover:text-sky-300 transition-colors duration-300">
                Learn More <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-6 backdrop-blur-xl bg-black/30 border-y border-zinc-800/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="backdrop-blur-lg bg-black/40 p-6 rounded-lg border border-zinc-800/50 transition-all duration-300 hover:transform hover:scale-105">
                <Star className="h-8 w-8 text-sky-400 mb-4" />
                <p className="text-zinc-400 mb-4">
                  "DiamondLabor has transformed how we manage our workforce. Their solutions are 
                  innovative and their support is outstanding."
                </p>
                <div className="flex items-center">
                  <img 
                    src={`https://images.unsplash.com/photo-${1500000000000 + i}?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80`}
                    alt="Client" 
                    className="h-12 w-12 rounded-full border border-zinc-800/50"
                  />
                  <div className="ml-4">
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-zinc-500">CEO, Tech Corp</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6 bg-black">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="backdrop-blur-sm bg-black/20 p-8 rounded-lg border border-zinc-800/50">
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center transition-transform duration-300 hover:translate-x-2">
                  <Phone className="h-6 w-6 text-sky-400 mr-4" />
                  <p>+1 (555) 123-4567</p>
                </div>
                <div className="flex items-center transition-transform duration-300 hover:translate-x-2">
                  <Mail className="h-6 w-6 text-sky-400 mr-4" />
                  <p>contact@diamondlabor.com</p>
                </div>
                <div className="flex items-center transition-transform duration-300 hover:translate-x-2">
                  <Building2 className="h-6 w-6 text-sky-400 mr-4" />
                  <p>123 Business Ave, Suite 100<br />New York, NY 10001</p>
                </div>
              </div>
            </div>
            <div className="backdrop-blur-lg bg-black/40 p-6 rounded-lg border border-zinc-800/50">
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full p-3 bg-black/50 rounded border border-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full p-3 bg-black/50 rounded border border-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                />
                <textarea 
                  placeholder="Your Message" 
                  rows={4}
                  className="w-full p-3 bg-black/50 rounded border border-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                ></textarea>
                <button className="w-full bg-sky-500 hover:bg-sky-400 text-white px-6 py-3 rounded transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/20">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="backdrop-blur-xl bg-black/30 py-12 px-6 border-t border-zinc-800/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Building2 className="h-8 w-8 text-sky-400" />
                <span className="ml-2 text-xl font-bold">DiamondLabor</span>
              </div>
              <p className="text-zinc-400">
                Professional labor management solutions for modern businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-zinc-400">
                <li><a href="#about" className="hover:text-sky-400 transition-colors duration-300">About Us</a></li>
                <li><a href="#services" className="hover:text-sky-400 transition-colors duration-300">Services</a></li>
                <li><a href="#contact" className="hover:text-sky-400 transition-colors duration-300">Contact</a></li>
                <li><a href="#careers" className="hover:text-sky-400 transition-colors duration-300">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-zinc-400">
                <li>Workforce Management</li>
                <li>Recruitment Solutions</li>
                <li>HR Consulting</li>
                <li>Training Programs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-zinc-400 hover:text-sky-400 transition-colors duration-300">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-zinc-400 hover:text-sky-400 transition-colors duration-300">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-zinc-400 hover:text-sky-400 transition-colors duration-300">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-zinc-400 hover:text-sky-400 transition-colors duration-300">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800/50 mt-8 pt-8 text-center text-zinc-400">
            <p>&copy; 2024 DiamondLabor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;


