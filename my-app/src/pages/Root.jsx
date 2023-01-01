import React from 'react'
import { Footer } from '../components/Footer'
import { SideBar } from '../components/SideBar'
import { TopBar } from '../components/TopBar'
//import { Home } from './Home'
import {Outlet} from 'react-router-dom'

export const Root = () => {
  return (
    <div id="wrapper">
        <SideBar/>
        <div id="content-wrapper" className='d-flex flex-column'>
        <div id="content">
            <TopBar/>
            <Outlet/>
          
            
        </div>
        <Footer/>
    </div>
        
    </div>
  )
}
