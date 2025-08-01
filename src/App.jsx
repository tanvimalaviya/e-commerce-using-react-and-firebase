import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import NoPage from "./pages/nopage/NoPage";
import ProductInfo from "./pages/productInfo/ProductInfo";
import ScrollTop from "./components/Scrolltop/ScrollTop";
import CartPage from "./pages/cart/CartPage";
import AllProduct from "./pages/allproduct/AllProduct";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import DashBoard from "./pages/user/DashBoard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProduct from "./pages/admin/AddProduct";
import UpdateProduct from "./pages/admin/UpdateProduct";
import MyState from "./context/MyState";
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForUser } from "./protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import Category from "./pages/category/Category";

function App() {
  return (
    <>
      <MyState>
        <ScrollTop></ScrollTop>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/*" element={<NoPage></NoPage>}></Route>
          <Route
            path="/productinfo/:id"
            element={<ProductInfo></ProductInfo>}
          ></Route>
          <Route path="/cart" element={<CartPage></CartPage>}></Route>
          <Route path="/allproduct" element={<AllProduct></AllProduct>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/category/:categoryname" element={<Category></Category>}></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRouteForUser>
                <DashBoard></DashBoard>
              </ProtectedRouteForUser>
            }
          ></Route>
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRouteForAdmin>
                <AdminDashboard></AdminDashboard>
              </ProtectedRouteForAdmin>
            }
          ></Route>
          <Route
            path="/addproduct"
            element={
              <ProtectedRouteForAdmin>
                <AddProduct></AddProduct>
              </ProtectedRouteForAdmin>
            }
          ></Route>
          <Route
            path="/updateproduct/:id"
            element={
              <ProtectedRouteForAdmin>
                <UpdateProduct></UpdateProduct>
              </ProtectedRouteForAdmin>
            }
          ></Route>
        </Routes>

        <Toaster></Toaster>
      </MyState>
    </>
  );
}

export default App;
