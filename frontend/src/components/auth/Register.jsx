import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import apiAuth from '@/Api/apiAuth';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate()
  const [error, seterror] = useState(null)

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await apiAuth.register(name, password)
      if (res) {
        const res = await apiAuth.login(name, password)
        if (res) {
          toast("cashier registered successfully")
          navigate("/")
        }
      }
    } catch (error) {
      seterror(error.response.data.message)
      console.log(error)
    }
  }



  return (
    <div className='h-screen w-full flex items-center justify-center flex-col'>
      <h1>Register</h1>


      <form onSubmit={(e) => onSubmit(e)} className="w-2/3 flex flex-col gap-6 p-10 rounded-lg">
        <div>
          <label>Name</label>
          <Input value={name} onChange={(e) => { setName(e.target.value) }} placeholder='chashier name' required />
        </div>

        <div>
          <label>Password</label>
          <Input value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="password" required />
        </div>

        <Button type="submit" className="bg-blue-600">Submit</Button>
      </form>
      {error?<p>{error}</p>:null}
      <Link to={"/login"}>Login?</Link>
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

export default Register