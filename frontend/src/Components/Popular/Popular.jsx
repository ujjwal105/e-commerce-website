import React, { useEffect, useState } from 'react'
import './Popular.css';
import { Items } from '../Items/Items';
export const Popular = () => {

  const [popularProducts,setPopularProducts] = useState([])

  const fetchProducts = () => {
    fetch('http://localhost:4000/popularinwomen')
        .then((res) => res.json())
        .then((data) => {
          setPopularProducts(data);
        })
        .catch((error) => console.error('Error fetching popular products:', error));
};

useEffect(() => {
    fetchProducts();
}, []);


  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-item">
            {popularProducts.map((items,i)=>{
                return <Items key={i} id = {items.id} name = {items.name} image = {items.image} new_price = {items.new_price} old_price = {items.old_price}/>
            })}
        </div>
        
    </div>
  )
}
