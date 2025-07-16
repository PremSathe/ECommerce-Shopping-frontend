// import { useSelector } from "react-redux";
// import { Badge } from "../ui/badge";
// import { DialogContent } from "../ui/dialog";
// import { Label } from "../ui/label";
// import { Separator } from "../ui/separator";

// function ShoppingOrderDetailsView({ orderDetails }) {
//   const { user } = useSelector((state) => state.auth);

//   return (
//     <DialogContent className="sm:max-w-[600px]">
//       <div className="grid gap-6">
//         <div className="grid gap-2">
//           <div className="flex mt-6 items-center justify-between">
//             <p className="font-medium">Order ID</p>
//             <Label>{orderDetails?._id}</Label>
//           </div>
//           <div className="flex mt-2 items-center justify-between">
//             <p className="font-medium">Order Date</p>
//             <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
//           </div>
//           <div className="flex mt-2 items-center justify-between">
//             <p className="font-medium">Order Price</p>
//             <Label>${orderDetails?.totalAmount}</Label>
//           </div>
//           <div className="flex mt-2 items-center justify-between">
//             <p className="font-medium">Payment method</p>
//             <Label>{orderDetails?.paymentMethod}</Label>
//           </div>
//           <div className="flex mt-2 items-center justify-between">
//             <p className="font-medium">Payment Status</p>
//             <Label>{orderDetails?.paymentStatus}</Label>
//           </div>
//           <div className="flex mt-2 items-center justify-between">
//             <p className="font-medium">Order Status</p>
//             <Label>
//               <Badge
//                 className={`py-1 px-3 ${
//                   orderDetails?.orderStatus === "confirmed"
//                     ? "bg-green-500"
//                     : orderDetails?.orderStatus === "rejected"
//                     ? "bg-red-600"
//                     : "bg-black"
//                 }`}
//               >
//                 {orderDetails?.orderStatus}
//               </Badge>
//             </Label>
//           </div>
//         </div>
//         <Separator />
//         <div className="grid gap-4">
//           <div className="grid gap-2">
//             <div className="font-medium">Order Details</div>
//             <ul className="grid gap-3">
//               {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
//                 ? orderDetails?.cartItems.map((item) => (
//                     <li className="flex items-center justify-between">
//                       <span>Title: {item.title}</span>
//                       <span>Quantity: {item.quantity}</span>
//                       <span>Price: ${item.price}</span>
//                     </li>
//                   ))
//                 : null}
//             </ul>
//           </div>
//         </div>
//         <div className="grid gap-4">
//           <div className="grid gap-2">
//             <div className="font-medium">Shipping Info</div>
//             <div className="grid gap-0.5 text-muted-foreground">
//               <span>{user.userName}</span>
//               <span>{orderDetails?.addressInfo?.address}</span>
//               <span>{orderDetails?.addressInfo?.city}</span>
//               <span>{orderDetails?.addressInfo?.pincode}</span>
//               <span>{orderDetails?.addressInfo?.phone}</span>
//               <span>{orderDetails?.addressInfo?.notes}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </DialogContent>
//   );
// }

// export default ShoppingOrderDetailsView;

import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto p-8 bg-white rounded-3xl shadow-2xl border border-gray-200">
      <div className="grid gap-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">
            📝 Order Summary
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Review all details of your order
          </p>
        </div>

        <Separator className="my-4" />

        {/* Order Meta */}
        <div className="grid gap-4">
          {[
            { label: "Order ID", value: orderDetails?._id },
            {
              label: "Order Date",
              value: orderDetails?.orderDate?.split("T")[0],
            },
            {
              label: "Order Price",
              value: `💵 $${orderDetails?.totalAmount}`,
            },
            { label: "Payment Method", value: orderDetails?.paymentMethod },
            { label: "Payment Status", value: orderDetails?.paymentStatus },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition"
            >
              <p className="font-medium text-gray-700">{item.label}</p>
              <Label className="text-gray-900">{item.value}</Label>
            </div>
          ))}

          {/* Order Status with Badge */}
          <div className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition">
            <p className="font-medium text-gray-700">Order Status</p>
            <Badge
              className={`py-1 px-4 rounded-full shadow text-white ${
                orderDetails?.orderStatus === "confirmed"
                  ? "bg-green-500"
                  : orderDetails?.orderStatus === "rejected"
                  ? "bg-red-500"
                  : "bg-gray-400"
              }`}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Cart Items */}
        <div className="grid gap-4">
          <h3 className="text-xl font-semibold text-gray-800">
            🛒 Order Items
          </h3>
          <ul className="grid gap-3">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? (
              orderDetails.cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <span className="font-medium text-gray-800">
                    📦 {item.title}
                  </span>
                  <span className="text-gray-600">Qty: {item.quantity}</span>
                  <span className="font-semibold text-gray-900">
                    💵 ${item.price}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-gray-500 italic">No items in this order.</p>
            )}
          </ul>
        </div>

        <Separator className="my-4" />

        {/* Shipping Info */}
        <div className="grid gap-3">
          <h3 className="text-xl font-semibold text-gray-800">
            🚚 Shipping Info
          </h3>
          <div className="grid gap-1.5 text-gray-600 text-sm">
            <span>👤 {user?.userName}</span>
            <span>🏠 {orderDetails?.addressInfo?.address}</span>
            <span>
              📍 {orderDetails?.addressInfo?.city},{" "}
              {orderDetails?.addressInfo?.pincode}
            </span>
            <span>📞 {orderDetails?.addressInfo?.phone}</span>
            <span>📝 {orderDetails?.addressInfo?.notes}</span>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
