import React from 'react'
import './NavBar.css'
import nav_logo from '../../assets/nav-logo.png'
import navProfile from '../../assets/nav-profile.svg';
export const NavBar = () => {
  return (
    <div className='navbar'>  

       <img className="nav-logo" src={nav_logo} alt="" />
       <img className='nav-profile' src={navProfile} alt="" />

    </div>
  )
}
export default NavBar;