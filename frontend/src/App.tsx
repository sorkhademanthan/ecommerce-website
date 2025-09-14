import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
import Header from './components/Header';
import Footer from './components/Footer';
import { useAppSelector } from './hooks';

const App = () => {
  const { userInfo } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      const socket = io('http://localhost:5001'); // Your backend URL

      socket.on('newOrder', (order) => {
        toast.success(`🎉 New Order Received! ID: ${order._id}`);
      });

      // Cleanup on component unmount
      return () => {
        socket.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer /> {/* Add the ToastContainer to render notifications */}
    </>
  );
};

export default App;