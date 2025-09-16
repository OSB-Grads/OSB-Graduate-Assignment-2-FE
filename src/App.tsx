import { Route, Routes } from "react-router-dom";

import "./App.css";
import About from "./pages/About";
import Home from "./pages/Home/Home";

// import Home from "./pages/Home";


import AccountPage from "./pages/AccountPage/AccountPage";
import UpdateUserProfile from "./pages/ProfilePage/UpdateProfilePage";
import ViewUserProfile from "./pages/ProfilePage/ViewProfilePage";
import WebFlow from "./pages/webFlow/WebFlow";
import useAuthStore from "./store/AuthStore/authStore";



import { useEffect } from "react";
import Header from "./components/Header/Header";
import ProtectedRoute from "./components/ProtectedRoutes/protectedroutes";
import AccountDetailPage from './pages/AccountDetailsPage';
import Error404 from "./pages/ErrorPages/Error404";
import GenericError from "./pages/ErrorPages/GenericError";
import Maintenance from "./pages/ErrorPages/Maintenance";
import LoginPage from "./pages/loginPage/loginPage";
import ProductPage from "./pages/productsPage/ProductPage";
import Register from "./pages/Register/Register";
import TransactionPage from "./pages/TransactionPage/TransactionPage";
import { setToken } from "./utils/httpClientUtil";


export default function App() {
  const { authenticate, isAuthenticated } = useAuthStore();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      authenticate(true);
    } else {
      authenticate(false);
    }
  }, [])

  return (
    <>
      <Header></Header>
      <Routes>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<WebFlow />}>
          <Route path="/" element={<Home />} />

          <Route path="/transactions" element={< TransactionPage />} />

          <Route path="about" element={<About />} />
          <Route path="Edit" element={<UpdateUserProfile />} />
          <Route path="Profile" element={<ViewUserProfile />} />

          <Route path="/products" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
          <Route path='/accountsPage' element={<AccountPage />} />
          <Route path='/account-details/:accountNumber' element={<AccountDetailPage></AccountDetailPage>} />

        </Route>
        <Route path="/error404" element={< Error404 />}></Route>
        <Route path="/genericError" element={< GenericError />}></Route>
        <Route path="/maintenance" element={< Maintenance />}></Route>
      </Routes>
    </>


  );
}
