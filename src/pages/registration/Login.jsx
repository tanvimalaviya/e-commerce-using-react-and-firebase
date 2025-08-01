import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { collection, onSnapshot, query, QuerySnapshot, where } from "firebase/firestore";
import Loader from "../../components/loader/Loader";

const Login = () => {
   const context = useContext(MyContext);
    const {Loading , setLoading} =  context;

    //navigation

    const navigate = useNavigate();

    //login state

    const [userLogin , setUserLogin] = useState({
      email:"",
      password:""
    })

    //user login function

    const userLoginFunction = async() => {
        //validate
        if(userLogin.email == ""  || userLogin.password == ""){
          return toast.error("all fields are required")
        }

        setLoading(true);

        try {
          const users = await signInWithEmailAndPassword(auth ,userLogin.email , userLogin.password)
          console.log(users);
          try {
            const q = query(
                    collection(fireDB, "user"),
                    where('uid', '==', users?.user?.uid)
                );
                const data = onSnapshot(q,(QuerySnapshot)=>{
                  let user;
                  QuerySnapshot.forEach((doc) => user = doc.data());
                  localStorage.setItem("users" , JSON.stringify(user))
                  setUserLogin({
                    email:"",
                    password:""
                  })
                  toast.success("login successfully");
                  setLoading(false);
                  if(user.role == 'user'){
                    navigate("/dashboard")
                  }else{
                    navigate("/admin-dashboard")
                  }
                })
                return () => data
          } catch (error) {
            console.log(error);
            setLoading(false);
            
          }
          
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
    }

  return (
    <div className="flex justify-center items-center h-screen">

      {Loading && <Loader></Loader>}
      <div className="bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">
        <div className="mb-5">
        <h2 className="text-center text-2xl font-bold text-pink-500">Login</h2>
        </div>
        <div className="mb-3">
        <input
          className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          type="email"
          value={userLogin.email}
          onChange={(e) => {
            setUserLogin({
              ...userLogin,
              email : e.target.value
            })
          }}
          placeholder="Email Address"
        ></input>
        </div>
        <div className="mb-5">
        <input
          className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          type="password"
          value={userLogin.password}
          onChange={(e) => {
            setUserLogin({
              ...userLogin,
              password: e.target.value
            })
          }}
          placeholder="Password"
        ></input>
        </div>
        <div className="mb-5">
        <button
        onClick={userLoginFunction}
          className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
          type="button"
        >
          Login
        </button>
        </div>
        <div>
        <h2 className="text-black">
          Don't have an account{" "}
          <Link className="text-pink-500 font-bold" to="/signup">
            Signup
          </Link>
        </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
