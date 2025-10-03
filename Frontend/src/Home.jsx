import React from 'react';

const Home = () => {
  const containerStyle = {
    maxWidth: '900px',
    margin: '50px auto',
    padding: '30px',
    textAlign: 'center',
    background: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
    fontFamily: 'Arial, sans-serif'
  };

  const titleStyle = {
    fontSize: '2.8rem',
    marginBottom: '20px',
    color: '#222'
  };

  const textStyle = {
    fontSize: '1.2rem',
    lineHeight: '1.8',
    color: '#555',
    marginBottom: '30px'
  };

  const buttonStyle = {
    padding: '12px 28px',
    backgroundColor: '#ff4b2b',
    border: 'none',
    borderRadius: '6px',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const buttonHoverStyle = {
    backgroundColor: '#ff3a1a'
  };

  const cardStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    marginTop: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Welcome to Our Website</h1>
      <p style={textStyle}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae aliquid hic corporis aspernatur ex, ipsa perspiciatis officiis optio sunt, beatae quaerat fuga aperiam doloribus minima, suscipit id voluptatem consectetur provident!
      </p>

      <button
        style={buttonStyle}
        onMouseOver={e => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
        onMouseOut={e => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
      >
        Get Started
      </button>

      <div style={cardStyle}>
        <h2 style={{marginBottom: '10px'}}>Our Features</h2>
        <ul style={{listStyleType: 'none', padding: 0, color: '#444'}}>
          <li>✅ Easy Registration & Login</li>
          <li>✅ Profile Customization</li>
          <li>✅ Advanced Search / Match System</li>
          <li>✅ Secure Messaging</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
