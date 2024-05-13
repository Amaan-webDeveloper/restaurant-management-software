
import { useEffect } from "react"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { newOrder } from "@/features/authSlice"


const ItemCard = ({foodItem}) => {

    const dispatch = useDispatch()
    const orderDispatch =(i)=>{
        if (i) {
            return dispatch(newOrder(foodItem))
        }
    }

    
    return (
        <div onClick={()=>{orderDispatch(foodItem)}} className="bg-slate-900 hover:bg-blue-900 flex flex-col py-2 rounded-lg px-8 text-white relative">
            <div className="w-40 mb-2">
                <img className="object-cover" src={"http://localhost:3000"+foodItem.imageUrl} alt="" />

                <h1 className="text-xl leading-none underline">{foodItem.name}</h1>
                
            </div>
            <div>
                <p>Number: {foodItem.number}</p>
            </div>
            <div>
                <p>Price: {foodItem.price}</p>
            </div>
            
        </div>

    )
}

export default ItemCard