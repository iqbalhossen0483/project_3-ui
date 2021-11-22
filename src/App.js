import { Route, Routes } from 'react-router';
import './App.css';
import AuthProvider from './Component/Firebase/AuthProvider';
import LogIn from './Component/Firebase/LogIn';
import SignUp from './Component/Firebase/SignUp';
import AddReviews from './Component/Pages/AddReviews';
import AddNews from './Component/Pages/adminPage/AddNews';
import AddProduct from './Component/Pages/adminPage/AddProdut/AddProduct';
import CheckAdmin from './Component/Pages/Desboard/CheckAdmin';
import Desboard from './Component/Pages/Desboard/Desboard';
import MakeAdmin from './Component/Pages/Desboard/MakeAdmin';
import ManageOrder from './Component/Pages/Desboard/ManageOrder';
import ManageProduct from './Component/Pages/Desboard/ManageProduct';
import MyOrder from './Component/Pages/Desboard/MyOrder';
import MyReview from './Component/Pages/Desboard/MyReview';
import Payment from './Component/Pages/Desboard/Payment';
import Profile from './Component/Pages/Desboard/Profile';
import UpdateProduct from './Component/Pages/Desboard/UpdateProduct';
import Home from './Component/Pages/Home/Home';
import News from './Component/Pages/News/News';
import NotFound from './Component/Pages/NotFound';
import Purchase from './Component/Pages/Purchase';
import Shop from './Component/Pages/Shop/Shop';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import Footer from './Component/ShareComponent/Footer/Footer';
import Header from './Component/ShareComponent/Header';
import MyAccount from './Component/user/MyAccount';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/news" element={<News />} />
          <Route path="/my-account" element={<PrivateRoute element={<MyAccount />} />}>
            <Route path="profile" element={<Profile />} />
            <Route path="my-order" element={<MyOrder />} />
            <Route path="my-review" element={<MyReview />} />
            <Route path="add-review" element={<AddReviews />} />
            <Route path="payment" element={<Payment />} />
          </Route>
          <Route path="/desboard" element={<PrivateRoute element={<Desboard />} />}>
            <Route path="add-product" element={<CheckAdmin element={<AddProduct />} />} />
            <Route path="add-news" element={<CheckAdmin element={<AddNews />} />} />
            <Route path="manage-order" element={<CheckAdmin element={<ManageOrder />} />} />
            <Route path="make-admin" element={<CheckAdmin element={<MakeAdmin />} />} />
            <Route path="manage-product" element={<CheckAdmin element={<ManageProduct />} />}>
              <Route path=":id" element={<UpdateProduct />} />
            </Route>
          </Route>
          <Route path="/place-order/:id" element={<PrivateRoute element={<Purchase />} />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
