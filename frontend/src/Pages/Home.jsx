import React, { useState, useEffect } from 'react';
import axios from 'axios';
import URL from '../../constant.js';
import HomeNavbar from '../components/HomeNavbar.jsx';
import HomeSection from '../components/HomeSection.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';
import ShowDishes from '../components/ShowDishes.jsx';
import ShowCart from '../components/ShowCart.jsx';

const Home = () => {
  const [dishes, setDishes] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [itemsToOrder, setItemsToOrder] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [totalAmount, setTotalAmount] = useState(0);

  const handleCart = async()=>{
    const requestData = {
      items: itemsToOrder
    };    
    try{
      const response = await axios.post(
        `${URL}/api/orders`,
        requestData,
        {
          withCredentials: true,
        }
      )
      if(response.data.menuItems){
        setCart(response.data.menuItems);
        setTotalAmount(response.data.totalAmount);
      }
      else{
        setCart([]);
      }
    }catch(err){
      console.log(`error while fetching cart ${err}`);
      setCart([]);
    }
  }

  useEffect(()=>{
    handleCart();
  },[]);

  useEffect(()=>{
    handleCart();
  },[itemsToOrder]);
  
  useEffect(() => {
    fetchDishes();
  }, []);

  const updateQuantity = (id, increment) => {
    setDishes(dishes.map(dish => {
      if (dish._id === id) {
        const newQuantity = dish.quantity + increment;
        setItemsToOrder(prevItems => {
          const existingItemIndex = prevItems.findIndex(item => item.menuItem === id);
          
          if (existingItemIndex !== -1) {
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: newQuantity >= 0 ? newQuantity : 1
            };
            return updatedItems;
          } else {
            return [...prevItems, {
              menuItem: id,
              quantity: newQuantity >= 0 ? newQuantity : 1
            }];
          }
        });
  
        return {
          ...dish,
          quantity: newQuantity >= 0 ? newQuantity : 1
        };
      }
      return dish;
    }));
  };

  const removeFromCart = (id)=>{
    setItemsToOrder(prevItems => {
      const updatedItems = prevItems.filter(item => item.menuItem !== id);
      return updatedItems;
    });
  }

  const fetchDishes = async () => {
    const response = await axios.get(
      `${URL}/api/menu`,
      {
        withCredentials: true,
      }
    )
    setDishes(response.data.menuItems);
  };

  function filterDishes() {
    return dishes.filter(dish => selectedCategory === 'All' || dish.category === selectedCategory);
  }

  const filteredDishes = filterDishes();

  return (
    <div className="min-h-screen bg-gray-50 font-merriweather">
      <HomeNavbar setShowCart={setShowCart} cart={cart}/>
      <HomeSection />
      <CategoryFilter setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
      <ShowDishes filteredDishes={filteredDishes} updateQuantity={updateQuantity}/>
      <ShowCart setShowCart={setShowCart} showCart={showCart} cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} totalAmount={totalAmount} />
    </div>
  );
};

export default Home;