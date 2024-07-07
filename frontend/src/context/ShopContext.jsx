import React, { createContext, useState } from 'react';
import all_product from '../Components/Assets/all_product.js';

export const ShopContext = createContext(null);

const getDefaultCart  = ()=>{
    let cart = {};
    for (let i = 0; i < all_product.length+1; i++) {
        cart[i] = 0;
    }
    return cart
}

const ShopContextProvider = (props)=>{
 const [cartItems,setcartItems] = useState(getDefaultCart())
 const addToCart = (itemId)=>{
    setcartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    console.log(cartItems);
 }
 const removeFromCart = (itemId)=>{
    setcartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
 }

 const getTotalCartAmount = ()=>{
    let totalAmount = 0;
    for(const item in cartItems){
        if(cartItems[item]>0){
            let iteminfo = all_product.find((product)=>product.id===Number(item))
            totalAmount+=iteminfo.new_price * cartItems[item]
        }
       
    }
    return totalAmount
 }

 const getTotalCartItems = ()=>{
    let totalItem = 0;
    for(const item in cartItems){
        if(cartItems[item]>0){
            totalItem+=cartItems[item]
        }
    
    }
    return totalItem 
 } 
 const contextValue = {all_product,cartItems,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems};
 return (
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
 ) 
} 


export default ShopContextProvider;