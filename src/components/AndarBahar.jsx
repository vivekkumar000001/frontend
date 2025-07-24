import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const suits = ["♠", "♥", "♦", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const getRandomCard = () => {
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const value = values[Math.floor(Math.random() * values.length)];
  return `${value} ${suit}`;
};

const AndarBaharGame = () => {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(0);
  const [betAmount, setBetAmount] = useState(100);
  const [centerCard, setCenterCard] = useState(null);
  const [andarCards, setAndarCards] = useState([]);
  const [baharCards, setBaharCards] = useState([]);
  const [resultMessage, setResultMessage] = useState("");
  const [timer, setTimer] = useState(30);
  const [selectedSide, setSelectedSide] = useState(null);
  const [isDealing, setIsDealing] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setWallet(user.balance);
  }, []);

  const updateUserBalance = (newBalance) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    user.balance = newBalance;
    localStorage.setItem("user", JSON.stringify(user));
    setWallet(newBalance);

    fetch("https://casino-3ouz.onrender.com/api/update-balance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id, balance: newBalance }),
    }).catch((err) => console.error("Balance update failed:", err));
  };

  const dealCards = async (center) => {
    const newAndar = [];
    const newBahar = [];
    let matchedSide = null;
    const centerValue = center.split(" ")[0];

    for (let i = 0; i < 25; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const card = getRandomCard();
      const cardValue = card.split(" ")[0];

      if (i % 2 === 0) {
        newAndar.push(card);
        if (cardValue === centerValue && matchedSide === null) {
          matchedSide = "Andar";
          break;
        }
      } else {
        newBahar.push(card);
        if (cardValue === centerValue && matchedSide === null) {
          matchedSide = "Bahar";
          break;
        }
      }
    }

    setAndarCards([...newAndar]);
    setBaharCards([...newBahar]);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    if (!matchedSide) {
      updateUserBalance(wallet + betAmount);
      setResultMessage("⚖️ It's a tie! Your money has been refunded.");
    } else if (matchedSide === selectedSide) {
      const grossWin = betAmount * 2;
      const commission = grossWin * 0.09;
      const netWin = grossWin - commission;
      const newBalance = wallet + netWin;
      updateUserBalance(newBalance);
      setResultMessage(`✅ You won ₹${grossWin} - ₹${commission.toFixed(2)} (9% commission) = ₹${netWin.toFixed(2)}`);
    } else {
      setResultMessage(`❌ You lost ₹${betAmount}`);
    }

    setIsDealing(false);
  };

  const placeBet = (side) => {
    if (isDealing || betAmount > wallet || betAmount <= 0) return;
    const center = getRandomCard();
    setCenterCard(center);
    updateUserBalance(wallet - betAmount);
    setAndarCards([]);
    setBaharCards([]);
    setResultMessage("");
    setSelectedSide(side);
    setIsDealing(true);
    dealCards(center);
  };

  return (
    <div className="bg-green-800 min-h-screen text-white flex flex-col items-center p-4">
      <div className="text-xl font-bold mb-2">Andar Bahar Game</div>
      <div className="text-lg">Wallet Balance: ₹{wallet.toFixed(2)}</div>
      <div className="text-lg mb-4">Timer: <strong>{timer}s</strong></div>

      <input
        type="number"
        value={betAmount}
        onChange={(e) => setBetAmount(Number(e.target.value))}
        className="p-2 rounded text-black text-center w-32 mb-4"
        min={1}
      />

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => placeBet("Andar")}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Bet on Andar
        </button>
        <button
          onClick={() => placeBet("Bahar")}
          className="bg-red-600 px-4 py-2 rounded"
        >
          Bet on Bahar
        </button>
      </div>

      {centerCard && (
        <div className="mb-4 text-center">
          <div className="text-lg font-semibold">Center Card</div>
          <div className="bg-white text-black text-xl p-2 rounded w-14 mx-auto">
            {centerCard}
          </div>
        </div>
      )}

      <div className="flex gap-6 justify-center mb-4 w-full max-w-sm">
        <div>
          <div className="text-center font-bold mb-2">Andar</div>
          <div className="grid grid-cols-3 gap-2">
            {andarCards.map((card, idx) => (
              <div key={idx} className="bg-white text-black px-2 py-1 rounded text-center">
                {card}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-center font-bold mb-2">Bahar</div>
          <div className="grid grid-cols-3 gap-2">
            {baharCards.map((card, idx) => (
              <div key={idx} className="bg-white text-black px-2 py-1 rounded text-center">
                {card}
              </div>
            ))}
          </div>
        </div>
      </div>

      {resultMessage && (
        <div className="mt-4 text-xl font-bold">{resultMessage}</div>
      )}

      <button
        onClick={() => navigate(-1)}
        className="mt-8 bg-yellow-500 text-black px-4 py-2 rounded"
      >
        🔙 Back
      </button>
    </div>
  );
};

export default AndarBaharGame;
