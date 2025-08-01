import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

export const Store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default Store;




// import { configureStore } from '@reduxjs/toolkit' 
// import { CartSlice } from './CartSlice'

// export const Store = configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
// })
// export default  Store