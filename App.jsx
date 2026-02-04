
import { useState } from "react";

export default function App() {
  const TARGET = 1000;
  const MONTHS = 12;
  const monthly = TARGET / MONTHS;

  const [saved, setSaved] = useState(0);
  const [wallet, setWallet] = useState(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const connectWallet = async () => {
    try {
      if (!window.cardano || !window.cardano.nami) {
        alert("Please install a Cardano wallet like Nami or Lace.");
        return;
      }

      const api = await window.cardano.nami.enable();
      setWallet(api);

      const addresses = await api.getUsedAddresses();
      setAddress(addresses[0]);

      const bal = await api.getBalance();
      setBalance(bal);

    } catch (err) {
      console.error(err);
      alert("Wallet connection failed");
    }
  };

  const saveMonth = () => {
    setSaved(prev => Math.min(prev + monthly, TARGET));
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>ADA Savings DApp</h1>

      {!wallet ? (
        <button onClick={connectWallet}>🔐 Connect Wallet</button>
      ) : (
        <>
          <p><b>Wallet connected</b></p>
          <p><b>Address:</b> {address}</p>
          <p><b>Balance (raw):</b> {balance}</p>
        </>
      )}

      <hr />

      <p><b>Target:</b> {TARGET} ADA</p>
      <p><b>Monthly Savings:</b> {monthly.toFixed(2)} ADA</p>
      <p><b>Saved so far:</b> {saved.toFixed(2)} ADA</p>
      <p><b>Remaining:</b> {(TARGET - saved).toFixed(2)} ADA</p>

      {saved < TARGET ? (
        <button onClick={saveMonth}>Save This Month</button>
      ) : (
        <h3>🎉 Target reached! You can withdraw now.</h3>
      )}
    </div>
  );
}
