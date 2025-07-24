import React, { useState } from 'react';
import { FaGem, FaShieldAlt, FaMobileAlt, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

// ✅ Correct video import
import sampleVideo from '../assets/new.mp4'; // Make sure this is a valid video file

const Home = () => {
  const [showVideoBox, setShowVideoBox] = useState(true);

  return (
    <div className="py-8 px-4 md:px-10">
      {/* Hero Section */}
      <section
        className="relative rounded-2xl overflow-hidden mb-10 bg-cover bg-center min-h-screen"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1542751110-97427bbecf20?ixlib=rb-4.0.0')`
        }}
      >
        <div className="max-w-4xl mx-auto py-20 px-4 text-center h-full flex flex-col justify-center items-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-['Orbitron'] font-extrabold text-3xl sm:text-4xl md:text-5xl text-yellow-400 uppercase tracking-wider mb-6"
          >
            Experience the Thrill of Dragon Tiger
          </motion.h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-10 max-w-2xl">
            Join the ultimate casino experience with fast-paced action, big wins, and exclusive bonuses. New players get ₹100 bonus on signup!
          </p>

          <motion.a
            href="/Login"
            whileHover={{ y: -3 }}
            className="inline-block bg-gradient-to-r from-orange-500 to-orange-700 text-white py-2 px-5 sm:px-6 md:px-8 rounded-full font-semibold text-sm sm:text-base uppercase tracking-wide shadow-md hover:shadow-orange-500/50 transition-all"
          >
            Start Playing Now
          </motion.a>
        </div>
      </section>

      {/* ✅ Admin-Uploaded Video Box (user can only view) */}
      {showVideoBox && (
        <div className="bg-[#1f2937] p-6 rounded-xl mb-10 border border-yellow-400 relative max-w-3xl mx-auto">
          <button
            onClick={() => setShowVideoBox(false)}
            className="absolute top-2 right-2 text-yellow-400 hover:text-red-500"
          >
            <FaTimes size={20} />
          </button>

          <h2 className="text-xl font-bold text-yellow-400 mb-4">Watch How to Play</h2>

          <video
            src={sampleVideo}
            controls
            className="rounded-lg w-full max-h-[400px] border border-gray-600"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8 }}
            className="bg-[rgba(45,50,67,0.7)] rounded-xl p-6 text-center border border-yellow-400/20 hover:border-yellow-400 transition-all"
          >
            <div className="text-yellow-400 mb-5 flex justify-center">{feature.icon}</div>
            <h3 className="text-lg md:text-xl font-bold text-orange-500 mb-2">{feature.title}</h3>
            <p className="text-gray-300 text-sm md:text-base">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const features = [
  {
    icon: <FaGem size={40} />,
    title: '₹100 Welcome Bonus',
    description: 'New players receive a ₹100 bonus immediately after registration. No deposit required!'
  },
  {
    icon: <FaShieldAlt size={40} />,
    title: 'Secure & Fair Gaming',
    description: 'Our games are provably fair and use certified RNG technology to ensure fairness.'
  },
  {
    icon: <FaMobileAlt size={40} />,
    title: 'Play Anywhere',
    description: 'Fully responsive design works perfectly on desktop, tablet, and mobile devices.'
  }
];

export default Home;
