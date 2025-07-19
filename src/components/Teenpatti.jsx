import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Import for navigation

const TeenPatti = () => {
  const [betAmount, setBetAmount] = useState(100);
  const [balance, setBalance] = useState(0);
  const [gameState, setGameState] = useState('idle');
  const [gameResult, setGameResult] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [message, setMessage] = useState('');
  const [showWinAnimation, setShowWinAnimation] = useState(false);

  const navigate = useNavigate(); // <-- Hook for navigation

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setBalance(user.balance);
    }
  }, []);

  const updateUserBalance = (newBalance) => {
    const user = JSON.parse(localStorage.getItem('user'));
    user.balance = newBalance;
    localStorage.setItem('user', JSON.stringify(user));
    setBalance(newBalance);

    fetch('https://casino-3ouz.onrender.com/api/update-balance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: user.id, balance: newBalance }),
    });
  };

  const getRandomCard = () => {
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suits = ['♠️', '♥️', '♦️', '♣️'];
    const value = values[Math.floor(Math.random() * values.length)];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    return { value, suit };
  };

  const cardValue = (card) => {
    const map = { 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };
    return parseInt(card.value) || map[card.value] || 0;
  };

  const resetGame = () => {
    setGameState('idle');
    setGameResult(null);
    setPlayerCards([]);
    setDealerCards([]);
    setMessage('');
  };

  const playGame = () => {
    if (betAmount < 10 || betAmount > 10000) {
      setMessage('⚠️ Bet must be between ₹10 and ₹10,000');
      return;
    }

    if (betAmount > balance) {
      setMessage('❌ Insufficient balance');
      return;
    }

    setGameState('dealing');
    setMessage('');
    updateUserBalance(balance - betAmount);

    const player = [getRandomCard(), getRandomCard(), getRandomCard()];
    const dealer = [getRandomCard(), getRandomCard(), getRandomCard()];

    const playerTotal = player.reduce((sum, c) => sum + cardValue(c), 0);
    const dealerTotal = dealer.reduce((sum, c) => sum + cardValue(c), 0);

    setTimeout(() => {
      setPlayerCards(player);
      setDealerCards(dealer);
      setGameState('result');

      if (playerTotal > dealerTotal) {
        const grossWin = betAmount * 1.9;
        const fee = grossWin * 0.1;
        const netWin = grossWin - fee;
        updateUserBalance(balance - betAmount + netWin);
        setMessage(`✅ You won ₹${netWin.toFixed(2)}`);
        setShowWinAnimation(true);
        setTimeout(() => setShowWinAnimation(false), 3000);
        setGameResult('You Win!');
      } else if (dealerTotal > playerTotal) {
        setMessage(`❌ You lost ₹${betAmount}`);
        setGameResult('Dealer Wins!');
      } else {
        updateUserBalance(balance);
        setMessage(`🤝 It's a tie! Bet refunded`);
        setGameResult('Tie');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-6 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // <-- Go back one page
        className="absolute top-4 left-4 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md transition"
      >
        🔙 Back
      </button>

      {showWinAnimation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-6xl animate-float text-yellow-300">🥳 🎉 😍 🎊</div>
        </div>
      )}

      <div className="w-full max-w-5xl bg-[#1f1f2e] rounded-3xl shadow-2xl border border-gray-700 p-10 backdrop-blur-md space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-5xl font-bold text-yellow-400 tracking-wider drop-shadow text-center sm:text-left">
            ♠️ Teen Patti
          </h1>
          <div className="text-xl mt-4 sm:mt-0">
            💰 Balance: <span className="text-green-400 font-bold">₹{balance}</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4">
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            min={10}
            max={10000}
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white w-36 text-center"
            placeholder="Bet Amount"
          />
          <button
            onClick={playGame}
            disabled={gameState !== 'idle'}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-semibold shadow transition"
          >
            Deal Cards
          </button>
        </div>

        {message && <p className="text-center text-lg text-yellow-300">{message}</p>}

        {gameState === 'result' && (
          <>
            <h2 className="text-center text-3xl font-bold text-green-400 animate-pulse">
              🎉 Result: {gameResult}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-6">
              <div className="text-center">
                <h3 className="text-2xl text-blue-300 font-semibold mb-4">Your Cards</h3>
                <div className="flex justify-center gap-4">
                  {playerCards.map((card, i) => (
                    <div key={i} className="bg-black border border-yellow-500 px-4 py-3 rounded-xl text-2xl shadow-lg">
                      {card.value}{card.suit}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl text-red-300 font-semibold mb-4">Dealer's Cards</h3>
                <div className="flex justify-center gap-4">
                  {dealerCards.map((card, i) => (
                    <div key={i} className="bg-black border border-yellow-500 px-4 py-3 rounded-xl text-2xl shadow-lg">
                      {card.value}{card.suit}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={resetGame}
                className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold shadow"
              >
                🔁 Play Again
              </button>
            </div>
          </>
        )}
      </div>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            50% { transform: translateY(-40px) scale(1.1); opacity: 0.8; }
            100% { transform: translateY(-80px) scale(0.95); opacity: 0; }
          }
          .animate-float {
            animation: float 2.5s ease-in-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default TeenPatti;
