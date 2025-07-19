import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import qrCodeImage from '../assets/qrphone.jpg';

function Profile() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [timer, setTimer] = useState(0);
  const [refNumber, setRefNumber] = useState('');
  const [showRefInput, setShowRefInput] = useState(false);
  const [password, setPassword] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [withdrawPassword, setWithdrawPassword] = useState('');
  const [refSubmitted, setRefSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/auth');
      return;
    }

    setUser(storedUser);
    const numericBalance = parseFloat(storedUser.balance);
    setBalance(isNaN(numericBalance) ? 0 : numericBalance);
  }, [navigate]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0 && showQRCode) {
      setShowQRCode(false);
      setShowRefInput(true);
    }
    return () => clearInterval(interval);
  }, [timer, showQRCode]);

  const handleDepositClick = (amount) => {
    setDepositAmount(amount);
    setShowQRCode(true);
    setTimer(180);
    setShowRefInput(false);
    setRefSubmitted(false);
    setRefNumber('');
    setPassword('');
    setPaymentAmount(amount);
    setError('');
  };

  const handleSubmitRef = async () => {
    if (!refNumber.trim() || !password || !paymentAmount) {
      alert('Please fill all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://casino-3ouz.onrender.com/api/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user?.email,
          password,
          amount: paymentAmount,
          refNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit deposit request');
      }

      const data = await response.json();
      console.log(data.msg);

      setRefSubmitted(true);
      setShowRefInput(false);
      setDepositAmount(null);
      setRefNumber('');
      setPassword('');
      setPaymentAmount('');
    } catch (err) {
      console.error('Deposit error:', err);
      setError('Failed to submit deposit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdrawSubmit = async () => {
    const amount = parseFloat(withdrawAmount);

    if (isNaN(amount) || amount < 476) {
      alert('Minimum withdrawal amount is ₹476');
      return;
    }

    if (!withdrawPassword || !upiId) {
      alert('Please fill all withdrawal fields');
      return;
    }

    const deduction = amount * 0.1;
    const finalAmount = amount - deduction;

    const confirmWithdraw = window.confirm(
      `You are withdrawing ₹${amount.toFixed(2)}\n` +
      `10% platform fee = ₹${deduction.toFixed(2)}\n` +
      `You will receive = ₹${finalAmount.toFixed(2)}\n\n` +
      `Do you want to proceed?`
    );

    if (!confirmWithdraw) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://casino-3ouz.onrender.com/api/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user?.email,
          password: withdrawPassword,
          amount: withdrawAmount,
          upiId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit withdrawal request');
      }

      const data = await response.json();
      console.log(data.msg);

      alert('Withdrawal request submitted successfully!');
      setWithdrawAmount('');
      setUpiId('');
      setWithdrawPassword('');
    } catch (err) {
      console.error('Withdrawal error:', err);
      setError('Failed to submit withdrawal. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4 font-['Orbitron']">Your Profile</h1>

      {error && (
        <div className="bg-red-500 text-white p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="bg-gray-800 p-6 rounded-xl shadow-md mb-6">
        <p className="text-xl font-['Orbitron'] mb-2">
          Username: <span className="text-green-400">{user?.username}</span>
        </p>
        <p className="text-xl font-['Orbitron']">
          Balance: <span className="text-green-400">₹{balance.toFixed(2)}</span>
        </p>
      </div>

      <div className="bg-gray-900 p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-2xl font-bold font-['Orbitron'] mb-4">Deposit Money</h2>
        <div className="flex gap-4 mb-4 flex-wrap">
          {[100, 200, 300, 400, 500].map(amount => (
            <button
              key={amount}
              onClick={() => handleDepositClick(amount)}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full font-bold text-black"
              disabled={isLoading}
            >
              ₹{amount}
            </button>
          ))}
        </div>

        {showQRCode && (
          <div className="text-center mb-4">
            <p className="mb-2 text-yellow-400 font-bold">
              Scan this QR to pay ₹{depositAmount}. Time left: {timer}s
            </p>
            <img
              src={qrCodeImage}
              alt="QR Code"
              className="mx-auto w-48 h-48 border-2 border-white p-2 rounded"
            />
          </div>
        )}

        {showRefInput && (
          <div className="text-center space-y-3">
            <p className="text-green-400 font-bold">Enter your payment details</p>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className="px-4 py-2 text-black rounded w-full max-w-md"
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 text-black rounded w-full max-w-md"
              disabled={isLoading}
            />
            <input
              type="number"
              placeholder="Enter payment amount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="px-4 py-2 text-black rounded w-full max-w-md"
              disabled={isLoading}
            />
            <input
              type="text"
              placeholder="Enter payment reference number"
              value={refNumber}
              onChange={(e) => setRefNumber(e.target.value)}
              className="px-4 py-2 text-black rounded w-full max-w-md"
              disabled={isLoading}
            />
            <button
              onClick={handleSubmitRef}
              className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded font-bold"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Submit'}
            </button>
          </div>
        )}

        {refSubmitted && (
          <div className="text-center mt-4">
            <p className="text-yellow-400 font-bold text-lg">
              Your money will be added in 2 to 3 hours successfully.
            </p>
          </div>
        )}
      </div>

      <div className="bg-gray-900 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold font-['Orbitron'] mb-4">Withdraw Money</h2>
        <div className="space-y-3 max-w-md mx-auto">
          <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="px-4 py-2 text-black rounded w-full"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={withdrawPassword}
            onChange={(e) => setWithdrawPassword(e.target.value)}
            className="px-4 py-2 text-black rounded w-full"
            disabled={isLoading}
          />
          <input
            type="number"
            placeholder="Enter withdrawal amount (min ₹476)"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            className="px-4 py-2 text-black rounded w-full"
            disabled={isLoading}
          />
          <input
            type="text"
            placeholder="Enter your UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="px-4 py-2 text-black rounded w-full"
            disabled={isLoading}
          />
          <button
            onClick={handleWithdrawSubmit}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded font-bold w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Request Withdrawal'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;