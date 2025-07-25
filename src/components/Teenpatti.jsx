import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TeenPatti = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [betAmount, setBetAmount] = useState(500);
  const [balance, setBalance] = useState(0);
  const [gameState, setGameState] = useState('idle');
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [playerHandType, setPlayerHandType] = useState('');
  const [dealerHandType, setDealerHandType] = useState('');
  const [gameResult, setGameResult] = useState(null);
  const [message, setMessage] = useState('');
  const [showWinAnimation, setShowWinAnimation] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);
  const [statistics, setStatistics] = useState({
    totalGames: 0,
    playerWins: 0,
    dealerWins: 0,
    ties: 0,
    winRate: 0,
    netProfit: 0
  });
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Card values and suits
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const suits = ['♠', '♥', '♦', '♣'];
  const suitColors = {
    '♠': 'text-black',
    '♥': 'text-red-600',
    '♦': 'text-red-600',
    '♣': 'text-black'
  };

  useEffect(() => {
    // Load user from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setBalance(Number(storedUser.balance));
    } else {
      navigate('/auth');
    }
    
    // Load game history from localStorage
    const savedHistory = localStorage.getItem('teenpattiHistory');
    if (savedHistory) {
      setGameHistory(JSON.parse(savedHistory));
    }
    
    // Calculate initial statistics
    calculateStatistics(JSON.parse(savedHistory) || []);
  }, []);

  // API function to update balance
  const updateBalanceAPI = async (userId, newBalance) => {
    try {
      const response = await fetch('https://casino-3ouz.onrender.com/api/update-balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, balance: newBalance }),
      });

      if (!response.ok) {
        throw new Error('Failed to update balance');
      }
      
      // Update local storage with new balance
      const updatedUser = {...user, balance: newBalance};
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return true;
    } catch (err) {
      console.error('Error updating balance:', err);
      setMessage('⚠️ Failed to update balance. Please try again.');
      return false;
    }
  };

  // Update user balance with API integration
  const updateUserBalance = async (amount) => {
    const newBalance = balance + amount;
    setBalance(newBalance);
    
    // Update local state
    const updatedUser = {...user, balance: newBalance};
    setUser(updatedUser);
    
    // Update backend via API
    if (user && user.id) {
      await updateBalanceAPI(user.id, newBalance);
    }
  };

  const calculateStatistics = (history) => {
    if (!history || history.length === 0) return;
    
    const stats = {
      totalGames: history.length,
      playerWins: history.filter(g => g.result === 'win').length,
      dealerWins: history.filter(g => g.result === 'lose').length,
      ties: history.filter(g => g.result === 'tie').length,
      netProfit: history.reduce((sum, game) => {
        return sum + (game.result === 'win' ? game.winAmount : game.result === 'lose' ? -game.betAmount : 0);
      }, 0)
    };
    
    stats.winRate = Math.round((stats.playerWins / stats.totalGames) * 100) || 0;
    setStatistics(stats);
  };

  const getRandomCard = () => {
    const value = values[Math.floor(Math.random() * values.length)];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    return { value, suit };
  };

  const cardValue = (card) => {
    const map = { 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };
    return parseInt(card.value) || map[card.value] || 0;
  };

  const evaluateHand = (cards) => {
    const sortedCards = [...cards].sort((a, b) => cardValue(a) - cardValue(b));
    const values = sortedCards.map(card => cardValue(card));
    const suits = sortedCards.map(card => card.suit);
    
    // Check for trail (three of a kind)
    if (values[0] === values[1] && values[1] === values[2]) {
      return { rank: 6, value: [values[0]], type: 'Trail' };
    }
    
    // Check for pure sequence (straight flush)
    const isFlush = suits[0] === suits[1] && suits[1] === suits[2];
    const isSequence = 
      (values[0] + 1 === values[1] && values[1] + 1 === values[2]) ||
      (values[0] === 2 && values[1] === 3 && values[2] === 14); // A,2,3
    
    if (isSequence && isFlush) {
      const high = values[2] === 14 && values[0] === 2 ? 3 : values[2];
      return { rank: 5, value: [high], type: 'Pure Sequence' };
    }
    
    // Check for sequence (straight)
    if (isSequence) {
      const high = values[2] === 14 && values[0] === 2 ? 3 : values[2];
      return { rank: 4, value: [high], type: 'Sequence' };
    }
    
    // Check for color (flush)
    if (isFlush) {
      return { rank: 3, value: [...values].reverse(), type: 'Color' };
    }
    
    // Check for pair
    if (values[0] === values[1]) {
      return { rank: 2, value: [values[0], values[2]], type: 'Pair' };
    }
    if (values[1] === values[2]) {
      return { rank: 2, value: [values[1], values[0]], type: 'Pair' };
    }
    
    // High card
    return { rank: 1, value: [...values].reverse(), type: 'High Card' };
  };

  const compareHands = (hand1, hand2) => {
    if (hand1.rank !== hand2.rank) {
      return hand1.rank > hand2.rank ? 1 : -1;
    }
    
    for (let i = 0; i < hand1.value.length; i++) {
      if (hand1.value[i] > hand2.value[i]) return 1;
      if (hand1.value[i] < hand2.value[i]) return -1;
    }
    
    return 0; // Tie
  };

  const resetGame = () => {
    setGameState('idle');
    setGameResult(null);
    setPlayerCards([]);
    setDealerCards([]);
    setPlayerHandType('');
    setDealerHandType('');
    setMessage('');
  };

  const playGame = async () => {
    if (betAmount < 100 || betAmount > 5000) {
      setMessage('⚠️ Bet must be between ₹100 and ₹5,000');
      return;
    }

    if (betAmount > balance) {
      setMessage('❌ Insufficient balance');
      return;
    }

    setGameState('dealing');
    setMessage('');
    
    // Deduct bet amount from balance
    await updateUserBalance(-betAmount);

    const player = [getRandomCard(), getRandomCard(), getRandomCard()];
    const dealer = [getRandomCard(), getRandomCard(), getRandomCard()];

    const playerEval = evaluateHand(player);
    const dealerEval = evaluateHand(dealer);
    
    setPlayerHandType(playerEval.type);
    setDealerHandType(dealerEval.type);

    const result = compareHands(playerEval, dealerEval);

    setTimeout(async () => {
      setPlayerCards(player);
      setDealerCards(dealer);
      setGameState('result');

      let resultMessage = '';
      let resultType = '';
      let winAmount = 0;
      
      if (result > 0) {
        // Player wins
        const baseWin = betAmount * 1.9;
        const fee = baseWin * 0.1;
        winAmount = Math.floor(baseWin - fee);
        await updateUserBalance(winAmount);
        resultMessage = `✅ You won ₹${winAmount}`;
        resultType = 'win';
        setShowWinAnimation(true);
        setTimeout(() => setShowWinAnimation(false), 3000);
        setGameResult('You Win!');
      } else if (result < 0) {
        // Dealer wins
        resultMessage = `❌ You lost ₹${betAmount}`;
        resultType = 'lose';
        setGameResult('Openent Wins!');
      } else {
        // Tie
        await updateUserBalance(betAmount);
        resultMessage = `🤝 It's a tie! Bet refunded`;
        resultType = 'tie';
        setGameResult('Tie');
      }
      
      setMessage(resultMessage);
      
      // Update game history
      const gameRecord = {
        id: Date.now(),
        date: new Date().toISOString(),
        betAmount,
        winAmount: result > 0 ? winAmount : 0,
        result: resultType,
        playerCards: [...player],
        dealerCards: [...dealer],
        playerHandType: playerEval.type,
        dealerHandType: dealerEval.type
      };
      
      const newHistory = [gameRecord, ...gameHistory.slice(0, 19)]; // Keep last 20 games
      setGameHistory(newHistory);
      localStorage.setItem('teenpattiHistory', JSON.stringify(newHistory));
      calculateStatistics(newHistory);
    }, 1500);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const renderCard = (card, index) => {
    if (!card) return null;
    return (
      <div 
        key={index} 
        className={`bg-white rounded-lg shadow-lg w-20 h-28 flex flex-col justify-between p-2 relative transform transition-all duration-300 hover:-translate-y-2 ${index === 1 ? '-mx-2 z-10' : ''}`}
        style={{ 
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          border: '1px solid #e5e7eb'
        }}
      >
        <div className="flex flex-col items-start">
          <span className={`text-xl font-bold ${suitColors[card.suit]}`}>{card.value}</span>
          <span className={`text-2xl ${suitColors[card.suit]}`}>{card.suit}</span>
        </div>
        <div className="flex justify-center">
          <span className={`text-4xl ${suitColors[card.suit]}`}>{card.suit}</span>
        </div>
        <div className="flex flex-col items-end rotate-180">
          <span className={`text-xl font-bold ${suitColors[card.suit]}`}>{card.value}</span>
          <span className={`text-2xl ${suitColors[card.suit]}`}>{card.suit}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute text-4xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          >
            {['♠', '♥', '♦', '♣'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>
      
      {/* Win Animation */}
      {showWinAnimation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-6xl animate-float text-yellow-300">🥳 🎉 😍 🎊</div>
        </div>
      )}
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md transition z-10 flex items-center"
      >
        <span className="mr-2">←</span> Back
      </button>
      
      {/* Analytics Button */}
      <button
        onClick={() => setShowAnalytics(!showAnalytics)}
        className="absolute top-4 right-4 bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md transition z-10 flex items-center"
      >
        {showAnalytics ? 'Close Stats' : 'Game Stats'}
      </button>
      
      {/* User Info */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 px-4 py-2 rounded-lg shadow-md z-10 flex items-center">
        <div className="mr-3 text-2xl">{user?.avatar || '👤'}</div>
        <div>
          <div className="text-sm text-gray-300">{user?.level || 'Player'}</div>
          <div className="font-bold">₹{balance.toLocaleString()}</div>
        </div>
      </div>

      <div className="w-full max-w-5xl bg-[#1f1f2e] rounded-3xl shadow-2xl border border-gray-700 p-6 backdrop-blur-md relative z-10">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 tracking-wider drop-shadow text-center">
            ♠️ Teen Patti
          </h1>
          <p className="text-gray-400 text-center mt-2">
            Classic Indian Card Game - Professional Edition
          </p>
        </div>

        {/* Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Controls */}
          <div className="bg-gray-800 rounded-2xl p-6">
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-center">Game Controls</h2>
              
              <div>
                <label className="block text-gray-300 mb-2">Bet Amount</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="100"
                    value={betAmount}
                    onChange={(e) => setBetAmount(Number(e.target.value))}
                    className="w-full accent-yellow-500"
                  />
                  <div className="bg-gray-700 px-3 py-1 rounded-lg min-w-[100px] text-center font-bold">
                    ₹{betAmount}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>₹100</span>
                  <span>₹5,000</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {[100, 500, 1000, 2000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setBetAmount(amount)}
                    className={`py-2 rounded-lg transition ${
                      betAmount === amount 
                        ? 'bg-yellow-600 text-white' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>
              
              <button
                onClick={playGame}
                disabled={gameState !== 'idle'}
                className={`w-full py-3 rounded-lg font-bold shadow transition ${
                  gameState !== 'idle'
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {gameState === 'dealing' ? 'Dealing Cards...' : 'Deal Cards'}
              </button>
              
              {gameState === 'result' && (
                <button
                  onClick={resetGame}
                  className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold shadow transition"
                >
                  🔁 Play Again
                </button>
              )}
            </div>
          </div>
          
          {/* Center Panel - Game Board */}
          <div className="lg:col-span-2 bg-gray-800 rounded-2xl p-6">
            {gameState === 'idle' && (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="text-5xl mb-4">♠️ ♥️ ♦️ ♣️</div>
                <h3 className="text-2xl text-center">Place your bet and start the game!</h3>
                <p className="text-gray-400 text-center mt-2">
                  Minimum bet: ₹100, Maximum bet: ₹5,000
                </p>
              </div>
            )}
            
            {gameState === 'dealing' && (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="flex space-x-4 mb-8">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i} 
                      className="bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg w-16 h-24 flex items-center justify-center"
                    >
                      <div className="animate-pulse text-gray-500">?</div>
                    </div>
                  ))}
                </div>
                <p className="text-xl animate-pulse">Dealing cards...</p>
              </div>
            )}
            
            {gameState === 'result' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-green-400 animate-pulse">
                    🎉 {gameResult}
                  </h2>
                  <p className="text-xl mt-2 text-yellow-300">{message}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-900 rounded-xl p-4">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-blue-300">Your Hand</h3>
                      <div className="text-sm text-gray-400">{playerHandType}</div>
                    </div>
                    <div className="flex justify-center">
                      {playerCards.map(renderCard)}
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 rounded-xl p-4">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-red-300">Oponent's Hand</h3>
                      <div className="text-sm text-gray-400">{dealerHandType}</div>
                    </div>
                    <div className="flex justify-center">
                      {dealerCards.map(renderCard)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Analytics Panel */}
      {showAnalytics && (
        <div className="w-full max-w-5xl bg-[#1f1f2e] rounded-3xl shadow-2xl border border-gray-700 p-6 backdrop-blur-md mt-6 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-yellow-400">Game Analytics</h2>
            <button 
              onClick={() => setShowAnalytics(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <div className="text-4xl font-bold text-green-400">{statistics.winRate || 0}%</div>
              <div className="text-gray-400">Win Rate</div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <div className="text-4xl font-bold">{statistics.totalGames || 0}</div>
              <div className="text-gray-400">Games Played</div>
            </div>
            
            <div className={`bg-gray-800 rounded-xl p-4 text-center ${
              statistics.netProfit >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              <div className="text-4xl font-bold">
                {statistics.netProfit >= 0 ? '+' : ''}
                {formatCurrency(statistics.netProfit || 0)}
              </div>
              <div className="text-gray-400">Net Profit</div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-4">Recent Games</h3>
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="py-3 px-4 text-left">Time</th>
                  <th className="py-3 px-4 text-left">Bet</th>
                  <th className="py-3 px-4 text-left">Result</th>
                  <th className="py-3 px-4 text-left">Your Hand</th>
                  <th className="py-3 px-4 text-left">Dealer Hand</th>
                </tr>
              </thead>
              <tbody>
                {gameHistory.slice(0, 5).map((game) => (
                  <tr key={game.id} className="border-b border-gray-700 hover:bg-gray-750">
                    <td className="py-3 px-4 text-sm">
                      {new Date(game.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </td>
                    <td className="py-3 px-4 font-bold">₹{game.betAmount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded ${
                        game.result === 'win' ? 'bg-green-900 text-green-300' :
                        game.result === 'lose' ? 'bg-red-900 text-red-300' :
                        'bg-yellow-900 text-yellow-300'
                      }`}>
                        {game.result === 'win' ? 'Win' : game.result === 'lose' ? 'Loss' : 'Tie'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex">
                        {game.playerCards.slice(0, 2).map((card, i) => (
                          <div key={i} className="text-sm -mr-2">
                            {card.value}{card.suit}
                          </div>
                        ))}
                        <div className="text-sm">...</div>
                      </div>
                      <div className="text-xs text-gray-400">{game.playerHandType}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex">
                        {game.dealerCards.slice(0, 2).map((card, i) => (
                          <div key={i} className="text-sm -mr-2">
                            {card.value}{card.suit}
                          </div>
                        ))}
                        <div className="text-sm">...</div>
                      </div>
                      <div className="text-xs text-gray-400">{game.dealerHandType}</div>
                    </td>
                  </tr>
                ))}
                {gameHistory.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-500">
                      No games played yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
        </div>
        
      )}
      
      {/* Game Rules */}
      <div className="w-full max-w-5xl bg-[#1f1f2e] rounded-3xl shadow-2xl border border-gray-700 p-6 backdrop-blur-md mt-6 relative z-10">
        <h2 className="text-xl font-bold text-yellow-400 mb-4">Teen Patti Rules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold text-gray-300 mb-2">Hand Rankings</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">1.</span>
                <span><strong>Trail</strong> (Three of a Kind)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">2.</span>
                <span><strong>Pure Sequence</strong> (Straight Flush)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">3.</span>
                <span><strong>Sequence</strong> (Straight)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">4.</span>
                <span><strong>Color</strong> (Flush)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">5.</span>
                <span><strong>Pair</strong> (Two of a Kind)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">6.</span>
                <span><strong>High Card</strong></span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-300 mb-2">Payout Structure</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Winning Hand</span>
                <span>1.9x bet amount</span>
              </li>
              <li className="flex justify-between">
                <span>Service Fee</span>
                <span>10% of winnings</span>
              </li>
              <li className="flex justify-between">
                <span>Tie Game</span>
                <span>Bet refunded</span>
              </li>
              <li className="flex justify-between">
                <span>Losing Hand</span>
                <span>Bet lost</span>
              </li>
            </ul>
          </div>
        </div>
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
      <button
        onClick={() => navigate(-1)}
        className="mt-8 bg-yellow-500 text-black px-4 py-2 rounded"
      >
        🔙 Back
      </button>
    </div>
  );
};

export default TeenPatti;
