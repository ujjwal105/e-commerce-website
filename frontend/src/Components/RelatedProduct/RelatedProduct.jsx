import React from 'react'
import './RelatedProduct.css'
import data_product from '../Assets/data'
import { Items } from '../Items/Items'
export const RelatedProduct = () => {
  return (
    <div className='relatedproduct'>
        <div className="relatedproduct">
            <h1> Related Products</h1>
            <hr />
            <div className="relatedproducts-item">
                {data_product.map((items,i)=>{
                    return <Items key={i} id = {items.id} name = {items.name} image = {items.image} new_price = {items.new_price} old_price = {items.old_price}/>
                })}
            </div>
        </div>
    </div>
  )
}
