import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import './CSS/NavBar.css'

const NavBar = () => {
  const [ showDropdown, setShowDropdown ] = useState(false)
  const handleDropdown = () => {
    if (showDropdown) return
    setShowDropdown(true)
  }

  const sessionUser = useSelector(state => state.session.user)

  const IMAGE = (img) => {
  return require(`../images/${img}`).default
  }



useEffect(() => {
    if (!showDropdown) return

    const closeDropdown = () => {
        setShowDropdown(false)
    }
    document.addEventListener("click", closeDropdown);

    return () => document.removeEventListener("click", closeDropdown);
}, [showDropdown])


  return (
    <>
    <div className='navBarMainDiv'>
      <div className='navBarHeader'>
        <img alt="hand wave icon" src="https://img.icons8.com/ios/50/000000/so-so.png" width="30" height="30"/>
        <h2>Welcome, {sessionUser.username} !</h2>
      </div>
      <div className='navBarContainer'>
        <div className='navBarLeft'>
          <div className='navBarLogoDiv'>
            <NavLink to='/books' exact={true}>
             <img className="navBarLogo" src={IMAGE('badreads.png')} alt='badreads logo' />
            </NavLink>
          </div>
          <div className='navBarLinksContainer'>
            <NavLink className='navBarLinksContainer' to='/books' exact={true} activeClassName='active'> 
            Home
            </NavLink>

          </div>
          <div className='navBarLinksContainer'>
            <NavLink className='navBarLinksContainer' to='/my-books' exact={true} activeClassName='active'>
            My Books
            </NavLink>
          </div>
        </div>
        <div className='navBarRight'>
          <div className='navBarRightMenu'>
            <div className='navbarHoverSquare'>
            <button onClick={handleDropdown} className='navBarDropDownMenu'>
              <div className="usernameLetter">
              {sessionUser.username[0]}
              </div>
            </button>
            </div>
            {showDropdown &&
            <div className='navBarDropDownContainer'>
              <div className='navBarDMenuName'>
              {sessionUser.username}
              </div>
              <div class="navBarBookshelveLink">
                <NavLink className='navBarDMenuText' to="/bookshelves" exact={true} activeClassName='active'>
                  Bookshelves
                </NavLink>
              </div>
              <div className="dDownMenuLine">
              <LogoutButton />
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default NavBar;
