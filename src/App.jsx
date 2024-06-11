import './App.css';
import Root from './Pages/Root';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import RegisterBakery from './Pages/RegisterBakery';
import { UserAuthentication, useUserData } from './Components/UserAuthentication(ContextApi)';
import ErrorPage from './Pages/ErrorPage';
import BakeryDetail from './Pages/BakeryDetail';
import ProductDetail from './Pages/ProductDetail';
import Productlist from "./pages/Productlist";
import Orders from "./pages/Orders";
import MainLayout from "./components/MainLayout";
// import Addproduct from "./pages/Addproduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet, Navigate } from 'react-router-dom';
import AddCategory from './Pages/AddCategory';
import ListCategory from './Pages/ListCategory';
import UserProfile from './Pages/UserProfile'
import ListProducts from './Pages/ListProducts';
import Cart from './Pages/Cart';
import BakeriesFilterPage from './Pages/BakeriesFilterPage';
import ProductsFilterPage from './Pages/ProductsFilterPage';
import CustomizeCake from './Pages/CustomizeCake';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import { QueryClient, QueryClientProvider } from 'react-query';
import AllCakeForCustomization from './Pages/AllCakeForCustomization';
import BakeryDetailsAndEdits from './Components/BakeryDetailsAndEdits';
import AddPartyItem from './Pages/AddPartyItem';
import AskProductType from './Pages/AskProductType';
import AddProduct from './Pages/Addproduct';
const queryClient = new QueryClient();
const PrivateRoutes = () => {
  const { userInfo } = useUserData();

  return (
    userInfo.user ? <Outlet /> : <Navigate to="/login" />
  )
}

function App() {
  return (
    <UserAuthentication> <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="bakery/:id" element={<BakeryDetail />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="bakeries" element={<BakeriesFilterPage />} />
            <Route path="products" element={<ProductsFilterPage />} />
            <Route path="*" element={<ErrorPage />} />
            {/* Protucted Routes */}
            <Route element={<PrivateRoutes />}>
              <Route path="cart" element={<Cart />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="register-bakery" element={<RegisterBakery />} />
              <Route path="customize-cake" element={<AllCakeForCustomization />} />
              <Route path="cake/:id" element={<CustomizeCake />} />
              {/* protucted routes for the bakery */}
              <Route path="bakery" element={<MainLayout />} >
                <Route index element={<BakeryDetailsAndEdits />} />
                <Route path="orders" element={<Orders />} />
                <Route path="add-product" element={<AskProductType />} />
                <Route path="add-product-cake" element={<AddProduct />} />
                <Route path="add-product-party-item" element={<AddPartyItem />} />


                <Route path="list-product" element={<ListProducts />} />
                <Route path="add-category" element={<AddCategory />} />
                <Route path="list-category" element={<ListCategory />} />
              </Route>

            </Route>
          </Route>
        </Routes>
      </Router></QueryClientProvider>
    </UserAuthentication>

  );
}

export default App;