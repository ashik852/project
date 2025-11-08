import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contex/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import TourDetails from "./components/TourDetails";
import SignupForm from "./components/SignupFrom";
import ForgotPassword from "./pages/ForgotPassword";
import Footer from "./components/Footer";
import AdminComponentn from "./adminPanel/adminComponnet/AdminComponent";
import CreateNewTour from "./adminPanel/adminComponnet/CreateNewTour";
import Loader from "./ui/Loader";
import TourBookingsPage from "./pages/Booking ";
import TourPackage from "./pages/TourPackage";
import Dashboard from "./adminPanel/adminComponnet/Dashboard";
import ViewProfile from "./components/ViewProfile";
import About from "./pages/About";
import Service from "./pages/Service";
import ScrollToTop from "./components/ScrollToTop";
import Contact from "./pages/Contact";
import "./App.css";
// import PaymentPage from "./pages/Payment";

function AppRoutes() {
  const { loading } = useAuth();

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tourpackage" element={<TourPackage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/users" element={<AdminComponentn />} />
          <Route path="/createAtour" element={<CreateNewTour />} />
          <Route path="/booking/tour/:id" element={<TourBookingsPage />} />
          <Route path="/user/profile" element={<ViewProfile />}></Route>
          {/* <Route path="/payment" element={<PaymentPage />} /> */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
