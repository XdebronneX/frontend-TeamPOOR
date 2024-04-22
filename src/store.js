import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    authReducer,
    updateProfileReducer,
    forgotPasswordReducer,
    allUsersReducer,
    userDetailsReducer,
    deprovisionReducer,
    allSuppliersReducer,
    allNotifsReducer,
    updateNotifsReducer,
} from './reducers/userReducers';

import {
    newMotorcycleReducer,
    myMotorcycleReducer,
    allMotorcyclesReducer,
    motorcycleDetailsReducer,
    deprovisionMotorcycleReducer,
} from './reducers/motorcycleReducers';

import {
    allBrandReducer,
    brandDetailsReducer,
    deprovisionBrandReducer,
    newBrandReducer
} from './reducers/brandReducers';

import {
    allCategoryReducer,
    categoryDetailsReducer,
    deprovisionCategoryReducer,
    newCategoryReducer
} from './reducers/categoryReducers';

import {
    allProductReducer,
    newProductReducer,
    deprovisionProductReducer,
    productDetailsReducer,
    newReviewReducer,
    productReviewsReducer,
    reviewReducer,

} from './reducers/productReducers';

import { cartReducer } from './reducers/cartReducers';

import { adminOrderReducer, allOrdersReducer, createOrdersReducer, myOrdersReducer, orderContinueReducer, orderDetailsReducer } from './reducers/orderReducers';
import { deprovisionFuelReducer, myFuelReducer, newFuelReducer } from './reducers/fuelReducers';
import { newAddressesReducer, myAddressesReducer, deprovisionMyAddressesReducer, addressDetailsReducer } from './reducers/addressReducers';
import { allServiceReducer, deprovisionServiceReducer, newServiceReducer, serviceDetailsReducer } from './reducers/serviceReducers';
import { cartServiceReducer } from './reducers/serviceCartReducers';
import { monthlySalesReducer, mostBrandPurchasedReducer, mostLoyalReducer, mostProductPurchasedReducer } from './reducers/reportsReducers';
import { adminAppointmentReducer, allAppointmentsReducer, allMechanicsReducer, appointmentDetailsReducer, createAppointmentReducer, myAppointmentsReducer } from './reducers/appointmentReducers';
import { allStockLogsReducer } from './reducers/stockLogReducers';
import { mechanicReviewsReducer, myTasksReducer, newMechanicReviewReducer } from './reducers/mechanicReducers';
import { allPriceLogsReducer } from './reducers/priceLogReducers';
import { allSuppliedProductsReducer, newSupplierLogsReducer, suppliedDetailsReducer } from './reducers/supplierLogReducers';

const reducer = combineReducers({
    authUser: authReducer,
    updateUser: updateProfileReducer,
    forgotPassword: forgotPasswordReducer,

    allUsers: allUsersReducer,
    allSuppliers: allSuppliersReducer,
    userDetails: userDetailsReducer,
    adminDeprovision: deprovisionReducer,

    newMotor: newMotorcycleReducer,
    myMotor: myMotorcycleReducer,

    allMotorcycles: allMotorcyclesReducer,
    motorcycleDetails: motorcycleDetailsReducer,
    adminControl: deprovisionMotorcycleReducer,

    allBrands: allBrandReducer,
    newBrand: newBrandReducer,
    brandDetails: brandDetailsReducer,
    adminBrand: deprovisionBrandReducer,

    allCategories: allCategoryReducer,
    newCategory: newCategoryReducer,
    categoryDetails: categoryDetailsReducer,
    adminCategory: deprovisionCategoryReducer,

    allProducts: allProductReducer,
    newProduct: newProductReducer,
    productDetails: productDetailsReducer,
    adminProduct: deprovisionProductReducer,
    allStockLogs: allStockLogsReducer,
    allPriceLogs: allPriceLogsReducer,
    supplierLog: newSupplierLogsReducer,
    allSupplied: allSuppliedProductsReducer,
    suppliedDetails: suppliedDetailsReducer,

    cart: cartReducer,
    newOrder: createOrdersReducer,

    allOrders: allOrdersReducer,
    orderDetails: orderDetailsReducer,
    adminOrders: adminOrderReducer,
    myOrders: myOrdersReducer,
    oldOrders: orderContinueReducer,

    newReview: newReviewReducer,
    productReviews: productReviewsReducer,
    deleteReview: reviewReducer,

    newFuel: newFuelReducer,
    myFuel: myFuelReducer,
    userControlFuel: deprovisionFuelReducer,

    newAddresses: newAddressesReducer,
    myAddresses: myAddressesReducer,
    addressDetails: addressDetailsReducer,
    userControl: deprovisionMyAddressesReducer,

    allServices: allServiceReducer,
    adminService: deprovisionServiceReducer,
    serviceDetails: serviceDetailsReducer,
    newService: newServiceReducer,

    serviceCart: cartServiceReducer,

    newAppointment: createAppointmentReducer,
    myBookings: myAppointmentsReducer,
    allAppointment: allAppointmentsReducer,
    appointmentDetails: appointmentDetailsReducer,
    adminAppointment: adminAppointmentReducer,
    assignMechanics: allMechanicsReducer,

    myTasks: myTasksReducer,
    reviewMechanic: newMechanicReviewReducer,
    allReviewMechanic: mechanicReviewsReducer,

    monthlySales: monthlySalesReducer,
    mostLoyal: mostLoyalReducer,
    mostPurchased: mostProductPurchasedReducer,
    mostBrand: mostBrandPurchasedReducer,

    allNotifications: allNotifsReducer,
    readNotifs: updateNotifsReducer,
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],

        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {},
        paymentInfo: localStorage.getItem('paymentInfo')
            ? JSON.parse(localStorage.getItem('paymentInfo'))
            : {},
    },
    serviceCart: {
        cartServices: localStorage.getItem('cartServices')
            ? JSON.parse(localStorage.getItem('cartServices'))
            : [],
        bookingInfo: localStorage.getItem('bookingInfo')
            ? JSON.parse(localStorage.getItem('bookingInfo'))
            : {},
        customerInfo: localStorage.getItem('customerInfo')
            ? JSON.parse(localStorage.getItem('customerInfo'))
            : {},
    }

}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store;