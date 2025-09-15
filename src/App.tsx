import { Route, Routes } from "react-router-dom";

import "./App.css";
// import Home from "./pages/Home";


import UpdateUserProfile from "./pages/ProfilePage/UpdateProfilePage";
import WebFlow from "./pages/webFlow/WebFlow";
import ViewUserProfile from "./pages/ProfilePage/ViewProfilePage";

export default function App() {
  // const { authenticate } = useAuthStore();
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     setToken(token);
  //     authenticate(true);
  //   }
  // }, [])

  return (
    <Routes>
      <Route path="/" element={<WebFlow />}>
        <Route path="Edit"
          element={<UpdateUserProfile />} />
          <Route path="Profile"
          element={<ViewUserProfile/>} />
      </Route>
    </Routes>

    // <Routes>
    //   <Route path="/login" element={<LoginPage />} />
    //   <Route path="/register" element={<Register />} />

    //   <Route path="/" element={<ProtectedRoute><WebFlow /></ProtectedRoute>}>
    //     <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

    //     <Route path="transactions" element={<Transaction />} />
    //     <Route path="about" element={<About />} />

    //     <Route path="/products" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
    //   </Route>
    // </Routes>


  );
}
