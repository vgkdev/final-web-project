import { Route, Routes } from "react-router-dom";
import PagenotFound from "../Pages/PagenotFound";
import Home from "../Pages/Home/Home";
import Admin from "../Pages/Admin/Admin";
import Login from "../Components/Login/Login";
import SingUp from "../Components/SignUp/SingUp";
import { Profile } from "../Pages/Admin/Profile";
import { Products } from "../Components/Products/Products";
import Cart from "../Pages/Home/Cart";
import Skin from "../Pages/Home/Skin";
import PaymentPage from "../Pages/Home/PaymentPage";
import Serum from "../Pages/Home/Serum";
import Clean from "../Pages/Home/Clean";
import PersonalCare from "../Pages/Home/PersonalCare";
import ProductDetail from "../Pages/Home/ProductDetail";
import FavoriteList from "../Pages/Home/FavoriteList";
import { useSelector } from "react-redux";
import UpdateUserInfo from "../Pages/Home/UpdateUserInfo";
import PaymentSuccess from "../Pages/Home/PaymentSuccess";
import OtherProducts from "../Pages/Home/OtherProducts";

const AllRoutes = () => {
  const user = useSelector((state) => state.user.user);
  const role = user?.role;

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="*" element={<PagenotFound />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SingUp />}></Route>
      <Route path="/update-user" element={<UpdateUserInfo />}></Route>
      {/* <Route path="/admin" element={<Profile />}></Route> */}
      {role == "1" && <Route path="/admin" element={<Profile />}></Route>}
      <Route path="/products" element={<Products />}></Route>
      <Route path="/product/:id" element={<ProductDetail />}></Route>
      {/* <Route path="/test" element={<Admin />}></Route> */}
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/favorite-list" element={<FavoriteList />}></Route>
      <Route path="/skin" element={<Skin />}></Route>
      <Route path="/treatment" element={<Serum />}></Route>
      <Route path="/clean" element={<Clean />}></Route>
      <Route path="/personal-care" element={<PersonalCare />}></Route>
      <Route path="/other" element={<OtherProducts />}></Route>
      <Route path="/payment" element={<PaymentPage />}></Route>
      <Route path="/payment-success" element={<PaymentSuccess />}></Route>
    </Routes>
  );
};

export default AllRoutes;
