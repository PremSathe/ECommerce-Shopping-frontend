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
    <DialogContent className="sm:max-w-[650px] max-h-[80vh] overflow-y-auto p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl">
      <div className="grid gap-6">
        {/* Order Meta */}
        <div className="grid gap-4">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-700">Order ID</p>
            <Label className="text-gray-900">{orderDetails?._id}</Label>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-700">Order Date</p>
            <Label className="text-gray-900">
              {orderDetails?.orderDate?.split("T")[0]}
            </Label>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-700">Order Price</p>
            <Label className="text-gray-900">
              💵 ${orderDetails?.totalAmount}
            </Label>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-700">
              Payment Method
            </p>
            <Label className="text-gray-900">
              {orderDetails?.paymentMethod}
            </Label>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-700">
              Payment Status
            </p>
            <Label className="text-gray-900">
              {orderDetails?.paymentStatus}
            </Label>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-700">Order Status</p>
            <Badge
              className={`py-1 px-4 rounded-full shadow ${
                orderDetails?.orderStatus === "confirmed"
                  ? "bg-green-500/90 text-white"
                  : orderDetails?.orderStatus === "rejected"
                  ? "bg-red-500/90 text-white"
                  : "bg-gray-500/90 text-white"
              }`}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Cart Items */}
        <div className="grid gap-4">
          <p className="text-lg font-semibold text-gray-800">🛒 Order Items</p>
          <ul className="grid gap-3">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? (
              orderDetails.cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 shadow-inner hover:shadow-lg transition-all duration-300"
                >
                  <span className="font-medium text-gray-700">
                    📦 {item.title}
                  </span>
                  <span className="text-gray-600">Qty: {item.quantity}</span>
                  <span className="font-semibold text-gray-800">
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
          <p className="text-lg font-semibold text-gray-800">
            🚚 Shipping Info
          </p>
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
