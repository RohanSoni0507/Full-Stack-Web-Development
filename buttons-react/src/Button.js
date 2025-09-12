import React, { useState } from 'react'; // Import useState 
function Button({ text }) { 
const [count, setCount] = useState(0); // Initialize state 
const handleClick = () => { 
setCount(count + 1); // Update state 
}; 
return ( 
<button 
onClick={handleClick} // Attach event handler 
style={{ padding: '10px', margin: '5px' }} 
> 
{text} - Clicked {count} times 
</button> 
); 
} 
export default Button; 