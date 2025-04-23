import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const SignupCard = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 24px;
  width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Title component was removed as h2 is used directly in WelcomeMessage

// Label component was removed as not needed for this form

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #777;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #7695EC;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 7px 30px;
  font-size: 16px;
  cursor: pointer;
  float: right;
  
  &:disabled {
    background-color: #CCCCCC;
    cursor: not-allowed;
  }
`;

const WelcomeMessage = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Signup = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username.trim()) {
      // Store username in localStorage for later use
      localStorage.setItem('username', username);
      // Navigate to main screen
      navigate('/main');
    }
  };

  return (
    <SignupContainer>
      <SignupCard>
        <WelcomeMessage>
          <h2>Welcome to CodeLeap network!</h2>
          <p>Please enter your username</p>
        </WelcomeMessage>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="John doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button type="submit" disabled={!username.trim()}>
            ENTER
          </Button>
        </form>
      </SignupCard>
    </SignupContainer>
  );
};

export default Signup;
