import React from 'react';
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom';
import {Root} from '../pages/Root';
import {Home} from '../pages/Home';
import { Products } from '../pages/Products';
import { Users } from '../pages/Users';
import { Categories } from '../pages/Categories';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element= {<Root/>}>
             <Route path='/' element={<Home/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/categories' element={<Categories/>}/>
        </Route>
    )
)



export const AppRouter = () => {
  return (
    <RouterProvider router={router}/>
    )
}
