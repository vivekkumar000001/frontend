import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 🔥 Back navigation

const AndarBahar = () => {
  const navigate = useNavigate(); // 🔥 Hook for back navigation

  const [selectedOption, setSelectedOption] = useState(null);
  const [betAmount, setBetAmount] = useState(100);
  const [balance, setBalance] = useState(0);
  const [gameState, setGameState] = useState('idle');
  const [gameResult, setGameResult] = useState(null);
  const [andarCards, setAndarCards] = useState([]);
  const [baharCards, setBaharCards] = useState([]);
  const [message, setMessage] = useState('');
  const [showWinAnimation, setShowWinAnimation] = useState(false);

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
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = ['♠️', '♥️', '♦️', '♣️'];
    const value = values[Math.floor(Math.random() * values.length)];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    return { value, suit };
  };

  const resetGame = () => {
    setSelectedOption(null);
    setGameState('idle');
    setGameResult(null);
    setAndarCards([]);
    setBaharCards([]);
    setMessage('');
  };

  const placeBet = (option) => {
    if (betAmount < 10 || betAmount > 10000) {
      setMessage('⚠️ Bet must be between ₹10 and ₹10,000');
      return;
    }

    if (betAmount > balance) {
      setMessage('❌ Insufficient balance');
      return;
    }

    setSelectedOption(option);
    setGameState('dealing');
    setMessage('');
    const newBalance = balance - betAmount;
    updateUserBalance(newBalance);

    const centerCard = getRandomCard();
    const andar = [];
    const bahar = [];
    let winner = null;

    for (let i = 0; i < 20; i++) {
      const card = getRandomCard();
      if (i % 2 === 0) {
        andar.push(card);
        if (card.value === centerCard.value) {
          winner = 'andar';
          break;
        }
      } else {
        bahar.push(card);
        if (card.value === centerCard.value) {
          winner = 'bahar';
          break;
        }
      }
    }

    setTimeout(() => {
      setGameResult(winner);
      setAndarCards(andar);
      setBaharCards(bahar);
      setGameState('result');

      if (option === winner) {
        const grossWin = betAmount * 1.9;
        const fee = grossWin * 0.1;
        const netWin = grossWin - fee;
        updateUserBalance(balance - betAmount + netWin);
        setMessage(`✅ You won ₹${netWin.toFixed(2)}`);
        setShowWinAnimation(true);
        setTimeout(() => setShowWinAnimation(false), 3000);
      } else {
        setMessage(`❌ You lost ₹${betAmount}`);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">

      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg z-20"
      >
        ← Back
      </button>

      {/* 🎉 Win Emoji Animation */}
      {showWinAnimation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-6xl animate-float text-yellow-300">
            🥳 🎉 😍 🎊
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl bg-[#1e1e2f] rounded-3xl shadow-2xl border border-gray-700 p-8 backdrop-blur-lg">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-yellow-400 tracking-wide drop-shadow">
          🎴 Andar Bahar
        </h1>

        <div className="text-center text-xl mb-4">
          💰 Balance: <span className="text-green-400 font-bold">₹{balance}</span>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            min={10}
            max={10000}
            className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white w-36 text-center shadow-inner"
            placeholder="Bet Amount"
          />
          <button
            onClick={() => placeBet('andar')}
            disabled={gameState !== 'idle'}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-xl font-semibold shadow-lg transition duration-300 ease-in-out"
          >
            Bet on Andar
          </button>
          <button
            onClick={() => placeBet('bahar')}
            disabled={gameState !== 'idle'}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-xl font-semibold shadow-lg transition duration-300 ease-in-out"
          >
            Bet on Bahar
          </button>
        </div>

        {message && <p className="text-center text-lg mt-2 text-yellow-300">{message}</p>}

        {gameState === 'result' && (
          <>
            <div className="mt-8">
              <h2 className="text-center text-2xl font-bold text-green-400 mb-6 animate-pulse">
                🎉 Result: <span className="uppercase">{gameResult}</span>
              </h2>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-center mb-2 text-blue-300">Andar</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {andarCards.map((card, index) => (
                      <div
                        key={index}
                        className="bg-black border border-yellow-400 px-3 py-2 rounded-md text-lg shadow-md"
                      >
                        {card.value}{card.suit}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-center mb-2 text-red-300">Bahar</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {baharCards.map((card, index) => (
                      <div
                        key={index}
                        className="bg-black border border-yellow-400 px-3 py-2 rounded-md text-lg shadow-md"
                      >
                        {card.value}{card.suit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={resetGame}
                className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-xl font-semibold shadow-lg"
              >
                🔁 Play Again
              </button>
            </div>
          </>
        )}
      </div>

      {/* 🎈 Float Animation CSS */}
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

export default AndarBahar;
