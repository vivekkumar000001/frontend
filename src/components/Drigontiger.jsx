// src/components/ColorTradingGame.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ColorTradingGame = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(null);
  const [baseBetAmount, setBaseBetAmount] = useState(10); // New base bet
  const [betAmount, setBetAmount] = useState(10);
  const [balance, setBalance] = useState(0);
  const [gameResult, setGameResult] = useState(null);
  const [message, setMessage] = useState('');
  const [showWinAnimation, setShowWinAnimation] = useState(false);
  const [history, setHistory] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isBetPlaced, setIsBetPlaced] = useState(false);
  const [isResultPhase, setIsResultPhase] = useState(false);

  const resultPattern = [
    "green", "green", "green", "red", "red", "green", "red", "green", "green", "green",
    "green", "red", "red", "red", "red", "red", "green", "red", "green", "red"
  ];
  const [patternIndex, setPatternIndex] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setBalance(user.balance);
    const savedHistory = JSON.parse(localStorage.getItem('colorHistory')) || [];
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    } else {
      if (selectedColor) {
        generateResult();
      } else {
        setMessage("⏰ Time's up! No bet placed.");
        setIsResultPhase(true);
        setTimeout(() => startNewRound(), 3000);
      }
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const startNewRound = () => {
    setTimeLeft(30);
    setSelectedColor(null);
    setGameResult(null);
    setIsBetPlaced(false);
    setIsResultPhase(false);
    setMessage('');
  };

  const updateUserBalance = (newBalance) => {
    const user = JSON.parse(localStorage.getItem('user'));
    user.balance = newBalance;
    localStorage.setItem('user', JSON.stringify(user));
    setBalance(newBalance);
    fetch('https://casino-3ouz.onrender.com/api/update-balance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: user.id, balance: newBalance })
    });
  };

  const placeBet = (color) => {
    if (isBetPlaced || isResultPhase) return;

    if (betAmount < 10 || betAmount > 10000) {
      setMessage('⚠️ Bet must be between ₹10 and ₹10,000');
      return;
    }
    if (betAmount > balance) {
      setMessage('❌ Insufficient balance');
      return;
    }

    setSelectedColor(color);
    setIsBetPlaced(true);
    updateUserBalance(balance - betAmount);
    setMessage(`✅ ₹${betAmount} bet on ${color.toUpperCase()}!`);
  };

  const generateResult = () => {
    const resultColor = resultPattern[patternIndex];
    setPatternIndex((patternIndex + 1) % resultPattern.length);
    setGameResult(resultColor);

    if (selectedColor === resultColor) {
      const grossWin = betAmount * 2;
      const commission = grossWin * 0.05;
      const netWin = grossWin - commission;
      updateUserBalance(balance + netWin);
      setMessage(`🎉 You won ₹${netWin.toFixed(2)} (after 9% commission)`);
      setShowWinAnimation(true);
      setTimeout(() => setShowWinAnimation(false), 3000);
    } else if (selectedColor) {
      setMessage(`❌ You lost ₹${betAmount}`);
    }

    const newHistory = [resultColor, ...history.slice(0, 19)];
    setHistory(newHistory);
    localStorage.setItem('colorHistory', JSON.stringify(newHistory));

    setIsResultPhase(true);
    setTimeout(() => startNewRound(), 3000);
  };

  const applyMultiplier = (multiplier) => {
    const newBet = baseBetAmount * multiplier;
    setBetAmount(newBet);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-12">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg"
      >← Back</button>

      {showWinAnimation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="text-6xl animate-float text-yellow-300">🥳 🎉 😍 🎊</div>
        </div>
      )}

      <div className="w-full max-w-xl bg-gray-900 rounded-2xl p-8 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-blue-400 mb-4">🎯 Color Trading Game</h1>
        <p className="text-lg mb-2">💰 Wallet Balance: <span className="text-green-400">₹{balance}</span></p>
        <p className="text-lg mb-4">⏳ Time Left: <span className="text-yellow-400 font-bold">{timeLeft}s</span></p>

        <div className="flex gap-4 justify-center mt-4 mb-4">
          <button onClick={() => placeBet('green')} disabled={isBetPlaced || isResultPhase} className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-xl">GREEN</button>
          <button onClick={() => placeBet('red')} disabled={isBetPlaced || isResultPhase} className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-xl">RED</button>
        </div>

        <div className="mb-4">
          <input
            type="number"
            value={baseBetAmount}
            onChange={(e) => setBaseBetAmount(Number(e.target.value))}
            min={10} max={10000}
            className="w-40 text-center px-3 py-2 rounded bg-gray-700 text-white border border-gray-500 mb-2"
            placeholder="Base Bet Amount"
          />

          <div className="flex flex-wrap justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5, 10, 20].map((x) => (
              <button
                key={x}
                onClick={() => applyMultiplier(x)}
                className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded-md text-sm"
              >{x}x</button>
            ))}
          </div>

          <p className="text-sm text-yellow-400">💵 Final Bet: ₹{betAmount}</p>
        </div>

        {message && <p className="mt-4 text-yellow-300">{message}</p>}
        {gameResult && (
          <p className="mt-4 text-xl font-bold text-yellow-400">🎯 Result: {gameResult.toUpperCase()}</p>
        )}

        <h2 className="mt-8 text-blue-300 text-lg font-semibold">Game History</h2>
        <div className="flex justify-center flex-wrap gap-2 mt-2">
          {history.map((c, i) => (
            <div key={i} className={`w-6 h-6 rounded-full ${c === 'green' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(-40px) scale(1.1); opacity: 0.8; }
          100% { transform: translateY(-80px) scale(0.95); opacity: 0; }
        }
        .animate-float {
          animation: float 2.5s ease-in-out forwards;
        }
      `}</style>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
      >
        ← Go Back
      </button>
    </div>
  );
};

export default ColorTradingGame;
