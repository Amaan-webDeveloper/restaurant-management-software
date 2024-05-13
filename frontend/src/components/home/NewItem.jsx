import apiService from '@/Api/apiService'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewItem = () => {
    const [loader, setloader] = useState(false)
    const [foodItemImage, setimage] = useState(null)
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [number, setNumber] = useState(0)
    const navigate = useNavigate()
    const onSubmit= async(e)=>{
        e.preventDefault()

        try {
            const res = await apiService.newItem(foodItemImage,name,price,number)
            if (res) {
                console.log(res)
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        loader?(
    <div className = "container mx-auto flex min-h-screen w-full items-center justify-center gap-4 bg-black text-white" >
                <p>Loading..</p>
    </div >): (
    <div className="container mx-auto flex flex-col py-10 min-h-screen w-full items-center gap-4 bg-black text-white">
        <form onSubmit={(e)=>onSubmit(e)}>

            <p>Image</p>
            <Input type="file" onChange={(e)=>
                setimage(e.target.files[0])} className="bg-slate-800"  />
            <p>Name</p>
            <Input value={name} onChange={(e)=>setName(e.target.value)} className="bg-slate-800" type="text" />
            <p>Price</p>
            <Input value={price} onChange={(e)=>setPrice(e.target.value)} className="bg-slate-800" type="number" />
            <p>Number</p>
            <Input value={number} onChange={(e)=>setNumber(e.target.value)} className="bg-slate-800" type="number" />

            <Button className="my-4" type="submit">Submit</Button>

        </form>
    </div>
))
}

export default NewItem