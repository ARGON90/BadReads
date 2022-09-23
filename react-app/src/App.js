import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import SplashPage from './components/SplashPage';

import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import BooksList from './components/BooksListAlex';
import User from './components/User';
import { authenticate } from './store/session';
import BookById from './components/BookByIdAlex';
import Bookshelves from './components/Bookshelves';
import UserBooks from './components/UserBooks';
import NotFound from './components/NotFound'



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    (async () => {
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
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <Route path='/books' exact={true} >
          <BooksList />
        </Route>
        <Route path='/books/:id' exact={true} >
          <BookById />
        </Route>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/bookshelves' exact={true}>
          <Bookshelves />
        </Route>
        <Route path='/my-books' exact={true}>
          <UserBooks />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
