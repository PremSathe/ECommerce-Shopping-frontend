// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   orderList: [],
//   orderDetails: null,
// };

// export const getAllOrdersForAdmin = createAsyncThunk(
//   "/order/getAllOrdersForAdmin",
//   async () => {
//     const response = await axios.get(
//       `http://localhost:5000/api/admin/orders/get`
//     );

//     return response.data;
//   }
// );

// export const getOrderDetailsForAdmin = createAsyncThunk(
//   "/order/getOrderDetailsForAdmin",
//   async (id) => {
//     const response = await axios.get(
//       `http://localhost:5000/api/admin/orders/details/${id}`
//     );

//     return response.data;
//   }
// );

// export const updateOrderStatus = createAsyncThunk(
//   "/order/updateOrderStatus",
//   async ({ id, orderStatus }) => {
//     const response = await axios.put(
//       `http://localhost:5000/api/admin/orders/update/${id}`,
//       {
//         orderStatus,
//       }
//     );

//     return response.data;
//   }
// );

// const adminOrderSlice = createSlice({
//   name: "adminOrderSlice",
//   initialState,
//   reducers: {
//     resetOrderDetails: (state) => {
//       console.log("resetOrderDetails");

//       state.orderDetails = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getAllOrdersForAdmin.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.orderList = action.payload.data;
//       })
//       .addCase(getAllOrdersForAdmin.rejected, (state) => {
//         state.isLoading = false;
//         state.orderList = [];
//       })
//       .addCase(getOrderDetailsForAdmin.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.orderDetails = action.payload.data;
//       })
//       .addCase(getOrderDetailsForAdmin.rejected, (state) => {
//         state.isLoading = false;
//         state.orderDetails = null;
//       });
//   },
// });

// export const { resetOrderDetails } = adminOrderSlice.actions;

// export default adminOrderSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orderList: [],
  orderDetails: null,
  isLoading: false,
  error: null,
};

export const getAllOrdersForAdmin = createAsyncThunk(
  "adminOrder/getAllOrdersForAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/orders/get"
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "adminOrder/getOrderDetailsForAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin/orders/details/${id}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "adminOrder/updateOrderStatus",
  async ({ id, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/orders/update/${id}`,
        { orderStatus }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Orders
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data || [];
      })
      .addCase(getAllOrdersForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch orders.";
        state.orderList = [];
      })
      // Get Order Details
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data || null;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || "Failed to fetch order details.";
        state.orderDetails = null;
      })
      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = {
          ...state.orderDetails,
          orderStatus: action.payload?.data?.orderStatus || "updated",
        };
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || "Failed to update order status.";
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
