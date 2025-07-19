import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Game() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState('');
  const betAmount = 100;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setBalance(Number(storedUser.balance));
    } else {
      navigate('/auth');
    }
  }, [navigate]);

  const playGame = async (userChoice) => {
    // Check if user has sufficient balance
    if (balance < betAmount) {
      setMessage(`You don't have enough balance to play. Minimum bet is ₹${betAmount}.`);
      return;
    }

    const options = ['Dragon', 'Tiger'];
    const randomWinner = options[Math.floor(Math.random() * options.length)];
    const isWin = userChoice === randomWinner;

    let updatedBalance = balance;
    if (isWin) {
      updatedBalance += betAmount;
      setMessage(`You chose ${userChoice}. Winner is ${randomWinner}. 🎉 You win ₹${betAmount}!`);
    } else {
      updatedBalance -= betAmount;
      setMessage(`You chose ${userChoice}. Winner is ${randomWinner}. 😢 You lose ₹${betAmount}.`);
    }

    setBalance(updatedBalance);

    const updatedUser = { ...user, balance: updatedBalance };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    try {
      await fetch('https://casino-3ouz.onrender.com/api/update-balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, balance: updatedBalance }),
      });
    } catch (err) {
      console.error('Failed to update balance in DB', err);
    }
  };

  const popularGames = [
    { name: 'Colour Trading', route: '/drigontiger' },
    { name: 'Andar Bahar', route: '/andarbahar' },
    { name: 'Teen Patti', route: '/teenpatti' },
  ];

  const comingSoonGames = [
    'Rummy', 'Poker', 'Ludo', 'Aviator', 'Roulette',
    'Blackjack', 'Dice Game', 'Baccarat', 'Slot Machine', 'Crash',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-['Orbitron'] px-4 py-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-wide text-pink-500 drop-shadow-lg">DRIGO</h1>
        <div className="text-right">
          <p className="text-lg">Welcome, {user?.username || 'Guest'}</p>
          <p className={`font-bold text-2xl ${balance < betAmount ? 'text-red-400' : 'text-green-400'}`}>
            ₹{Number(balance).toFixed(2)}
          </p>
        </div>
      </div>

      {message && (
        <div className={`font-semibold p-4 rounded-xl mb-8 text-center shadow-md ${
          message.includes('win') ? 'bg-green-200 text-black' : 
          message.includes('lose') ? 'bg-red-200 text-black' : 'bg-yellow-200 text-black'
        }`}>
          {message}
        </div>
      )}

      {/* 🎯 Popular Games Section */}
      <h2 className="text-3xl text-center font-bold mb-6 text-white underline underline-offset-8">Popular Games</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {popularGames.map((game, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-4">{game.name}</h3>
            <button
              onClick={() => navigate(game.route)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-all"
            >
              Start Play
            </button>
          </div>
        ))}
      </div>

      {/* 🐉 Dragon vs Tiger Play Now */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl mb-16 max-w-3xl mx-auto text-center hover:shadow-yellow-500/30 transition duration-300">
        <h2 className="text-2xl font-bold mb-4 text-white">Dragon vs Tiger</h2>
        <p className="text-gray-300 mb-6">Bet ₹{betAmount}. Choose your side and test your luck!</p>
        <div className="flex justify-center gap-10">
          <button
            onClick={() => playGame('Dragon')}
            disabled={balance < betAmount}
            className={`px-6 py-2 rounded-full font-bold shadow-md ${
              balance < betAmount 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            Dragon
          </button>
          <button
            onClick={() => playGame('Tiger')}
            disabled={balance < betAmount}
            className={`px-6 py-2 rounded-full font-bold shadow-md ${
              balance < betAmount 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Tiger
          </button>
        </div>
        {balance < betAmount && (
          <p className="text-red-400 mt-4 font-medium">
            Insufficient balance. You need at least ₹{betAmount} to play.
          </p>
        )}
      </div>

      {/* 🚧 Coming Soon Section */}
      <h2 className="text-3xl text-center font-bold mb-6 text-white underline underline-offset-8">Coming Soon</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {comingSoonGames.map((game, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md rounded-xl p-5 flex flex-col items-center justify-center text-center shadow hover:scale-105 transition-transform"
          >
            <div className="text-4xl mb-2">🎮</div>
            <p className="text-md font-semibold">{game}</p>
            <span className="text-yellow-400 text-sm mt-1">Coming Soon</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;