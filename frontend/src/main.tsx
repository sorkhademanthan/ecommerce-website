import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import HomeScreen from './screens/HomeScreens';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { Provider } from 'react-redux'; // Import Provider
import store from './store';
import PrivateRoute from './components/PrivateRoute.tsx';
import ProfileScreen from './screens/ProfileScreen.tsx';
import CartScreen from './screens/CartScreen.tsx';
import ShippingScreen from './screens/ShippingScreen.tsx';
import PaymentScreen from './screens/PaymentScreen.tsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.tsx';
import AdminRoute from './components/AdminRoute.tsx';
import OrderListScreen from './screens/admin/OrderListScreen.tsx';
import OrderScreen from './screens/OrderScreen.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="" element={<PrivateRoute />}>
    </Route>

      {/* Private Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} /> 
        <Route path='/payment' element={<PaymentScreen/>}/>
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
      </Route>

      {/* Admin Routes */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
      </Route>
    </Route>
  )
);

// The '!' tells TypeScript that we know this element exists.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap RouterProvider with Provider */}
      <RouterProvider router={router} />
    </Provider>  
  </React.StrictMode>
);