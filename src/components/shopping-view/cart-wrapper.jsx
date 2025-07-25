// import { useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
// import UserCartItemsContent from "./cart-items-content";

// function UserCartWrapper({ cartItems, setOpenCartSheet }) {
//   const navigate = useNavigate();

//   const totalCartAmount =
//     cartItems && cartItems.length > 0
//       ? cartItems.reduce(
//           (sum, currentItem) =>
//             sum +
//             (currentItem?.salePrice > 0
//               ? currentItem?.salePrice
//               : currentItem?.price) *
//               currentItem?.quantity,
//           0
//         )
//       : 0;

//   return (
//     <SheetContent className="sm:max-w-md">
//       <SheetHeader>
//         <SheetTitle>Your Cart</SheetTitle>
//       </SheetHeader>
//       <div className="mt-8 space-y-4">
//         {cartItems && cartItems.length > 0
//           ? cartItems.map((item) => <UserCartItemsContent cartItem={item} />)
//           : null}
//       </div>
//       <div className="mt-8 space-y-4">
//         <div className="flex justify-between">
//           <span className="font-bold">Total</span>
//           <span className="font-bold">${totalCartAmount}</span>
//         </div>
//       </div>
//       <Button
//         onClick={() => {
//           navigate("/shop/checkout");
//           setOpenCartSheet(false);
//         }}
//         className="w-full mt-6"
//       >
//         Checkout
//       </Button>
//     </SheetContent>
//   );
// }

// export default UserCartWrapper;

// ____________________________________________________________________________

import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md flex flex-col">
      {/* Header */}
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      {/* Scrollable Cart Items */}
      <div className="flex-1 overflow-y-auto mt-4 space-y-4 pr-2">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent
              key={item._id || item.id || item.productId}
              cartItem={item}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>

      {/* Total & Checkout */}
      <div className="mt-4 border-t pt-4 space-y-4">
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${totalCartAmount.toFixed(2)}</span>
        </div>
        <Button
          onClick={() => {
            navigate("/shop/checkout");
            setOpenCartSheet(false);
          }}
          className="w-full"
        >
          Checkout
        </Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
