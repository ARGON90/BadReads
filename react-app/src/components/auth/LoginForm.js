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
    return <Redirect to='/books' />;
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
            <li key={ind}>{error.split(":")[1]}</li>
          ))}
        </div>
        <div>
        <div className='formText'>Email</div>
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
        <div className='formText' >Password</div>
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
          <button className='splashSubmitButton' type='submit'>Sign in</button>
        </div>
        <button className='splashSubmitButton' onClick={handleDemo}>Demo User</button>
      </form>
      <div className="splashLogInDiv">
      <div className='switchFormText'>
        Not a member?
        <button className='switchFormButton' onClick={handleSignUp}> Sign up</button>
      </div>
      </div>
    </>
  );
};

export default LoginForm;
