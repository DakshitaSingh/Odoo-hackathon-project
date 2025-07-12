import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer';
<<<<<<< HEAD
import DashboardPage from './pages/DashboardPage'; 
=======
import Login from './pages/LoginPage';
import Signup from './pages/RegisterPage';
import {Admin} from './pages/Admin';
>>>>>>> 5eb62e8bf90612264695eeb2e5dd0a6beda8f619

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
<<<<<<< HEAD
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
         <Route path="/dashboard" element={<DashboardPage />} />
=======
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
>>>>>>> 5eb62e8bf90612264695eeb2e5dd0a6beda8f619
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;