import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import '../CSS/SplashPage.css'

const LoginForm = ({ setLogIn }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    setErrors([])
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  const handleDemo = () => {
    setEmail('demo@aa.io')
    setPassword('password')
  }

  const handleSignUp = () => {
    setLogIn(false)
  }

  return (
    <>
      <form className='loginForm' onSubmit={onLogin}>
        <div className='loginErrors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
        <div>Email</div>
          <label className='formFieldInput' htmlFor='email'>
            <input
              name='email'
              type='text'
              value={email}
              onChange={updateEmail}
            />
          </label>
        </div>
        <div>
        <div>Password</div>
          <label className='formFieldInput' htmlFor='password'>
            <input
              name='password'
              type='password'
              value={password}
              onChange={updatePassword}
            />
          </label>
        </div>
        <div>
          <button className='loginButton' type='submit'>Login</button>
        </div>
        <div className='demoUserContainer'>
            <button className='demoButton' onClick={handleDemo}>Demo User</button>
        </div>
      </form>
      <div className='switchToSignUpButton'>
        Not a member?
        <button className='switchToSignUpButton' onClick={handleSignUp}> Sign up</button>
      </div>
    </>
  );
};

export default LoginForm;
