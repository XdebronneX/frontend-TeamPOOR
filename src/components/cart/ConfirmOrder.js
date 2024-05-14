import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../actions/orderActions";
import { clearCart } from "../../actions/cartActions";
import { Button, Link } from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authUser);
  const { cartItems, shippingInfo, paymentInfo } = useSelector(
    (state) => state.cart
  );
  const { error, success, checkoutUrl } = useSelector((state) => state.newOrder);
  // const [isSuccess, setIsSuccess] = useState(false);
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (error) {
      setIsSuccess(false);
      toast.error(error.message || error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch(clearErrors());
    }

    if (success === true) {
      toast.success("Your order has been placed successfully!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch(clearCart());
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        navigate("/success");
      }
    }
  }, [dispatch, error, success, navigate]);

  const order = {
    orderItems: cartItems,
    fullname: shippingInfo.fullname,
    user: user,
    phone: shippingInfo.phone,
    region: shippingInfo.address?.region,
    province: shippingInfo.address?.province,
    city: shippingInfo.address?.city,
    barangay: shippingInfo.address?.barangay,
    postalcode: shippingInfo.address?.postalcode,
    address: shippingInfo.address?.address,
    paymentMethod: paymentInfo.paymentMethod,
    totalPrice: total,
    employeeUser: shippingInfo.employeeUser,
    dateOrdered: shippingInfo.dateOrdered,
    dateReceived: shippingInfo.dateReceived,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const checkoutBtn = document.getElementById("checkout_btn");
    if (checkoutBtn) checkoutBtn.disabled = true;
    dispatch(createOrder(order));
    // setIsSuccess(true);
  };

  return (
    <div className="space-y-5 px-80 py-3 bg-zinc-100 min-h-screen">
      <CheckoutSteps shipping payment confirmOrder />

      <div className="bg-white justify-center rounded-xl p-3 col-span-2 space-y-4">
        <p className="font-extrabold text-2xl tracking-wide">Order Summary</p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="bg-white justify-center rounded-xl p-3 col-span-2 space-y-4">
          <div>
            <p className="font-bold text-xl">Delivery Address</p>
            {/* <p className="text-zinc-500">Select payment method below.</p> */}
          </div>

          <div className="border-b border-zinc-200" />

          <div className="space-y-3">
            <div className="flex flex-row justify-between">
              <p className="text-zinc-500">Name: </p>
              <p className="font-semibold">{shippingInfo.fullname}</p>
            </div>

            <div className="flex flex-row justify-between">
              <p className="text-zinc-500">Contact Number #: </p>
              <p className="font-semibold">{shippingInfo.phone}</p>
            </div>

            <div className="flex flex-row justify-between">
              <p className="text-zinc-500">Address: </p>
              <p className="font-semibold w-9/12">{`${shippingInfo?.address?.address}, ${shippingInfo?.address?.barangay}, ${shippingInfo?.address?.city},${shippingInfo?.address?.region},${shippingInfo?.address?.province}, ${shippingInfo?.address?.postalcode}`}</p>
            </div>
          </div>
        </div>

        <div className="bg-white justify-center rounded-xl p-3 space-y-4">
          <div>
            <p className="font-bold text-xl">Payment Information</p>
            {/* <p className="text-zinc-500">Select payment method below.</p> */}
          </div>

          <div className="border-b border-zinc-200" />

          <div className="space-y-2">
            <div className="flex flex-row justify-between">
              <p className="text-zinc-500">Payment Method:</p>
              <p className="font-semibold">{paymentInfo.paymentMethod}</p>
            </div>

            <div className="flex flex-row justify-between">
              <p className="text-zinc-500">Total Item's:</p>
              <p className="font-semibold">{cartItems?.length} Item</p>
            </div>

            <div className="flex flex-row justify-between">
              <p className="text-zinc-500">Grand Total:</p>
              <p className="font-semibold">₱ {total?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
          </div>

          <div className="border-b border-zinc-200" />

          <Button
            colorScheme="red"
            id="checkout_btn"
            className="btn btn-block"
            onClick={submitHandler}
          >
            Place Order
          </Button>
        </div>

        <div className="bg-white justify-center rounded-xl p-3 col-span-2 space-y-4">
          <div>
            <p className="font-bold text-xl">Order Summary</p>
            <p className="text-zinc-500">Your list of items.</p>
          </div>

          <div>
            <div className="grid grid-cols-5">
              <p className="text-zinc-500">Image</p>
              <p className="text-zinc-500">Product Name</p>
              <p className="text-zinc-500">Quantity</p>
              <p className="text-zinc-500">Price</p>
              <p className="text-zinc-500">Total</p>
            </div>
            <div className="border-b border-zinc-200" />
          </div>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <>
                <div key={item.product} className="grid grid-cols-5">
                  <div>
                    <img
                      src={item.image}
                      alt="Product"
                      height="45"
                      width="65"
                    />
                  </div>

                  <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>

                  <div>
                    <p>{item.quantity}</p>
                  </div>

                  <div>
                    <p>₱ {item.price?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                  </div>

                  <div>
                    <p>₱ {(item.quantity * item.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                  </div>
                </div>
                <div className="border-b border-zinc-100" />
              </>
            ))}

            <div className="flex flex-row justify-end space-x-3">
              <p className="text-zinc-500">Grand Total: </p>
              <p className="font-semibold text-red-500">₱ {total?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;