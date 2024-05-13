import { BrowserRouter, Routes, Route } from "react-router-dom"
import HeaderComponent from "./components/header";
import FooterComponent from "./components/footer";
import HomePage from "./pages/homepages";
import CartPage from "./pages/cartpages";
import LoginPage from "./pages/loginpage";
import ProductDetailsPage from "./pages/productdetailpages";
import ProductListPage from "./pages/productlistpages";
import RegisterPage from "./pages/registerpage";
//Protected User Page
import ProtectedRoutesComponent from "./components/protectedcomponent";
import UserCartPage from "./pages/user/usercartdetailspage";
import UserProfilePage from "./pages/user/userprofilepage";
import UserOrderPage from "./pages/user/userorderpages";
import UserOrderDetailsPage from "./pages/user/userorderdetailspage";
//Protected Admin Page
import AdminUsersPage from "./pages/admin/adminuserspage";
import AdminAnalyticsPage from "./pages/admin/adminanalyticspage";
import AdminChatsPage from "./pages/admin/adminchatspage";
import AdminCreateProductsPage from "./pages/admin/admincreateproductpage";
import AdminEditProductPage from "./pages/admin/admineditproductpage";
import AdminEditUserPage from "./pages/admin/adminedituserpage";
import AdminOrderDetailsPage from "./pages/admin/adminorderdetailspage";
import AdminOrdersPage from "./pages/admin/adminorderspage";
import AdminProductPage from "./pages/admin/adminproductpage";
// import UserChatComponent from "./pages/user/userchatcomponent";
import RouteWithUserChatComponent from "./pages/user/RouteWithUserChatComponent";
import ScrollToTop from "./utilities/ScrollToTop";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <HeaderComponent />
      <Routes>
        <Route element={<RouteWithUserChatComponent />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/product-list" element={<ProductListPage />} />
          <Route path="/product-details" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={"Page not exist 404"} />
          {/*User Protected*/}
          <Route element={<ProtectedRoutesComponent admin={false}/>}>
            <Route path="/user" element={<UserProfilePage />} />
            <Route path="/user/my-order" element={<UserOrderPage />} />
            <Route path="/user/cart-details" element={<UserCartPage />} />
            <Route path="/user/order-details" element={<UserOrderDetailsPage />} />
          </Route>



        </Route>


        {/*Admin Protected*/}
        <Route element={<ProtectedRoutesComponent admin={false} />}>
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/order" element={<AdminOrdersPage />} />
          <Route path="/admin/order-details" element={<AdminOrderDetailsPage />} />
          <Route path="/admin/products" element={<AdminProductPage />} />
          <Route path="/admin/chats" element={<AdminChatsPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin/create-new-product" element={<AdminCreateProductsPage />} />
          <Route path="/admin/edit-product" element={<AdminEditProductPage />} />
          <Route path="/admin/edit-user" element={<AdminEditUserPage />} />
        </Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>

  );
}

export default App;
