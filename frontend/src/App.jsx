import React from 'react'

import { Route, Routes } from 'react-router-dom'
import { AuthLayout, Home, Login, NewOrder, Register, TodaysOrders } from './components'
import NewItem from './components/home/NewItem'

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route element={<AuthLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/admin/new-item' element={<NewItem />} />
        <Route path='/todays-orders' element={<TodaysOrders />} />

        <Route path='/new-order' element={<NewOrder />} />
      </Route>



    </Routes>
  )
}

export default App