import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {

 const [product,setProduct] = useState([])
 const [cart,setCart] = useState([])


 useEffect(() => {

    fetch('products.json')
    .then(res => res.json())
    .then(data => setProduct(data))
 },[])


 const handleAddToCart = (product) => {

    // console.log(product);
  
    const newCart = [...cart, product]
    setCart(newCart);

}



    return (
        <div className='shop-container'>
          <div className="product-container">
     {

        product.map(product => <Product 
            key={product.id}
            handleAddToCart={handleAddToCart}
            product={product}
            
            
            ></Product>)
     }
          </div>
          <div className="card-container">
           <Cart cart={cart}></Cart>
          </div>
        </div>
    );
};

export default Shop;