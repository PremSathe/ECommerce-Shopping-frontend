// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   approvalURL: null,
//   isLoading: false,
//   orderId: null,
//   orderList: [],
//   orderDetails: null,
// };

// export const createNewOrder = createAsyncThunk(
//   "/order/createNewOrder",
//   async (orderData) => {
//     const response = await axios.post(
//       "http://localhost:5000/api/shop/order/create",
//       orderData
//     );

//     return response.data;
//   }
// );

// export const capturePayment = createAsyncThunk(
//   "/order/capturePayment",
//   async ({ paymentId, payerId, orderId }) => {
//     const response = await axios.post(
//       "http://localhost:5000/api/shop/order/capture",
//       {
//         paymentId,
//         payerId,
//         orderId,
//       }
//     );

//     return response.data;
//   }
// );

// export const getAllOrdersByUserId = createAsyncThunk(
//   "/order/getAllOrdersByUserId",
//   async (userId) => {
//     const response = await axios.get(
//       `http://localhost:5000/api/shop/order/list/${userId}`
//     );

//     return response.data;
//   }
// );

// export const getOrderDetails = createAsyncThunk(
//   "/order/getOrderDetails",
//   async (id) => {
//     const response = await axios.get(
//       `http://localhost:5000/api/shop/order/details/${id}`
//     );

//     return response.data;
//   }
// );

// const shoppingOrderSlice = createSlice({
//   name: "shoppingOrderSlice",
//   initialState,
//   reducers: {
//     resetOrderDetails: (state) => {
//       state.orderDetails = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createNewOrder.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(createNewOrder.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.approvalURL = action.payload.approvalURL;
//         state.orderId = action.payload.orderId;
//         sessionStorage.setItem(
//           "currentOrderId",
//           JSON.stringify(action.payload.orderId)
//         );
//       })
//       .addCase(createNewOrder.rejected, (state) => {
//         state.isLoading = false;
//         state.approvalURL = null;
//         state.orderId = null;
//       })
//       .addCase(getAllOrdersByUserId.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.orderList = action.payload.data;
//       })
//       .addCase(getAllOrdersByUserId.rejected, (state) => {
//         state.isLoading = false;
//         state.orderList = [];
//       })
//       .addCase(getOrderDetails.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getOrderDetails.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.orderDetails = action.payload.data;
//       })
//       .addCase(getOrderDetails.rejected, (state) => {
//         state.isLoading = false;
//         state.orderDetails = null;
//       });
//   },
// });

// export const { resetOrderDetails } = shoppingOrderSlice.actions;

// export default shoppingOrderSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  orderId: null,
  orderList: [],
  orderDetails: null,
  isLoading: false,
  error: null,
};

export const createNewOrder = createAsyncThunk(
  "shopOrder/createNewOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/shop/order/create",
        orderData
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

export const capturePayment = createAsyncThunk(
  "shopOrder/capturePayment",
  async ({ paymentId, payerId, orderId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/shop/order/capture",
        { paymentId, payerId, orderId }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

export const getAllOrdersByUserId = createAsyncThunk(
  "shopOrder/getAllOrdersByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/order/list/${userId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "shopOrder/getOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/order/details/${id}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

const shoppingOrderSlice = createSlice({
  name: "shopOrder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create New Order
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL || null;
        state.orderId = action.payload.orderId || null;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || "Failed to create a new order.";
      })
      // Get All Orders
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data || [];
      })
      .addCase(getAllOrdersByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch user orders.";
        state.orderList = [];
      })
      // Get Order Details
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data || null;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || "Failed to fetch order details.";
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
