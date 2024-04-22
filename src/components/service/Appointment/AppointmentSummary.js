import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createAppointment,
  clearErrors,
} from "../../../actions/appointmentActions";
import { clearServiceCart } from "../../../actions/serviceCartActions";
import AppointmentSteps from "./AppointmentSteps";
import { Button } from "@chakra-ui/react";

const AppointmentSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authUser);
  const { cartServices, bookingInfo, customerInfo } = useSelector(
    (state) => state.serviceCart
  );
  const { error, success } = useSelector((state) => state.newAppointment);
  const [isSuccess, setIsSuccess] = useState(false);
  let total = 0;
  cartServices.cartServices?.forEach((service) => {
    total += service.price;
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch(clearErrors());
    }

    if (success && isSuccess) {
      toast.success("Your order has been placed successfully!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch(clearServiceCart());
      navigate("/success/booking");
    }
  }, [dispatch, error, success, navigate, isSuccess]);

  const submitHandler = async (e) => {
    e.preventDefault();
    let serviceType = "";

    if (cartServices.selectedTypeData === "1") {
      serviceType = "Onsite Service";
    } else if (cartServices.selectedTypeData === "2") {
      serviceType = "Home Service";
    }

    const appointment = {
      appointmentServices: cartServices,
      fullname: customerInfo.fullname,
      user: user,
      phone: customerInfo.phone,
      region: customerInfo.address?.region,
      province: customerInfo.address?.province,
      city: customerInfo.address?.city,
      barangay: customerInfo.address?.barangay,
      postalcode: customerInfo.address?.postalcode,
      address: customerInfo.address?.address,
      brand: customerInfo?.brand || "",
      year: customerInfo?.year || "",
      plateNumber: customerInfo?.plateNumber || "",
      engineNumber: customerInfo?.engineNumber || "",
      type: customerInfo?.type || "",
      fuel: customerInfo?.fuel || "",
      serviceType: serviceType || "",
      employeeUser: customerInfo.employeeUser || "",
      appointmentDate: bookingInfo.appointmentDate,
      timeSlot: bookingInfo.timeSlot,
      totalPrice: total,
    };
    const checkoutBtn = document.getElementById("checkout_btn");
    if (checkoutBtn) checkoutBtn.disabled = true;
    dispatch(createAppointment(appointment));
    setIsSuccess(true);
  };

  return (
    <div className="space-y-5 py-3 bg-zinc-100 min-h-screen">
        <AppointmentSteps booking listofservices customerinfo confirmAppointment/>
      <div className="container shadow-sm rounded-xl w-9/12 p-3 space-y-5 bg-white">
        <div>
          <h2 className="text-center font-bold">Appointment Summary</h2>
        </div>
      </div>

      <div className="container md:flex md:flex-row justify-between space-x-5">
        <div className="md:w-3/5 ">
          <div className="space-y-4">
            <div className="bg-white shadow-md rounded-xl p-4 space-y-4">
              <div className="">
                <h1 className="font-bold text-xl mb-4">Shipping Address</h1>
              </div>

              <div className="border-b border-zinc-200" />

              <div className="space-y-3">
                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500">Customer Name: </p>
                  <p className="font-semibold">{customerInfo.fullname}</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500">Contact Number #: </p>
                  <p className="font-semibold">{customerInfo.phone}</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500">Order Date:</p>
                  <p className="font-semibold">{bookingInfo.appointmentDate}</p>
                </div>
                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500">Order Date:</p>
                  <p className="font-semibold">{bookingInfo.timeSlot}</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500 w-9/12">Shipping Address:</p>
                  <p className="font-semibold">
                    {`${customerInfo?.address?.address}, ${customerInfo?.address?.barangay}, ${customerInfo?.address?.city},
                                            ${customerInfo?.address?.region}, ${customerInfo?.address?.province}, ${customerInfo?.address?.postalcode}`}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-xl p-4 space-y-4">
              <div className="">
                <h1 className="font-bold text-xl">Workspace</h1>
              </div>
              <div className="flex flex-row justify-between">
                <p className="text-zinc-500">Service Type</p>
                <p className="font-semibold">
                  {cartServices.selectedTypeData === "1"
                    ? "Onsite service"
                    : "Home Service"}
                </p>
              </div>
              <div className="border-b border-zinc-200" />
            </div>
            <div className="bg-white shadow-md rounded-xl p-4 space-y-4">
              <div className="">
                <h1 className="font-bold text-xl">Service Details</h1>
              </div>
              <div className="border-b border-zinc-200" />
              <div className="space-y-3">
                {cartServices && cartServices.cartServices?.length > 0 ? (
                  cartServices.cartServices.map((service, index) => (
                    <div key={index} className="border-bottom mb-3 pb-3">
                      <div className="row align-items-center">
                        <div className="col-md-3">
                          {/* Check if service has images array */}
                          {service.images && service.images.length > 0 ? (
                            <img
                              src={service.images[0].url}
                              alt="Product"
                              className="img-fluid"
                              height="45"
                              width="65"
                            />
                          ) : (
                            <img
                              src="placeholder.jpg"
                              alt="Product"
                              className="img-fluid"
                              height="45"
                              width="65"
                            />
                          )}
                        </div>
                        <div className="col-md-9">
                          <p className="mb-2">
                            <b>Service Name:</b> {service.name}
                          </p>
                          <p className="mb-2">
                            <b>Price:</b> {service.price}
                          </p>
                          <p className="mb-0">
                            <b>Description:</b> {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center">No services selected</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-2/5 space-y-4">
          <div className="bg-white shadow-md rounded-xl p-4 space-y-4">
            <div className="">
              <h1 className="font-bold text-xl">Your Motorcycle</h1>
            </div>
            <div className="border-b border-zinc-200" />
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row justify-between">
                <p className="text-zinc-500">Brand: </p>
                <p className="font-semibold">{customerInfo.brand}</p>
              </div>

              <div className="flex flex-row justify-between">
                <p className="text-zinc-500">Year Model: </p>
                <p className="font-semibold">{customerInfo.year}</p>
              </div>

              <div className="flex flex-row justify-between">
                <p className="text-zinc-500">Plate Number: </p>
                <p className="font-semibold">{customerInfo.plateNumber}</p>
              </div>

              <div className="flex flex-row justify-between">
                <p className="text-zinc-500">Engine Number: </p>
                <p className="font-semibold">{customerInfo.engineNumber}</p>
              </div>

              <div className="flex flex-row justify-between">
                <p className="text-zinc-500">Vehicle category: </p>
                <p className="font-semibold">{customerInfo.type}</p>
              </div>

              <div className="flex flex-row justify-between">
                <p className="text-zinc-500">Fuel type:</p>
                <p className="font-semibold">{customerInfo.fuel}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <Button
              colorScheme="red"
              id="checkout_btn"
              className="btn btn-lg"
              onClick={submitHandler}
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSummary;
