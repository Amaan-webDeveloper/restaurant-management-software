import apiService from '@/Api/apiService'
import { Input } from '../ui/input'
import React, { useEffect, useId, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import ItemCard from '../helper/ItemCard'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeOrderItem } from '@/features/authSlice'

const Home = () => {
  const [items, setitems] = useState([])
  // const uniqueId = 
  const [itemNumber, setItemNumber] = useState("")
  const [isAdmin, setisAdmin] = useState(true)
  const orders = useSelector(state => state.auth.orderData)

  const [total, setTotal] = useState(0)
  const dispatch = useDispatch()



  const getItems = async()=>{
    try {
      const res = await apiService.getFooditems(itemNumber)
      if (res) {
        setitems(res.data.data)
        console.log(res)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // console.log(orders)
    orders.map((i)=>{
      setTotal(total+i.price)
    })
  }, [orders,dispatch,removeOrderItem])
  
  

  useEffect(() => {
    getItems()
  }, [itemNumber])

  const removeItem =(id)=>{
    console.log(id)
    dispatch(removeOrderItem({orders,id}))
    // console.log(orders)
  }
  
  return (
    <div className="container mx-auto flex flex-col py-10 min-h-screen w-full items-center bg-black text-white">
      {isAdmin? <div className='my-4'><Link className='p-2 rounded-lg bg-slate-600' to={"/admin/new-item"}>Add new items</Link></div>:null}
    <div className='w-1/2'>
      <Input className="bg-slate-800" placeholder='Number' type="text" value={itemNumber} onChange={(e)=>{setItemNumber(Number(e.target.value))}} />
    </div>

    <div className='pt-8 flex flex-wrap gap-4'>
      {items.map((i)=>(
        <ItemCard key={i.number} foodItem={i}/>
      ))}
    </div>

    {orders?<div className='bg-gray-500 w-full mt-4 rounded-lg px-2 py-4'>
      <div className='flex flex-wrap gap-4'>
      {orders.map((i,index)=>(
        <div key={index} className='p-2 rounded-lg relative bg-blue-500'>
          <p>Name: {i.name}</p>
          <p>Price: {i.price}</p>
          <p>Number: {i.number}</p>
          <Button onClick={()=>{removeItem(i._id)}} className="relative bg-red-500 right-0">X</Button>
        </div>
      ))}
      </div>
      <div className='' >Total: {total}</div>
      <Button className="bg-green-400" onClick={()=>{}}>Confirm</Button>
    </div>:null}

      <ToastContainer position="bottom-center" autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce />
    </div>
  )
}

export default Home