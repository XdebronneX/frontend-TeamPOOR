import React, { Fragment, useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductReviews,
  deleteReview,
  clearErrors,
} from "../../actions/productActions";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import { FaTrash } from "react-icons/fa";
import { Box, Button, Flex, Stack, Heading } from "@chakra-ui/react";
import MetaData from "../layout/MetaData";
const ProductReviews = () => {
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.deleteReview
  );

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      errMsg("error fetching reviews!", "error");
      dispatch(clearErrors());
    }

    if (deleteError) {
      errMsg(deleteError, "error");
      dispatch(clearErrors());
    }

    if (productId !== "") {
      dispatch(getProductReviews(productId));
    }

    if (isDeleted) {
      successMsg("Review deleted successfully!", "success");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, productId, isDeleted, deleteError]);

  const deleteReviewHandler = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",

        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your Reviews has been deleted.",
            "success",
            dispatch(deleteReview(id, productId))
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your review is safe :)",
            "error"
          );
        }
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getProductReviews(productId));
  };

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "Review ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.firstname,
        actions: (
          <Fragment>
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => deleteReviewHandler(review._id)}
              leftIcon={<FaTrash />}
            >
              Delete
            </Button>
          </Fragment>
        ),
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
        <MetaData title="Product reviews" />
        <div className="w-full bg-white rounded-xl p-3 space-y-3 h-min shadow-sm">
          <Stack>
            <Heading>Reviews</Heading>{" "}
          </Stack>
          <div className="row justify-content-center mt-5">
            <div className="col-5">
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label htmlFor="productId_field">Enter Product ID</label>
                  <input
                    type="text"
                    id="productId_field"
                    className="form-control"
                    placeholder="Search your product ID..."
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : reviews && reviews.length > 0 ? (
            <MDBDataTable
              data={setReviews()}
              className="px-3"
              bordered
              striped
              hover
            />
          ) : (
            <p className="mt-5 text-center">No Reviews.</p>
          )}
        </div>
      </Fragment>
    </aside>
  );
};

export default ProductReviews;
