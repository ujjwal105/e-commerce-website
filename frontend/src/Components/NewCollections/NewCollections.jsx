import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import { Items } from '../Items/Items'
export const NewCollections = () => {
  const [new_Collection,setnew_Collection] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:4000/newcollection')
    .then((response)=>response.json())
    .then((data)=>setnew_Collection(data));
  },[])
  return (
    <div className='new-collections'>
        <h1> 
            NEW COLLECTIONS 
        </h1>
        <hr />
        <div className="collecions">
            {new_Collection.map((items,i)=>{
                return <Items  key={i} id = {items.id} name = {items.name} image = {items.image} new_price = {items.new_price} old_price = {items.old_price}/>
            })}
        </div>
    </div>
  )
}
