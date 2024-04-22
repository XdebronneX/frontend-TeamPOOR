import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveBookingInfo } from "../../../actions/serviceCartActions";
import AppointmentSteps from "./AppointmentSteps";

const BookSchedule = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    appointmentDate: "",
    timeSlot: "",
  });

  const handleDateChange = (date) => {
    setBooking({ ...booking, appointmentDate: date });
  };

  const handleTimeSlotChange = (selectedTimeSlot) => {
    setBooking({ ...booking, timeSlot: selectedTimeSlot });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!booking.appointmentDate || !booking.timeSlot) {
      alert("Please select both a date and a time slot.");
      return;
    }
    dispatch(saveBookingInfo(booking));
    navigate("/book/service");
  };

  const timeOptions = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
  ];

  return (
    <div className="space-y-5 py-3 bg-zinc-100 min-h-screen">
      <AppointmentSteps booking />

      <div className="container shadow-sm rounded-xl w-9/12 p-3 space-y-5 bg-white">
        <div>
          <h2 className="text-center font-bold">Book appointment</h2>
        </div>
      </div>

      <Fragment>
        <form onSubmit={submitHandler}>
          <div class="container w-9/12 grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4">
            <div className="shadow-sm rounded-xl p-3 space-y-5 bg-white col-span-2">
              <div className="form-group">
                <label htmlFor="bookingDate">Select Date:</label>
                <input
                  type="date"
                  id="bookingDate"
                  value={booking.appointmentDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="form-control"
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label>Select Time Slot:</label>
                <div className="btn-group d-flex flex-wrap">
                  {timeOptions.map((time, index) => (
                    <button
                      key={index}
                      type="button"
                      style={{
                        backgroundColor:
                          booking.timeSlot === time ? "#007bff" : "transparent",
                        color: booking.timeSlot === time ? "#fff" : "#007bff",
                        border: "1px solid #007bff",
                        padding: "0.5rem 1rem",
                        margin: "0.5rem",
                        borderRadius: "0.25rem",
                      }}
                      onClick={() => handleTimeSlotChange(time)}
                    >
                      <strong>{time}</strong>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="shadow-sm rounded-xl p-3 space-y-5 bg-white h-24 flex justify-center items-center">
              <button
                type="submit"
                className="btn btn-primary btn-block rounded-pill bg-primary font-weight-bold"
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </form>
      </Fragment>
    </div>
  );
};

export default BookSchedule;
