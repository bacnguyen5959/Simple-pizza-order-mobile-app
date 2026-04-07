import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';
import CartScreen from './screens/CartScreen';
import AccountScreen from './screens/AccountScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(prevCart => [...prevCart, { ...item, cartId: Date.now().toString() + Math.random() }]);
  };

  const removeFromCart = (cartId) => {
    setCart(prevCart => prevCart.filter(item => item.cartId !== cartId));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} cart={cart} />}
        </Stack.Screen>
        <Stack.Screen name="Order">
          {props => <OrderScreen {...props} addToCart={addToCart} />}
        </Stack.Screen>
        <Stack.Screen name="Cart">
          {props => <CartScreen {...props} cart={cart} removeFromCart={removeFromCart} />}
        </Stack.Screen>
        <Stack.Screen name="Account">
          {props => <AccountScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
