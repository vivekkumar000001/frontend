import React, { useState, useRef } from 'react';
import { FaGem, FaShieldAlt, FaMobileAlt, FaTimes, FaGamepad, FaDice, FaChessRook, FaCrown } from 'react-icons/fa';
import { motion } from 'framer-motion';

// ✅ VIDEO IMPORT LOCATION - Replace with your actual video file
import sampleVideo from '../assets/new.mp4'; // 👈 YOUR VIDEO GOES HERE

const Home = () => {
  const [showVideoBox, setShowVideoBox] = useState(true);
  const videoRef = useRef(null);

  const handleCloseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setShowVideoBox(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white py-6 px-4 sm:px-6">
      {/* Video Section at the top */}
      {showVideoBox && (
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] p-4 rounded-2xl mb-8 border border-cyan-500/30 shadow-xl shadow-cyan-500/10 relative max-w-4xl mx-auto"
        >
          <div className="absolute top-4 right-4 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCloseVideo}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
            >
              <FaTimes size={16} />
            </motion.button>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to Game Hub
          </h2>

          {/* ✅ VIDEO PLAYER - Your video displays here */}
          <div className="relative rounded-xl overflow-hidden">
            <video 
              ref={videoRef}
              src={sampleVideo} // 👈 YOUR VIDEO IS USED HERE
              controls
              autoPlay
              muted
              className="w-full h-auto rounded-xl border border-gray-700"
              style={{ maxHeight: '70vh' }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto mb-12">
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-bold text-3xl sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
          >
            Ultimate Gaming Experience
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Discover hundreds of games, compete with players worldwide, and unlock exclusive rewards!
          </motion.p>
        </div>

        {/* Game Categories - Mobile responsive grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-4xl mx-auto"
        >
          {gameTypes.map((game, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl p-3 text-center border border-cyan-500/30 shadow-lg shadow-cyan-500/10 cursor-pointer"
            >
              <div className="mx-auto mb-2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center">
                {game.icon}
              </div>
              <span className="font-medium text-xs sm:text-sm">{game.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto mb-16">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        >
          Why Choose Game Hub?
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (index * 0.2) }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-5 border border-cyan-500/30 shadow-xl shadow-cyan-500/10"
            >
              <div className="mb-4 flex justify-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-cyan-300 mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-300 text-sm text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Games Section - Mobile responsive */}
      <section className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        >
          Popular Games
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredGames.map((game, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + (index * 0.1) }}
              whileHover={{ y: -8 }}
              className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl overflow-hidden border border-cyan-500/30 shadow-xl shadow-cyan-500/10"
            >
              <div className="h-40 bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center">
                <div className="text-4xl">{game.icon}</div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-white">{game.name}</h3>
                  <span className="px-2 py-1 bg-cyan-600/30 text-cyan-300 rounded-full text-xs font-medium">
                    {game.category}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4">{game.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center text-xs">
                      4.8
                    </div>
                    <span className="ml-2 text-xs text-gray-400">Rating</span>
                  </div>
                  <button className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity">
                    Play Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Special Offer Banner - Mobile optimized */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        className="max-w-4xl mx-auto mt-12 mb-8 p-5 rounded-2xl bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-cyan-500/30 shadow-xl shadow-cyan-500/10 relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-cyan-500/20 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-purple-500/20 blur-3xl"></div>
        
        <div className="relative z-10 text-center">
          <div className="inline-block mb-3 px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full text-xs font-bold">
            LIMITED TIME OFFER
          </div>
          <h3 className="text-xl font-bold mb-2">Get 200 Bonus Coins!</h3>
          <p className="text-gray-300 text-sm max-w-md mx-auto mb-4">
            Sign up today and receive 200 bonus coins to start playing immediately
          </p>
          <button className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-700 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-amber-500/20 text-sm">
            Claim Your Bonus
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const features = [
  {
    icon: <FaCrown className="text-amber-300 text-2xl" />,
    title: 'Exclusive Rewards',
    description: 'Earn special rewards and bonuses as you play and level up your account'
  },
  {
    icon: <FaShieldAlt className="text-cyan-300 text-2xl" />,
    title: 'Secure Gaming',
    description: 'Bank-level security to protect your data and ensure fair gameplay'
  },
  {
    icon: <FaMobileAlt className="text-purple-300 text-2xl" />,
    title: 'Play Anywhere',
    description: 'Seamless experience across all your devices with cloud saving'
  }
];

const gameTypes = [
  { name: 'Action', icon: <FaGamepad className="text-lg" /> },
  { name: 'Adventure', icon: <FaDice className="text-lg" /> },
  { name: 'Strategy', icon: <FaChessRook className="text-lg" /> },
  { name: 'Puzzle', icon: <span className="text-lg">🧩</span> },
  { name: 'Sports', icon: <span className="text-lg">⚽</span> },
  { name: 'Racing', icon: <span className="text-lg">🏎️</span> }
];

const featuredGames = [
  {
    name: 'Mystic Quest',
    icon: <span>⚔️</span>,
    category: 'Adventure',
    description: 'Embark on an epic journey through magical realms'
  },
  {
    name: 'Neon Racer',
    icon: <span>🏁</span>,
    category: 'Racing',
    description: 'High-speed futuristic racing with stunning visuals'
  },
  {
    name: 'Kingdom Chess',
    icon: <span>♚</span>,
    category: 'Strategy',
    description: 'Classic chess with fantasy-themed pieces'
  }
];

export default Home;
