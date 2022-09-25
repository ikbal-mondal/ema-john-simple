import { logDOM } from '@testing-library/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {

 const [product,setProduct] = useState([])
 const [cart,setCart] = useState([])


 useEffect(() => {
  console.log('before fetch');
    fetch('products.json')
    .then(res => res.json())
    .then(data => setProduct(data))
 },[])

useEffect( () => {
  console.log('storedCart local');
    const storedCart = getStoredCart()
    const savedCart = [];
    for(const id  in storedCart ) {

        const addedProduct = product.find(product => product.id === id) ;

        if(addedProduct){
        const quantity = storedCart[id];
        addedProduct.quantity = quantity
        savedCart.push(addedProduct);
        }

    }
  setCart(savedCart)
},[product])


 const handleAddToCart = (selectedProduct) => {
    let newCart = [];
    const exists = cart.find(product => product.id === selectedProduct)
     if(!exists){

        selectedProduct.quantity = 1 ; 
        newCart = [...cart, selectedProduct]
     }
      else{

        const rest = cart.filter(product => product.id !== selectedProduct);
        exists.quantity = exists + 1;
        newCart = [...rest, exists]
      }
    setCart(newCart);
    addToDb(selectedProduct.id)

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