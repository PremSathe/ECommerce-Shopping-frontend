// import CommonForm from "@/components/common/form";
// import { useToast } from "@/components/ui/use-toast";
// import { registerFormControls } from "@/config";
// import { registerUser } from "@/store/auth-slice";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

// const initialState = {
//   userName: "",
//   email: "",
//   password: "",
// };

// function AuthRegister() {
//   const [formData, setFormData] = useState(initialState);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   function onSubmit(event) {
//     event.preventDefault();
//     dispatch(registerUser(formData)).then((data) => {
//       if (data?.payload?.success) {
//         toast({
//           title: data?.payload?.message,
//         });
//         navigate("/auth/login");
//       } else {
//         toast({
//           title: data?.payload?.message,
//           variant: "destructive",
//         });
//       }
//     });
//   }

//   console.log(formData);

//   return (
//     <div className="mx-auto w-full max-w-md space-y-6">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold tracking-tight text-foreground">
//           Create new account
//         </h1>
//         <p className="mt-2">
//           Already have an account
//           <Link
//             className="font-medium ml-2 text-primary hover:underline"
//             to="/auth/login"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//       <CommonForm
//         formControls={registerFormControls}
//         buttonText={"Sign Up"}
//         formData={formData}
//         setFormData={setFormData}
//         onSubmit={onSubmit}
//       />
//     </div>
//   );
// }

// export default AuthRegister;

// _____________________________________________________//

import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="bg-white dark:bg-zinc-900 shadow-xl rounded-2xl px-8 py-10 sm:px-10">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Join <span className="text-pink-500">Zyra</span> Today
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
            Create an account and start shopping smarter.
          </p>
        </div>

        <div className="mt-8">
          <CommonForm
            formControls={registerFormControls}
            buttonText={"Sign Up"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            buttonClassName="bg-gradient-to-r from-rose-500 to-orange-400 text-white py-2 px-4 rounded-lg hover:from-rose-600 hover:to-orange-500 transition"
          />

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-semibold text-rose-500 hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthRegister;
