import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className='app-container'>
      <Toaster/>
      <Header/>
      <Container className='main-container'>
        <Outlet/>
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
