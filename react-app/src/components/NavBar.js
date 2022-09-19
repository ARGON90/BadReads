import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './CSS/NavBar.css'


const NavBar = () => {
  const [ showDropdown, setShowDropdown ] = useState(false)
  const handleDropdown = () => {
    if (showDropdown) return
    setShowDropdown(true)
}

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
    <div className='navBarMainDiv'>
      <div className='navBarContainer'>
        <div className='navBarLeft'>
          <div className='navBarLogoDiv'>
            <NavLink to='/books' exact={true}>
             <img className="navBarLogo" src={IMAGE('badreads.png')} alt='badreads logo' />
            </NavLink>
          </div>
          <div className='navBarLinksContainer'>
            <NavLink className='navBarHomeLink' to='/books' exact={true} activeClassName='active'>
              Home 
            </NavLink>
          </div>
          <div className='navBarLinksContainer'>
            <NavLink className='navBarMyBooksLink' to='/my-books' exact={true} activeClassName='active'>
              My Books
            </NavLink>
          </div>
        </div>
        <div className='navBarRight'>
          <div className='navBarRightMenu'>
            <button onClick={handleDropdown} className='navBarDropDownMenu'/>
            {showDropdown &&
            <div className='navBarDropDownContainer'>
              <div className='navBarDMenuProfile'>Profile</div>
              <div className='navBarDMenuBookshelve'>
                <NavLink to="/bookshelves" exact={true} activeClassName='active'>
                  Bookshelves
                </NavLink>
              </div>
              <LogoutButton />
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
