import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', age: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert(`✅ Form Submitted!\nName: ${formData.name}\nEmail: ${formData.email}\nAge: ${formData.age}`);
  };

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>📝 User Registration Form</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
        {/* Name */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">Name:</label>
          <input 
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email:</label>
          <input 
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Age */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="age">Age:</label>
          <input 
            id="age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            min="1"
            max="120"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Submit */}
        <button 
          type="submit"
          style={{ backgroundColor: '#007bff', color: 'white', border: 'none',
                   padding: '10px 20px', cursor: 'pointer', fontSize: '16px' }}
        >
          Submit
        </button>
      </form>

      {/* Display Data */}
      {Object.keys(formData).length > 0 && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <h3>Current Form Data:</h3>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
