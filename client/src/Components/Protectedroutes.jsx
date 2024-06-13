import React from 'react'
import Login from './Login';
import { Outlet } from 'react-router-dom';



const Protectedroutes = () => {
    let auth={'token':true}
  return auth.token ?<Outlet/>: <Login/>;
};

export default Protectedroutes