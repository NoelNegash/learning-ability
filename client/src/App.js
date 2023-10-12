import './App.css';
import EditQuiz from './screens/EditQuiz';
import Header from './components/Header';
import UnregisteredHomePage from './screens/UnregisteredHomePage';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Toaster/>
      <Header/>
      <Container className='my-2'>
        <Outlet/>
      </Container>
    </>
  );
}

export default App;
