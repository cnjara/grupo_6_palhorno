
/**------------------- */
import React from 'react'
import {Link} from 'react-router-dom';



export const SideBar = () => {
  return (
    <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

    <Link className="sidebar-brand " to="/">
        <div className="sidebar-brand-icon">
            <img className="w-100 images/logo.webp"
             src="images/logo-mini.webp" alt="PalHorno"/>
        </div>
    </Link>

    
    <hr className="sidebar-divider my-0"/>

    

</ul>
)
}
