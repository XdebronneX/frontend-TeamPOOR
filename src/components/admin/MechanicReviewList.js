import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  viewAllReviewsMechanic,
  clearErrors,
} from "../../actions/mechanicActions";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

const MechanicReviewList = () => {
  const dispatch = useDispatch();

  const { error, loading, feedbacks } = useSelector(
    (state) => state.allReviewMechanic
  );
  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });

  useEffect(() => {
    dispatch(viewAllReviewsMechanic());
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const setReviewsData = () => {
    const data = {
      columns: [
        {
          label: "Review ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Mechanic Name",
          field: "mechanicName",
          sort: "disabled",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "disabled",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "disabled",
        },
        {
          label: "Appointment Date & time",
          field: "appointmentDate",
          sort: "disabled",
        },
      ],
      rows: [],
    };

    feedbacks?.forEach((feedback) => {
      const mechanicName = feedback.mechanic
        ? `${feedback.mechanic.firstname} ${feedback.mechanic.lastname}`
        : "No Mechanic";

      let appointmentDate = "No Appointment";
      if (feedback.appointment) {
        const date = new Date(feedback.appointment.appointmentDate);
        const month = date.toLocaleString("default", { month: "long" });
        const day = date.getDate();
        const time = feedback.appointment.timeSlot;
        appointmentDate = `${month} ${day}, ${time}`;
      }

      const rating = feedback.rating ? feedback.rating : "N/A";
      const comment = feedback.comment ? feedback.comment : "No Comment";

      data.rows.push({
        id: feedback._id,
        mechanicName,
        rating,
        comment,
        appointmentDate,
      });
    });

    return data;
  };

  return (
    <aside className="bg-zinc-100 min-h-screen p-3 flex flex-row gap-4">
      <nav className="h-full flex flex-col sticky top-4">
        <Sidebar />
      </nav>

      <Fragment>
        <MetaData title={"Mechanic Reviews List"} />
        <div className="w-full bg-white rounded-xl p-3 space-y-3 h-min shadow-sm">
          <Heading as="h1" size="lg">
            All Mechanic Reviews
          </Heading>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setReviewsData()}
              className="px-3"
              bordered
              hover
              responsive
              noBottomColumns
            />
          )}
        </div>
      </Fragment>
    </aside>
  );
};

export default MechanicReviewList;
