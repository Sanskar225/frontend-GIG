import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Mail, Github, Linkedin, Twitter, Sparkles, Shield, Zap, Users } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-950 to-gray-900 text-gray-300">
      {/* Trust & Value Banner */}
      <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-y border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Shield className="text-white" size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">TRUSTWORTHY</h4>
                <p className="text-sm text-gray-400">Secure & Reliable Freelance Platform</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span className="font-medium">Fast Matching</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span className="font-medium">Quality Work</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-cyan-400" />
                <span className="font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Brand Section - Takes more space */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Briefcase className="text-white" size={28} />
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  GigFlow
                </span>
                <p className="text-cyan-400 font-medium mt-1">Freelance Marketplace</p>
              </div>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Where top-tier talent meets ambitious projects. We're building the future of work through seamless connections and intelligent automation.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 pt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 group"
              >
                <Github size={22} className="group-hover:text-white group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 hover:bg-blue-600 rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group"
              >
                <Linkedin size={22} className="group-hover:text-white group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 hover:bg-cyan-500 rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 group"
              >
                <Twitter size={22} className="group-hover:text-white group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* For Clients */}
              <div>
                <h3 className="text-white font-bold text-xl mb-6 pb-3 border-b border-gray-800">
                  For <span className="text-cyan-400">Clients</span>
                </h3>
                <ul className="space-y-4">
                  {[
                    { to: "/gigs/create", label: "Post a Gig", desc: "Launch your project" },
                    { to: "/my-gigs", label: "My Gigs", desc: "Manage active projects" },
                    { to: "/dashboard", label: "Dashboard", desc: "Analytics & insights" },
                  ].map((item) => (
                    <li key={item.to}>
                      <Link 
                        to={item.to} 
                        className="group flex items-start space-x-3 p-3 hover:bg-gray-800/50 rounded-xl transition-all duration-300"
                      >
                        <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                        <div>
                          <span className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                            {item.label}
                          </span>
                          <p className="text-sm text-gray-500 group-hover:text-gray-400">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* For Freelancers */}
              <div>
                <h3 className="text-white font-bold text-xl mb-6 pb-3 border-b border-gray-800">
                  For <span className="text-cyan-400">Freelancers</span>
                </h3>
                <ul className="space-y-4">
                  {[
                    { to: "/gigs", label: "Find Work", desc: "Browse opportunities" },
                    { to: "/my-bids", label: "My Bids", desc: "Track proposals" },
                    { to: "/dashboard", label: "Dashboard", desc: "Performance metrics" },
                  ].map((item) => (
                    <li key={item.to}>
                      <Link 
                        to={item.to} 
                        className="group flex items-start space-x-3 p-3 hover:bg-gray-800/50 rounded-xl transition-all duration-300"
                      >
                        <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                        <div>
                          <span className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                            {item.label}
                          </span>
                          <p className="text-sm text-gray-500 group-hover:text-gray-400">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-white font-bold text-xl mb-6 pb-3 border-b border-gray-800">
                  <span className="text-cyan-400">Company</span>
                </h3>
                <ul className="space-y-4">
                  {[
                    { href: "#", label: "About Us", desc: "Our mission & vision" },
                    { href: "#", label: "Contact", desc: "Get in touch" },
                    { href: "#", label: "Privacy Policy", desc: "Your data security" },
                    { href: "#", label: "Terms of Service", desc: "Platform guidelines" },
                  ].map((item) => (
                    <li key={item.label}>
                      <a 
                        href={item.href} 
                        className="group flex items-start space-x-3 p-3 hover:bg-gray-800/50 rounded-xl transition-all duration-300"
                      >
                        <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 group-hover:bg-cyan-500 group-hover:scale-150 transition-transform"></div>
                        <div>
                          <span className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                            {item.label}
                          </span>
                          <p className="text-sm text-gray-500 group-hover:text-gray-400">
                            {item.desc}
                          </p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-6">
              <p className="text-gray-500">
                © {currentYear} <span className="text-cyan-400 font-medium">GigFlow</span>. All rights reserved.
              </p>
              <div className="hidden md:flex items-center space-x-4 text-sm text-gray-500">
                <span>•</span>
                <span>Innovating freelance work</span>
                <span>•</span>
                <span>Driving digital transformation</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 bg-gray-800/50 px-6 py-3 rounded-xl">
              <Mail size={18} className="text-cyan-400" />
              <div>
                <p className="text-sm text-gray-400">Need help?</p>
                <a 
                  href="mailto:support@gigflow.com" 
                  className="text-white font-medium hover:text-cyan-300 transition-colors"
                >
                  support@gigflow.com
                </a>
              </div>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-gray-800">
            {[
              "Secure Payments",
              "Verified Talent",
              "Escrow Protection",
              "GDPR Compliant",
            ].map((badge) => (
              <div 
                key={badge} 
                className="px-4 py-2 bg-gray-800/30 rounded-lg border border-gray-700 text-sm text-gray-400 hover:border-cyan-500/30 hover:text-cyan-300 transition-all"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};