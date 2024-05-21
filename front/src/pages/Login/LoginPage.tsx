import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';
import { setCookie } from '../../storage/cookies'
import './LoginPage.css'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginMutation] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      login(data.signIn.token); // Stocker le token JWT après connexion
      setCookie("gqltoken",data.signIn.token, 7)
      setCookie("gqlid",data.signIn.id, 7)
      console.log(data.signIn.id)
      if(data.signIn.code == 200){
        navigate('/articles');
      }else{
        alert('Mauvais identifiants')
      }
      
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation({ variables: { email, password } });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>


  );
};

export default LoginPage;
