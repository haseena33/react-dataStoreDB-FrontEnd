import { BrowserRouter, Route, Routes, } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import Sidebar from "./components/sidebar/Sidbar";
import Security from "./pages/security/Security";
import EditProfile from "./pages/editprofile/EditProfile";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/security" element={<Layout><Security /></Layout>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/profile" element={<Layout><Profile/></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}




export default App;