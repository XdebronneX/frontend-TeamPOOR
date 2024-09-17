import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./components/route/ProtectedRoute";
import Header from "./components/layout/Header";
import Home from "./components/Home";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import store from "./store"
import { LoadUser } from './actions/userActions';
import Register from "./components/user/Register";
import UpdateProfile from "./components/user/UpdateProfile";
import ChangePassword from "./components/user/ChangePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import ProfileMotorcycle from "./components/motorcycle/ProfileMotorcycle"
import Dashboard from "./components/admin/Dashboard";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import MotorcyclesList from "./components/admin/MotorcyclesList";
import UpdateMotorcycle from "./components/admin/UpdateMotorcycle";
import CreateMotorcycle from "./components/motorcycle/CreateMotorcycle";
import BrandsList from "./components/admin/BrandsList";
import CategoryList from "./components/admin/CategoryList"
import ProductsList from "./components/admin/ProductsList";
import UpdateBrand from "./components/admin/UpdateBrand";
import UpdateCategory from "./components/admin/UpdateCategory";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import Products from "./components/product/Products"
import ProductDetails from "./components/product/ProductDetails";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import SuccessOrder from "./components/cart/SuccessOrder";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";
import NewBrand from "./components/admin/NewBrand";
import NewCategory from "./components/admin/NewCategory";
import ProductReviews from "./components/admin/ProductReviews";
import SecretaryOrders from "./components/secretary/SecretaryOrders";
import SecretaryUpdateOrders from "./components/secretary/SecretaryUpdateOrders";
import Createfuel from "./components/fuel/CreateFuel";
import CreateAddresses from "./components/addresses/CreateAddresses";
import ListOfAddresses from "./components/addresses/ListOfAddresses";
import UpdateAddress from "./components/addresses/UpdateAddress";
import ToPayOrders from "./components/order/ToPayOrders";
import ToShipOrders from "./components/order/ToShipOrders";
import ToReceivedOrders from "./components/order/ToReceivedOrders";
import CompletedOrders from "./components/order/CompletedOrders";
import CancelledOrders from "./components/order/CancelledOrders";
import ServiceList from "./components/admin/ServiceList";
import UpdateService from "./components/admin/UpdateService";
import NewService from "./components/admin/NewService";
import Services from "./components/service/Services";
import ServiceDetails from "./components/service/ServiceDetails";
import CartService from "./components/service/CartService";
import BookSchedule from "./components/service/Appointment/BookSchedule";
import ServicesChoose from "./components/service/Appointment/ServicesChoose";
import CustomerInfo from "./components/service/Appointment/CustomerInfo";
import AppointmentSummary from "./components/service/Appointment/AppointmentSummary";
import UpdateStock from "./components/admin/UpdateStock";
import ProductStockList from "./components/admin/ProductStockList";
import StockLogHistory from "./components/admin/StockLogHistory";
import ListOfFuel from "./components/fuel/ListOfFuel";
import SuccessBooking from "./components/service/Appointment/SuccessBooking";
import BookingList from "./components/admin/BookingList";
import ListAppointments from "./components/service/ListAppointments";
import ProcessBooking from "./components/admin/ProcessBooking";
import BookingDetails from "./components/service/Appointment/BookingDetails";
import SuccessVerify from "./components/user/verifyMyEmail";
import MyTaskAssigned from "./components/mechanic/MyTaskAssigned";
import AssignTasks from "./components/admin/AssignTasks";
import TodayTask from "./components/mechanic/TodayTask";
import UpcomingTask from "./components/mechanic/UpcomingTask";
import CompletedTask from "./components/mechanic/CompletedTask";
import TaskDetails from "./components/mechanic/TaskDetails";
import SuppliersList from "./components/admin/SuppliersList";
import SecretaryAppointmentList from "./components/secretary/SecretaryAppointmentList";
import ProcessBySecretary from "./components/secretary/ProcessBySecretary";
import AssignBySecretary from "./components/secretary/AssignBySecretary";
import Additional from "./components/secretary/Additional";
import VerifyOrderDetails from "./components/order/VerifyOrderDetails";
import MechanicReviewList from "./components/admin/MechanicReviewList";
import PriceLogHistory from "./components/admin/PriceLogHistory";
import { allOrders } from "./actions/orderActions";
import { viewAllNotif } from "./actions/userActions";
import SupplierHistory from "./components/admin/SupplierLogHistory";
import SuppliedProductLogs from "./components/admin/SuppliedProductLogs";
import SuppliedDetails from "./components/admin/SuppliedDetails";
import RescheduleBooking from "./components/secretary/ReschuduleBooking";
import AddServices from "./components/secretary/AddServices";
function App() {
  useEffect(() => {
    store.dispatch(LoadUser())
  }, [])
  const { user } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (user && user.role === "admin") {
      dispatch(allOrders());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user && user.role === "user") {
      dispatch(viewAllNotif());
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} exact='true' />
        <Route path="/search/:keyword" element={<Products />} exact="true" />
        <Route path='/products' element={<Products />} exact='true' />
        <Route path='/services' element={<Services />} exact='true' />
        <Route path='/cart' element={<Cart />} exact='true' />
        <Route path='/cart-service' element={<CartService />} exact='true' />
        <Route path='/showSingleProduct/:id' element={<ProductDetails />} exact='true' />
        <Route path='/showSingleService/:id' element={<ServiceDetails />} exact='true' />
        <Route path='/verify/email/:token/:id' element={<SuccessVerify />} exact='true' />
        <Route path='/paymongo-gcash/:token/:id' element={<VerifyOrderDetails />} exact='true' />
        <Route path='/login' element={<Login />} exact='true' />
        <Route path='/register' element={<Register />} exact='true' />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} exact='true' />
        <Route path="/profile/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
        <Route path="/change/password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} exact="true" />
        <Route path="/forgot/password" element={<ForgotPassword />} exact="true" />
        <Route path="/password/reset/:token" element={<NewPassword />} exact="true" />

        <Route path="/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />

        <Route path="/admin/view/all/users" element={<ProtectedRoute isAdmin={true} ><UsersList /></ProtectedRoute>} />
        <Route path="/admin/view/all/suppliers" element={<ProtectedRoute isAdmin={true} ><SuppliersList /></ProtectedRoute>} />
        <Route path="/admin/users/:id" element={<ProtectedRoute isAdmin={true} ><UpdateUser /></ProtectedRoute>} />

        <Route path="/create/motorcycle/new" element={<ProtectedRoute><CreateMotorcycle /></ProtectedRoute>} exact="true" />
        <Route path="/my-motorcycles" element={<ProtectedRoute><ProfileMotorcycle /></ProtectedRoute>} exact="true" />

        <Route path="/add-fuel" element={<ProtectedRoute><Createfuel /></ProtectedRoute>} exact="true" />
        <Route path="/my-fuels" element={<ProtectedRoute><ListOfFuel /></ProtectedRoute>} exact="true" />

        <Route path="/admin/view/all/motorcycles" element={<ProtectedRoute isAdmin={true} ><MotorcyclesList /></ProtectedRoute>} />
        <Route path="/admin/motorcycle/:id" element={<ProtectedRoute isAdmin={true} ><UpdateMotorcycle /></ProtectedRoute>} />

        <Route path="/admin/view/all/brands" element={<ProtectedRoute isAdmin={true} ><BrandsList /></ProtectedRoute>} />
        <Route path="/add/brand/new" element={<ProtectedRoute isAdmin={true} > <NewBrand /> </ProtectedRoute>} />
        <Route path="/admin/brands/:id" element={<ProtectedRoute isAdmin={true} ><UpdateBrand /></ProtectedRoute>} />

        <Route path="/admin/view/all/category" element={<ProtectedRoute isAdmin={true} > <CategoryList /></ProtectedRoute>} />
        <Route path="/add/category/new" element={<ProtectedRoute isAdmin={true} > <NewCategory /> </ProtectedRoute>} />
        <Route path="/admin/category/:id" element={<ProtectedRoute isAdmin={true} ><UpdateCategory /></ProtectedRoute>} />

        <Route path="/admin/view/all/products" element={<ProtectedRoute isAdmin={true} > <ProductsList /> </ProtectedRoute>} />
        <Route path="/add/product/new" element={<ProtectedRoute isAdmin={true} > <NewProduct /> </ProtectedRoute>} />
        <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true} > <UpdateProduct /> </ProtectedRoute>} />

        <Route path="/admin/view/all/product/stocks" element={<ProtectedRoute isAdmin={true} > <ProductStockList /> </ProtectedRoute>} />
        <Route path="/admin/stock/:id" element={<ProtectedRoute isAdmin={true} > <UpdateStock /> </ProtectedRoute>} />
        <Route path="/admin/stock/history/logs" element={<ProtectedRoute isAdmin={true} > <StockLogHistory /> </ProtectedRoute>} />
        <Route path="/admin/price/history/logs" element={<ProtectedRoute isAdmin={true} > <PriceLogHistory /> </ProtectedRoute>} />
        <Route path="/admin/supplier/history/logs" element={<ProtectedRoute><SupplierHistory /></ProtectedRoute>} exact="true" />
        <Route path="/admin/supplied/product/history" element={<ProtectedRoute isAdmin={true} > <SuppliedProductLogs /> </ProtectedRoute>} />
        <Route path="/admin/single/supplied/:id" element={<ProtectedRoute><SuppliedDetails /></ProtectedRoute>} />

        <Route path="/admin/view/all/services" element={<ProtectedRoute isAdmin={true} > <ServiceList /> </ProtectedRoute>} />
        <Route path="/admin/service/:id" element={<ProtectedRoute isAdmin={true} > <UpdateService /> </ProtectedRoute>} />
        <Route path="/add-service" element={<ProtectedRoute isAdmin={true} > <NewService /> </ProtectedRoute>} />

        <Route path='/shipping' element={<ProtectedRoute><Shipping /></ProtectedRoute>} exact='true' />
        <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
        <Route path='/payment' element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path='/success' element={<ProtectedRoute><SuccessOrder /></ProtectedRoute>} />
        <Route path='/to-pay' element={<ProtectedRoute><ToPayOrders /></ProtectedRoute>} exact='true' />
        <Route path='/to-ship' element={<ProtectedRoute><ToShipOrders /></ProtectedRoute>} exact='true' />
        <Route path='/to-received' element={<ProtectedRoute><ToReceivedOrders /></ProtectedRoute>} exact='true' />
        <Route path='/completed' element={<ProtectedRoute><CompletedOrders /></ProtectedRoute>} exact='true' />
        <Route path='/cancelled' element={<ProtectedRoute><CancelledOrders /></ProtectedRoute>} exact='true' />


        <Route path='/booking' element={<ProtectedRoute><BookSchedule /></ProtectedRoute>} exact='true' />
        <Route path='/book/service' element={<ProtectedRoute><ServicesChoose /></ProtectedRoute>} />
        <Route path='/customer-info' element={<ProtectedRoute><CustomerInfo /></ProtectedRoute>} />
        <Route path='/confirm/appointment' element={<ProtectedRoute><AppointmentSummary /></ProtectedRoute>} />
        <Route path='/success/booking' element={<ProtectedRoute><SuccessBooking /></ProtectedRoute>} />

        <Route path="/admin/appointment/list" element={<ProtectedRoute isAdmin={true}><BookingList /></ProtectedRoute>} />
        <Route path='/appointment/list' element={<ProtectedRoute><ListAppointments /></ProtectedRoute>} />
        <Route path="/admin/appointment/:id" element={<ProtectedRoute isAdmin={true} ><ProcessBooking /></ProtectedRoute>} />
        <Route path="/appointment/:id" element={<ProtectedRoute><BookingDetails /></ProtectedRoute>} />
        <Route path="/admin/assign/mechanic/:id" element={<ProtectedRoute isAdmin={true} ><AssignTasks /></ProtectedRoute>} />
        <Route path="/task/:id" element={<ProtectedRoute><TaskDetails /></ProtectedRoute>} />
        
        <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true} ><OrdersList /></ProtectedRoute>} />
        <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true} ><ProcessOrder /></ProtectedRoute>} />

        <Route path='/orders/me' element={<ProtectedRoute><ListOrders /></ProtectedRoute>} />
        <Route path="/order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />

        <Route path="/admin/reviews" element={<ProtectedRoute isAdmin={true} ><ProductReviews /></ProtectedRoute>} />

        <Route path="/secretary/orders" element={<ProtectedRoute isSecretary={true} ><SecretaryOrders /></ProtectedRoute>} />
        <Route path="/secretary/order/:id" element={<ProtectedRoute isSecretary={true} ><SecretaryUpdateOrders /></ProtectedRoute>} />
        <Route path="/secretary/appointment/list" element={<ProtectedRoute isSecretary={true}><SecretaryAppointmentList /></ProtectedRoute>} />
        <Route path="/secretary/appointment/:id" element={<ProtectedRoute isSecretary={true} ><ProcessBySecretary /></ProtectedRoute>} />
        <Route path="/secretary/assign/mechanic/:id" element={<ProtectedRoute isSecretary={true} ><AssignBySecretary/></ProtectedRoute>} />
        <Route path="/parts/additional/:id" element={<ProtectedRoute><Additional /></ProtectedRoute>} />
        <Route path="/backjob/reschedule/appointment/:id" element={<ProtectedRoute isSecretary={true} ><RescheduleBooking /></ProtectedRoute>} />

        <Route path="/services/additional/:id" element={<ProtectedRoute><AddServices /></ProtectedRoute>} />

        <Route path="/create/my-address" element={<ProtectedRoute><CreateAddresses /></ProtectedRoute>} exact="true" />
        <Route path="/my-addresses" element={<ProtectedRoute><ListOfAddresses /></ProtectedRoute>} exact="true" />
        <Route path="/my-address/:id" element={<ProtectedRoute><UpdateAddress /></ProtectedRoute>} exact="true" />

        <Route path='/mechanics/task' element={<ProtectedRoute><MyTaskAssigned /></ProtectedRoute>} />
        <Route path='/today/task' element={<ProtectedRoute><TodayTask /></ProtectedRoute>} exact='true' />
        <Route path='/upcoming/task' element={<ProtectedRoute><UpcomingTask /></ProtectedRoute>} exact='true' />
        <Route path='/completed/task' element={<ProtectedRoute><CompletedTask /></ProtectedRoute>} exact='true' />

        <Route path="/admin/mechanic/list-reviews" element={<ProtectedRoute isAdmin={true} ><MechanicReviewList /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;