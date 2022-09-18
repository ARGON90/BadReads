import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import * as sessionActions from "../../store/session";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    setErrors([])
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Passwords must match'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  const handleDemoUser = async (e) => {
    e.preventDefault();
    const email = 'demo@aa.io';
    const password = 'password';
    await dispatch(sessionActions.login(email, password));
    history.push('/')
  };


  return (
    <>
      <form className='signUpForm' onSubmit={onSignUp}>
        <div className='createAccount'>
          Create Account
        </div>
        <div className='signUpErrors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
        <div>Your Name</div>
          <label className='formFieldInput'>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            />
          <span className='placeholder'>First and last name</span>
          </label>
        </div>
        <div>
        <div>Email</div>
          <label className='formFieldInput'>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            />
          </label>
        </div>
        <div>
        <div>Password</div>
          <label className='formFieldInput'>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            />
            <span className='placeholder'>At least 6 characters</span>
          </label>
        </div>
        <div>
        <div>Re-Password</div>
          <label className='formFieldInput'>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
            />
          </label>
        </div>
        <button className='loginButton' type='submit'>Create Account</button>
      </form>

      <button onClick={handleDemoUser}>Log in with Demo User</button>
  
    </>
  );
};

export default SignUpForm;
