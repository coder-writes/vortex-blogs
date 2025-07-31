import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router'
import SideBar from '../../components/admin/SideBar'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {


  const {axios,navigate,setToken} = useAppContext();

  const logout = async () =>{
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null);
    navigate('/')
  }

  return (
    <>
    <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>

      <img src={assets.logo} alt=""  className='w-32 sm:w-40 cursor-pointer' onClick={()=> navigate('/')} />
      <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button>
    </div>
    <div className='flex h-[calc(100vh-70px)]'>
      <SideBar/>
      <Outlet/>
    </div>
    </>
  )
}

export default Layout
