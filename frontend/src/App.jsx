import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AddNewItemPage from './pages/AddNewItemPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/product' element={<ProductDetailPage/>}/>
        <Route path='/add' element={<AddNewItemPage/>}/>
        {/* Add more routes here as you build other pages */}
      </Routes>
    </Router>
  );
};

export default App;
