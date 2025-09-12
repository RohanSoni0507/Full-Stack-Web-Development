// Counter.js
import React, { useState } from 'react';
import Display from './Display';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Counter App</h2>
      {/* Pass count as a prop to Display */}
      <Display count={count} />
      <div style={{ marginTop: '10px' }}>
        <button 
          onClick={() => setCount(count + 1)} 
          style={{ margin: '5px', padding: '10px' }}
        >
          ➕ Increment
        </button>
        <button 
          onClick={() => setCount(count - 1)} 
          style={{ margin: '5px', padding: '10px' }}
        >
          ➖ Decrement
        </button>
        <button 
          onClick={() => setCount(0)} 
          style={{ margin: '5px', padding: '10px' }}
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;
