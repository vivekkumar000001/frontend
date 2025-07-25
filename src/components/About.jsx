import React, { useState, useEffect } from 'react';
import { 
  FaUserPlus, FaSignInAlt, FaGamepad, FaMoneyBillWave, 
  FaWallet, FaHeadset, FaShieldAlt, FaStar, FaArrowUp 
} from 'react-icons/fa';

const About = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full shadow-lg hover:from-cyan-500 hover:to-purple-500 transition-all duration-300 animate-bounce"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}

      {/* Hero Section */}
      <div className="relative py-20 px-4 text-center bg-gradient-to-r from-purple-900/40 to-cyan-900/40">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            About Game Hub
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your ultimate gaming destination with thousands of games, secure transactions, and 24/7 support
          </p>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-3xl mx-auto">
            <div className="bg-black/30 p-4 rounded-xl border border-cyan-500/30 backdrop-blur-sm">
              <div className="text-3xl font-bold text-cyan-300">500K+</div>
              <div className="text-sm">Active Players</div>
            </div>
            <div className="bg-black/30 p-4 rounded-xl border border-cyan-500/30 backdrop-blur-sm">
              <div className="text-3xl font-bold text-cyan-300">2,500+</div>
              <div className="text-sm">Games</div>
            </div>
            <div className="bg-black/30 p-4 rounded-xl border border-cyan-500/30 backdrop-blur-sm">
              <div className="text-3xl font-bold text-cyan-300">24/7</div>
              <div className="text-sm">Support</div>
            </div>
            <div className="bg-black/30 p-4 rounded-xl border border-cyan-500/30 backdrop-blur-sm">
              <div className="text-3xl font-bold text-cyan-300">₹10M+</div>
              <div className="text-sm">Daily Winnings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - About & Team */}
          <div className="lg:col-span-2">
            {/* About Section */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 md:p-8 mb-8 border border-cyan-500/30 shadow-xl shadow-cyan-500/10 transform transition-transform duration-300 hover:-translate-y-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-cyan-400 border-b border-cyan-500/30 pb-3">
                Welcome to Game Hub
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Founded in 2023, Game Hub has quickly become a leader in online gaming, offering thousands of exciting games to players worldwide. We're committed to delivering a secure, fair, and thrilling gaming experience for all players.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-[#0f172a] p-4 rounded-xl border border-cyan-500/20 transform transition-transform duration-300 hover:-translate-y-1">
                  <h3 className="text-xl font-bold text-cyan-300 mb-3 flex items-center">
                    <FaShieldAlt className="mr-2" /> Security First
                  </h3>
                  <p className="text-gray-300">
                    We use bank-grade encryption and provably fair technology to ensure your data and funds are always protected.
                  </p>
                </div>
                
                <div className="bg-[#0f172a] p-4 rounded-xl border border-cyan-500/20 transform transition-transform duration-300 hover:-translate-y-1">
                  <h3 className="text-xl font-bold text-cyan-300 mb-3 flex items-center">
                    <FaStar className="mr-2" /> Premium Experience
                  </h3>
                  <p className="text-gray-300">
                    Enjoy high-quality games with stunning graphics, seamless gameplay, and regular updates with new content.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Our Team Section */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 md:p-8 border border-cyan-500/30 shadow-xl shadow-cyan-500/10 transform transition-transform duration-300 hover:-translate-y-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-cyan-400 border-b border-cyan-500/30 pb-3">
                Our Team
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Our team of gaming experts, developers, and customer support professionals work tirelessly to ensure you have the best possible gaming experience.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {teamMembers.map((member, index) => (
                  <div 
                    key={index} 
                    className="text-center transform transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full mb-3 flex items-center justify-center text-xl">
                      {member.initials}
                    </div>
                    <h4 className="font-bold">{member.name}</h4>
                    <p className="text-sm text-cyan-300">{member.position}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Features */}
          <div>
            {/* Getting Started Section */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 md:p-8 mb-8 border border-cyan-500/30 shadow-xl shadow-cyan-500/10 transform transition-transform duration-300 hover:-translate-y-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-cyan-400 border-b border-cyan-500/30 pb-3">
                Getting Started
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-cyan-600 p-3 rounded-full mr-4">
                    <FaUserPlus className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cyan-300 mb-2">Sign Up</h3>
                    <p className="text-gray-300">
                      Create an account in seconds with just your email. Get a ₹100 welcome bonus instantly!
                    </p>
                    <button className="mt-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg text-sm font-medium hover:from-cyan-500 hover:to-purple-500 transition-all">
                      Create Account
                    </button>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-600 p-3 rounded-full mr-4">
                    <FaSignInAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cyan-300 mb-2">Login</h3>
                    <p className="text-gray-300">
                      Access your account securely with email or social login. Play anywhere, anytime.
                    </p>
                    <button className="mt-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg text-sm font-medium hover:from-cyan-500 hover:to-purple-500 transition-all">
                      Login Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Banking Section */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 md:p-8 mb-8 border border-cyan-500/30 shadow-xl shadow-cyan-500/10 transform transition-transform duration-300 hover:-translate-y-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-cyan-400 border-b border-cyan-500/30 pb-3">
                Banking
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-600 p-3 rounded-full mr-4">
                    <FaWallet className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cyan-300 mb-2">Deposit</h3>
                    <p className="text-gray-300">
                      Fund your account instantly using UPI, cards, or e-wallets. Min. deposit ₹500.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="bg-green-900/50 px-2 py-1 rounded text-xs">UPI</span>
                      <span className="bg-green-900/50 px-2 py-1 rounded text-xs">Cards</span>
                      <span className="bg-green-900/50 px-2 py-1 rounded text-xs">Paytm</span>
                      <span className="bg-green-900/50 px-2 py-1 rounded text-xs">PhonePe</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-yellow-600 p-3 rounded-full mr-4">
                    <FaMoneyBillWave className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cyan-300 mb-2">Withdrawal</h3>
                    <p className="text-gray-300">
                      Withdraw your winnings quickly. Processed within 24 hours. Min. withdrawal ₹1000.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Support Section */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 md:p-8 border border-cyan-500/30 shadow-xl shadow-cyan-500/10 transform transition-transform duration-300 hover:-translate-y-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-cyan-400 border-b border-cyan-500/30 pb-3">
                Support & Contact
              </h2>
              
              <div className="flex items-start">
                <div className="bg-cyan-600 p-3 rounded-full mr-4">
                  <FaHeadset className="text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-cyan-300 mb-2">24/7 Support</h3>
                  <p className="text-gray-300 mb-4">
                    Our support team is available around the clock to assist you with any questions or issues.
                  </p>
                  <div className="space-y-2">
                    <p className="flex items-center">
                      <span className="font-medium w-20">Email:</span>
                      <span>support@gamehub.com</span>
                    </p>
                    <p className="flex items-center">
                      <span className="font-medium w-20">Live Chat:</span>
                      <span>Available on website</span>
                    </p>
                    <p className="flex items-center">
                      <span className="font-medium w-20">Phone:</span>
                      <span>+91 98765 43210</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Game Categories Section */}
        <div className="mt-12 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 md:p-8 border border-cyan-500/30 shadow-xl shadow-cyan-500/10 transform transition-transform duration-300 hover:-translate-y-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-cyan-400 text-center">
            Explore Our Game Categories
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {gameCategories.map((category, index) => (
              <div 
                key={index} 
                className="bg-[#0f172a] p-4 rounded-xl border border-cyan-500/20 text-center hover:border-cyan-400 transition-all transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className="font-medium">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
        
        {/* How to Play Section */}
        <div className="mt-12 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 md:p-8 border border-cyan-500/30 shadow-xl shadow-cyan-500/10 transform transition-transform duration-300 hover:-translate-y-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-cyan-400 border-b border-cyan-500/30 pb-3">
            How to Play Games
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-cyan-300 mb-4 flex items-center">
                <FaGamepad className="mr-2" /> Getting Started
              </h3>
              <ol className="list-decimal pl-6 text-gray-300 space-y-3">
                <li>Create your free Game Hub account</li>
                <li>Make your first deposit to receive bonus funds</li>
                <li>Browse our game library by category or popularity</li>
                <li>Click on any game to start playing instantly</li>
                <li>Use practice mode to learn new games risk-free</li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-cyan-300 mb-4">Tips for Success</h3>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start">
                  <span className="bg-cyan-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                  Start with lower stakes until you're comfortable
                </li>
                <li className="flex items-start">
                  <span className="bg-cyan-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                  Set a budget before playing and stick to it
                </li>
                <li className="flex items-start">
                  <span className="bg-cyan-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                  Take advantage of daily bonuses and promotions
                </li>
                <li className="flex items-start">
                  <span className="bg-cyan-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                  Use the game guides to learn strategies
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="mt-12 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 md:p-8 border border-cyan-500/30 shadow-xl shadow-cyan-500/10">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-cyan-400 text-center">
            What Players Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-[#0f172a] p-6 rounded-xl border border-cyan-500/20 transform transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 mr-4"></div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < testimonial.rating ? "text-yellow-400" : "text-gray-600"} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-cyan-900 mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Game Hub</h3>
              <p className="text-gray-400">
                The ultimate gaming destination with thousands of games and exciting rewards.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-300 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Games</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Promotions</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Tournaments</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-300 mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Responsible Gaming</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-300 mb-4">Download App</h4>
              <div className="flex space-x-4">
                <button className="bg-black/30 p-3 rounded-lg border border-cyan-500/30 hover:bg-cyan-900/50 transition-colors">
                  <div className="text-xs">Download on the</div>
                  <div className="font-bold">App Store</div>
                </button>
                <button className="bg-black/30 p-3 rounded-lg border border-cyan-500/30 hover:bg-cyan-900/50 transition-colors">
                  <div className="text-xs">GET IT ON</div>
                  <div className="font-bold">Google Play</div>
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-cyan-900 mt-8 pt-6 text-center text-gray-500">
            <p>© 2023 Game Hub. All rights reserved. For players 18+ only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const teamMembers = [
  { name: "Raj Sharma", position: "CEO", initials: "RS" },
  { name: "Priya Patel", position: "CTO", initials: "PP" },
  { name: "Arjun Singh", position: "Game Dev", initials: "AS" },
  { name: "Meera Desai", position: "Support Lead", initials: "MD" },
  { name: "Vikram Rao", position: "Security", initials: "VR" },
  { name: "Ananya Reddy", position: "Marketing", initials: "AR" }
];

const gameCategories = [
  { name: "Slots", icon: "🎰" },
  { name: "Card Games", icon: "🃏" },
  { name: "Roulette", icon: "🎡" },
  { name: "Live Casino", icon: "🎥" },
  { name: "Puzzle", icon: "🧩" },
  { name: "Sports", icon: "⚽" },
  { name: "Racing", icon: "🏎️" },
  { name: "Arcade", icon: "🕹️" },
  { name: "Adventure", icon: "🗺️" },
  { name: "Strategy", icon: "♟️" },
  { name: "Lottery", icon: "🎫" },
  { name: "Jackpots", icon: "💰" }
];

const testimonials = [
  {
    name: "Amit K.",
    rating: 5,
    text: "Won ₹50,000 on my first week! The withdrawal process was super smooth. Highly recommend!"
  },
  {
    name: "Priya R.",
    rating: 4,
    text: "Love the variety of games. Customer support helped me quickly when I had an issue with my deposit."
  },
  {
    name: "Vikram S.",
    rating: 5,
    text: "Best gaming platform I've used. The live casino experience is incredible and the bonuses are generous."
  }
];

export default About;
