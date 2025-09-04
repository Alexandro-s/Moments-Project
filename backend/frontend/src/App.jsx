
import './App.css'
import { Outlet } from 'react-router-dom'
import Navebar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';

function App() {

  // Crio a class container e passo o outlet para navegar pelas pages 
  return (
      <div className='app'>
         <ToastContainer />
        <Navebar />
        <div className="container">
              <Outlet />
        </div>
          <Footer />
      </div>
  );
}
export default App
