import React, { useEffect, useState } from 'react'
import { CiHeart, CiSearch, CiShoppingCart } from 'react-icons/ci'
import { IoPersonOutline } from 'react-icons/io5'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { productServices, userServices } from '../services/apiServices'
import { Badge } from 'antd'

function Navbar() {

  const {token, getUserAuth} = useAuth()
  const [cartTotal, setCartTotal] = useState([])
  const navigate = useNavigate()

  const logout = ()=>{
    userServices.logout()
    getUserAuth()
    navigate("/")
  }

  const fetchCart = async () => {
    const res = await productServices.getCart()
    if(typeof res !== "string"){
      setCartTotal(res.length)
      console.log(res)
    }else{
      setCartTotal(0)
    }
  }

  useEffect(()=>{
    getUserAuth()
    fetchCart()
    userServices.getUser()
  },[token, getUserAuth, userServices.getUser, fetchCart])

  return (
    <div className='fixed top-0 left-0 w-[100%] z-50'>
       <div className="flex justify-between  top-0 left-0 w-full py-5  items-center flex-wrap bg-white  px-5 shadow-md">
              <div className="flex-1">
                <div className="flex justify-between items-center w-[250px] h-[30px] rounded-md p-2 text-sm border border-gray-300 bg-white">
                  <form action=""> <input type="search" placeholder="Search products" className="border-none outline-none p-2 w-[200px]" /></form>
                  <Link to={'/'}><CiSearch /></Link>
                </div>
              </div>
      
              <h1 className="text-2x1 font-bold flex-1 text-center">ALEENA JEWELRY</h1>
              <div className="flex gap-3 items-center flex-1 justify-end">

               { token ? <Link to={'/profile'}><IoPersonOutline size={25} /></Link> : null}
      
                <Link to={'/'}><CiHeart size={25} /></Link>
                <Link to={'/cart'}>
                  <Badge count={cartTotal}><CiShoppingCart size={25}/></Badge>
                </Link>
              </div>
      
            </div>
    <nav className="flex justify-between top-15 left-0 w-full  items-center flex-wrap font-medium px-6 py-2 bg-white p-5 shadow-sm">
    <div className="flex gap-2 justify-center items-center text-sm font-medium">
      <Link to={'/'}>BROWSE CATEGORIES</Link>
      <Link to={'/'}><RiArrowDropDownLine /></Link>
    </div>
    <div className="flex gap-2 justify-center text-sm font-medium  items-center">
      <Link to={'/'}>HOME</Link>
      <Link className="text-lg" to={'/'}><RiArrowDropDownLine /></Link>
      <Link to={'/products'}>PRODUCT</Link>
      <Link className="text-lg"to={'/'}><RiArrowDropDownLine /></Link>
      <Link to={'/aboutus'}>ABOUT US</Link>
      <Link className="text-lg"to={'/'}><RiArrowDropDownLine /></Link>
      <Link to={'/contactus'}>CONTACT US</Link>
      <Link className="text-lg" to={'/'}><RiArrowDropDownLine /></Link>
    </div>
    <div className="text-sm flex gap-3 font-medium">
    {token ? 
    <button 
      className='bg-red-500 text-white py-1 px-2 cursor-pointer rounded border-none'
      onClick={logout}
      >
      logout
      </button> : <>
      <Link to={'/login'}>LOG IN</Link>
      <Link to={'/signup'}>SIGN UP</Link>
     </>}
    </div>
  </nav>

      
    </div>
  )
}

export default Navbar