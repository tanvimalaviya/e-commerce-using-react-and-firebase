import { createSlice } from "@reduxjs/toolkit";


const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];
console.log(initialState)


export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart(state, action) {
      state.push(action.payload);
    },
    deleteFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload.id);
    },
    incrementQuantity(state, action) {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity(state, action) {
      const item = state.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
  },
});

export const { addTocart, deleteFromCart, incrementQuantity, decrementQuantity } = CartSlice.actions;
export default CartSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";

// const initialState = [];

// export const CartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addTocart(state, action) {
//       state.push(action.payload);
//     },
//     deleteFromCart(state, action) {
//       return state.filter((item) => item.id !== action.payload.id);
//     },
//     incrementQuantity: (state, action) => {
//       state = state.map((item) => {
//         if (item.id === action.payload) {
//           item.quantity++;
//         }
//         return item;
//       });
//     },
//     decrementQuantity: (state, action) => {
//       state = state.map((item) => {
//         if (item.quantity !== 1) {
//           if (item.id === action.payload) {
//             item.quantity--;
//           }
//         }
//         return item;
//       });
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { addTocart, deleteFromCart, incrementQuantity, decrementQuantity } = CartSlice.actions

// export default CartSlice.reducer