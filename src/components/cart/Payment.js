import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentInfo } from "../../actions/cartActions";
import { BsCash } from "react-icons/bs";
import { Button, Image } from "@chakra-ui/react";

const Payment = () => {
  const { paymentInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.authUser);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState(paymentInfo.paymentMethod);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentInfo({ paymentMethod }));
    navigate("/order/confirm");
  };

  const cancelHandler = () => {
    navigate("/cart");
  };

  return (
    <div className="bg-zinc-100 min-h-screen p-1">
      <div className="container space-y-5">
        <CheckoutSteps shipping payment />

        <div className="bg-white justify-center rounded-xl p-3 col-span-2 space-y-4">
          <p className="font-extrabold text-2xl tracking-wide">
            Payment Information
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white justify-center rounded-xl p-3 col-span-2 space-y-4">
            <div>
              <p className="font-bold text-xl">Payment Method</p>
              <p className="text-zinc-500">Select payment method below.</p>
            </div>

            <div className="space-y-3">
              {/* cash on delivery */}
              <button
                className=" bg-slate-200 p-2 rounded-xl w-full"
                onClick={() => setPaymentMethod("Cash On Delivery")}
              >
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row items-center space-x-4">
                    <div className="bg-blue-500 p-3 rounded-xl">
                      <BsCash className="text-white" size={28} />
                    </div>
                    <p className="font-semibold">Cash On Delivery</p>
                  </div>
                  <input
                    type="radio"
                    id="cash_on_delivery"
                    name="paymentMethod"
                    value="Cash On Delivery"
                    checked={paymentMethod === "Cash On Delivery"}
                    onChange={handlePaymentChange}
                  />
                </div>
              </button>

              {/* gcash payment */}
              <button
                className=" bg-slate-200 p-2 rounded-xl w-full"
                onClick={() => setPaymentMethod("GCash")}
              >
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row items-center space-x-4">
                    <div className="rounded-xl">
                      <Image
                        src={"/images/gcash-1.png"}
                        alt="TeamPoor Logo"
                        className="rounded-xl"
                        boxSize="60px"
                      />
                    </div>
                    <p className="font-semibold">GCash</p>
                  </div>
                  <div className="flex flex-row space-x-3">
                    <Image
                      src={"/images/gcash-3.png"}
                      alt="TeamPoor Logo"
                      className="rounded-xl"
                      w={100}
                    />
                    <input
                      type="radio"
                      id="gcash"
                      name="paymentMethod"
                      value="GCash"
                      checked={paymentMethod === "GCash"}
                      onChange={handlePaymentChange}
                    />
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div>
            <div className="bg-white justify-center rounded-xl p-3 space-y-4">
              <Button
                colorScheme="red"
                id="checkout_btn"
                className="btn btn-block"
                onClick={submitHandler}
              >
                Proceed To Order Summary
              </Button>

              <Button
                id="cancel_btn"
                onClick={cancelHandler}
                variant="ghost"
                size="md"
                mt={4}
                width="100%"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
