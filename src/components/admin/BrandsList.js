import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  viewAllBrands,
  deleteBrand,
  clearErrors,
} from "../../actions/brandActions";
import { DELETE_BRANDS_RESET } from "../../constants/brandConstants";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { Box, Button, Flex, Stack, Heading } from "@chakra-ui/react";
import { FaPencilAlt, FaTrash, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/MetaData";

const BrandsList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  // const toast = useToast();

  const { error, loading, brands } = useSelector((state) => state.allBrands);
  const { isDeleted } = useSelector((state) => state.adminBrand);

  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  useEffect(() => {
    dispatch(viewAllBrands());
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      successMsg("Brand deleted successfully");
      navigate("/admin/view/all/brands");
      dispatch({ type: DELETE_BRANDS_RESET });
    }
  }, [dispatch, error, isDeleted, navigate]);

  const deleteBrandHandler = (id) => {
    dispatch(deleteBrand(id));
  };

  const setBrandData = () => {
    const data = {
      columns: [
        {
          label: "Brand ID",
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

    brands.forEach((brand) => {
      data.rows.push({
        id: brand._id,
        name: brand.name,
        edit: (
          <Fragment>
            <Link to={`/admin/brands/${brand._id}`}>
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
              onClick={() => deleteBrandHandler(brand._id)}
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
        <MetaData title={"Brands list"} />
        <div className="w-full bg-white rounded-xl p-3 space-y-3 shadow-sm">
          <Stack>
            <Heading> All Brands</Heading>{" "}
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

export default BrandsList;
