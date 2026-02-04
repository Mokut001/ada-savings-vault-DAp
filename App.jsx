
import { useState } from 'react'

export default function App() {
  const TARGET = 1000
  const MONTHS = 12
  const monthly = TARGET / MONTHS

  const [saved, setSaved] = useState(0)

  const saveMonth = () => {
    setSaved(prev => Math.min(prev + monthly, TARGET))
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>ADA Savings DApp</h1>
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
  )
}
