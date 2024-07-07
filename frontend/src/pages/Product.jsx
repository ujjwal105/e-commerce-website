import React, { useContext } from 'react'
import all_product from '../Components/Assets/all_product'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom'
import { BreadCrum } from '../Components/BreadCrum/BreadCrum'
import { ProductDisplay } from '../Components/ProductDisplay/ProductDisplay'
import { DiscriptionBox } from '../Components/DiscriptionBox/DiscriptionBox'
import { RelatedProduct } from '../Components/RelatedProduct/RelatedProduct'

export const Product = () => {
  const { all_product }= useContext(ShopContext)
  const {productId} = useParams();
  const product = all_product.find((e)=>  e.id === Number(productId))
  return (
    <div>
        <BreadCrum product = {product}/>
        <ProductDisplay product={product}/>
        <DiscriptionBox/>
        <RelatedProduct/>
    </div>
  )
}
