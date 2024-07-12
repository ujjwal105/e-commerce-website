import React, { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext(null);

const getDefaultCart  = ()=>{
    let cart = {};
    for (let i = 0; i < 1000+1; i++) {
        cart[i] = 0;
    }
    return cart
}

const ShopContextProvider = (props)=>{

 const [cartItems,setcartItems] = useState(getDefaultCart())
 const [all_product,setAll_Product] = useState([]);

 const fetchProducts = () => {
    fetch('http://localhost:4000/allproduct')
        .then((res) => res.json())
        .then((data) =>setAll_Product(data))
        if (localStorage.getItem('auth-token')) {
        fetch('http://localhost:4000/getcart', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json',
            },
            body: "",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log('Cart data fetched:', data); // Log the fetched data
            if (data && typeof data === 'object') {
                setcartItems(data);
            } else {
                console.error('Invalid cart data:', data);
            }
        })
        .catch((error) => console.error('Error fetching cart:', error));
    }
};

useEffect(() => {
    fetchProducts();
}, []);


 const addToCart = (itemId)=>{
    setcartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    if(localStorage.getItem("auth-token")){
        fetch('http://localhost:4000/addtocart',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify({"itemId":itemId})
        }).then((res)=>{res.json()}).then((data)=>console.log(data));
    }
}
 const removeFromCart = (itemId)=>{
    setcartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    if(localStorage.getItem('auth-token')){
        fetch('http://localhost:4000/removefromcart',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify({"itemId":itemId})
        }).then((res)=>{res.json()}).then((data)=>console.log(data));
    }

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