import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import SplashPage from './components/SplashPage';
import HomePage from './components/HomePage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
// alex-code
import BooksList from './components/BooksListAlex';
// alex-code
import User from './components/User';
import { authenticate } from './store/session';
import BookById from './components/BookByIdAlex';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)


  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {sessionUser && <NavBar />}
      <Switch>
        <Route path='/' exact={true}>
            <SplashPage />
        </Route>
        {/* <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route> */}
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        {/* alex-code */}
        <Route path='/books' exact={true} >
          <BooksList/>
        </Route>
        <Route path='/books/:id' exact={true} >
          <BookById/>
        </Route>
        {/* alex-code */}
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        {/* <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute> */}
        <Route>
          <h1>404 - Page Not Found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
