import React from 'react'
import { Footer } from '../components/Footer'
import { SideBar } from '../components/SideBar'
import { TopBar } from '../components/TopBar'
import { Home } from './Home'

export const Root = () => {
  return (
    <div id="wrapper">
        <SideBar/>
        <div id="content-wrapper" className='d-flex flex-column'>
        <div id="content">
            <TopBar/>

            <Home/>
            
        </div>
        <Footer/>
    </div>
        
    </div>
  )
}
