import { useState } from "react";

export default function App() {
  const TARGET = 1000;
  const MONTHS = 12;
  const monthly = TARGET / MONTHS;

  const [saved, setSaved] = useState(0);

  const remaining = TARGET - saved;

  return (
    <div style={{ padding: 30 }}>
      <h1>ADA Savings Goal DApp</h1>
      <p><b>Target:</b> {TARGET} ADA</p>
      <p><b>Monthly Saving:</b> {monthly.toFixed(2)} ADA</p>

      <button onClick={() => setSaved(saved + monthly)}>
        Save this month
      </button>

      <p><b>Saved so far:</b> {saved.toFixed(2)} ADA</p>
      <p><b>Remaining:</b> {remaining.toFixed(2)} ADA</p>

      {remaining <= 0 && (
        <p style={{ color: "green" }}>
          🎉 Target reached! You can now withdraw your ADA.
        </p>
      )}
    </div>
  );
}
