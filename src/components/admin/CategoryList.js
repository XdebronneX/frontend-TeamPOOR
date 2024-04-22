import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  viewAllCategories,
  deleteCategory,
  clearErrors,
} from "../../actions/categoryActions";
import { DELETE_CATEGORY_RESET } from "../../constants/categoryConstants";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { Box, Button, Flex, Stack, Heading } from "@chakra-ui/react";
import { FaPencilAlt, FaTrash, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/MetaData";
const CategoryList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { error, loading, categories } = useSelector(
    (state) => state.allCategories
  );
  const { isDeleted } = useSelector((state) => state.adminCategory);

  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  useEffect(() => {
    dispatch(viewAllCategories());
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      successMsg("Category deleted successfully");
      navigate("/admin/view/all/category");
      dispatch({ type: DELETE_CATEGORY_RESET });
    }
  }, [dispatch, error, isDeleted, navigate]);

  const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  const setBrandData = () => {
    const data = {
      columns: [
        {
          label: "Category ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Edit",
          field: "edit",
          sort: "disabled",
        },
        {
          label: "Delete",
          field: "delete",
          sort: "disabled",
        },
      ],
      rows: [],
    };

    categories.forEach((category) => {
      data.rows.push({
        id: category._id,
        name: category.name,
        edit: (
          <Fragment>
            <Link to={`/admin/category/${category._id}`}>
              <Button
                colorScheme="blue"
                size="sm"
                ml="3"
                leftIcon={<FaPencilAlt />}
              >
                Edit
              </Button>
            </Link>
          </Fragment>
        ),
        delete: (
          <Fragment>
            <Button
              colorScheme="red"
              size="sm"
              ml="3" // Adjust this value for spacing
              onClick={() => deleteCategoryHandler(category._id)}
              leftIcon={<FaTrashAlt />}
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
        <MetaData title="Categories list" />
        <div className="w-full bg-white rounded-xl p-3 space-y-3">
          <Stack>
            <Heading> All Categories</Heading>{" "}
          </Stack>
          {!loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setBrandData()}
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

export default CategoryList;
