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
import PaymentMathods from './Component/Pages/Desboard/PaymentMathods';
import Profile from './Component/Pages/Desboard/Profile';
import UpdateProduct from './Component/Pages/Desboard/UpdateProduct';
import ViewCart from './Component/Pages/Desboard/ViewCart';
import Home from './Component/Pages/Home/Home';
import News from './Component/Pages/News/News';
import NotFound from './Component/Pages/NotFound';
import ProductDetails from './Component/Pages/ProductDetails';
import Purchase from './Component/Pages/Purchase';
import Shop from './Component/Pages/Shop/Shop';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import MyAccount from './Component/user/MyAccount';
import Header from "./Component/ShareComponent/Header"
import { NewsSkelator } from './Component/ShareComponent/SkelatorAll';
import CategoryProduct from './Component/Pages/Shop/CategoryProduct';
import Customize from './Component/Pages/Desboard/Customize';

function App() {
  return (
    <div
      className="h-screen overflow-auto scrollbar App">
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/skelator" element={<NewsSkelator />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<CategoryProduct />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/news" element={<News />} />
          <Route path="/my-account" element={<PrivateRoute element={<MyAccount />} />}>
            <Route path="profile" element={<Profile />} />
            <Route path="my-order" element={<MyOrder />} />
            <Route path="my-review" element={<MyReview />} />
            <Route path="add-review" element={<AddReviews />} />
            <Route path="payment" element={<PaymentMathods />} />
            <Route path="view-cart" element={<ViewCart />} />
          </Route>
          <Route path="/desboard" element={<CheckAdmin element={<Desboard />} />}>
            <Route path="customize" element={<CheckAdmin element={<Customize />} />} />
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
      </AuthProvider>
    </div>
  );
}

export default App;
