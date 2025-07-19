import React from 'react';
import bgImage from '../assets/drigon.jpg'; // 🔁 Make sure path is correct relative to this file

const About = () => {
  return (
    <div
      className="py-8 bg-cover bg-center bg-no-repeat min-h-screen"
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      <div className="bg-black/70 max-w-4xl mx-auto rounded-xl p-6 md:p-8 shadow-xl backdrop-blur-sm">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-orange-500 border-b border-gray-700 pb-3">
          About Dragon Tiger Casino
        </h2>

        <p className="text-gray-300 mb-6 leading-relaxed">
          Welcome to Dragon Tiger Casino, the premier destination for online gaming enthusiasts. Founded in 2023, we've quickly become a leader in providing exciting and fair casino games to players worldwide.
        </p>

        <h3 className="text-xl md:text-2xl font-bold mb-4 text-orange-500 mt-8">
          Our Mission
        </h3>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Our mission is to deliver the most thrilling and secure gaming experience possible. We combine cutting-edge technology with fair play practices to ensure every player has an exceptional experience.
        </p>

        <h3 className="text-xl md:text-2xl font-bold mb-4 text-orange-500 mt-8">
          How to Play Dragon Tiger
        </h3>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Dragon Tiger is a simple yet exciting card game:
        </p>
        <ol className="list-decimal pl-6 text-gray-300 mb-6 space-y-2">
          <li>Place your bet on Dragon, Tiger, or Tie</li>
          <li>The dealer deals one card to Dragon and one to Tiger</li>
          <li>The higher card wins (Ace is low, King is high)</li>
          <li>If both cards are equal, Tie bets win</li>
        </ol>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Payouts: Dragon/Tiger 1:1, Tie 8:1
        </p>

        <h3 className="text-xl md:text-2xl font-bold mb-4 text-orange-500 mt-8">
          Our Team
        </h3>
        <p className="text-gray-300 leading-relaxed">
          Our team of gaming experts, developers, and customer support professionals work tirelessly to ensure you have the best possible gaming experience.
        </p>
      </div>
    </div>
  );
};

export default About;
