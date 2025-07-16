// import { Outlet } from "react-router-dom";

// function AuthLayout() {
//   return (
//     <div className="flex min-h-screen w-full">
//       <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
//         <div className="max-w-md space-y-6 text-center text-primary-foreground">
//           <h1 className="text-4xl font-extrabold tracking-tight">
//             Welcome to ECommerce Shopping
//           </h1>
//         </div>
//       </div>
//       <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default AuthLayout;

// _______________________________________________________//

import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Left Side: Hero Section */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 px-12 text-white backdrop-blur-sm bg-opacity-40">
        <div className="space-y-6 max-w-lg text-center animate-fade-in">
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
            Welcome to <span className="text-yellow-300">Zyra</span>
          </h1>
          <p className="text-lg leading-relaxed text-white/80">
            Discover, shop, and experience the future of eCommerce with Zyra.
            Premium products, seamless checkout, and PayPal integration for
            hassle-free payments.
          </p>
          <img
            src="https://plus.unsplash.com/premium_photo-1728288594640-f0375c2a8180?q=80&w=1170&auto=format&fit=crop"
            alt="Shopping Illustration"
            className="rounded-2xl shadow-2xl mt-6"
          />
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex flex-1 items-center justify-center bg-white rounded-l-3xl shadow-2xl px-6 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
