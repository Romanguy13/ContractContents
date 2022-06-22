import React from 'react'
import { useEtherBalance } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'

const addr = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"

function App() {
  const bal = useEtherBalance(addr)

  return (
    <div>
    {bal && (
      <div>
        balance:
        <p className="bold">{formatEther(bal)}</p>
      </div>
    )}
    </div>
  );
}

export default App
