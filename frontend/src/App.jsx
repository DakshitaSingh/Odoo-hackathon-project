import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer';
import DashboardPage from './pages/DashboardPage'; 
import Login from './pages/LoginPage';
import Signup from './pages/RegisterPage';
import { Admin } from './pages/Admin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<Admin />} />
        
      </Routes>
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
}

export default App;