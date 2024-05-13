import apiAuth from '@/Api/apiAuth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { login as authLogin } from '@/features/authSlice'


const AuthLayout = ({ children }) => {

  const authStatus = useSelector(state => state.auth.status)
  const dispatch = useDispatch()
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {

      const getCurrentUser = await apiAuth.getCurrentUser()
      


      if (!getCurrentUser || getCurrentUser ==="" ) {
        const refreshAccess = await apiAuth.refreshAccessToken()
        if (!refreshAccess) {
          navigate("/login")
          console.log("first")
          return null
        }
      }

      if (getCurrentUser) {
        console.log("hello")
        console.log(getCurrentUser.data.data)
        // navigate("/")
        return dispatch(authLogin(getCurrentUser.data.data))
      } else {
        console.log("wow")
        const refreshAccess = await apiAuth.refreshAccessToken()
        if (!refreshAccess) {
          return null
        }
      }



    })()
    setLoader(false)
  }, [navigate])

  return loader ? <h1>Loading</h1> : <>{children}<Outlet /></>
}

export default AuthLayout