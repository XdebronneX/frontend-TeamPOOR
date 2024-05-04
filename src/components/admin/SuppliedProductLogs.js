import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSuppliedLogs, clearErrors } from "../../actions/productActions";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { Box, Badge, Flex, useToast, Stack, Heading, Button } from "@chakra-ui/react";
import MetaData from "../layout/MetaData";
import { CiRead } from "react-icons/ci";

const SuppliedProductLogs = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const toast = useToast();
  const { error, loading, suppliedHistoryLog } = useSelector(
    (state) => state.allSupplied
  );
  console.log(suppliedHistoryLog);
  useEffect(() => {
    dispatch(getSuppliedLogs());
    if (loading) {
      showErrorToast(loading);
      dispatch(clearErrors());
    }
  }, [dispatch, error, navigate]);

  const setSuppliedData = () => {
    const data = {
      columns: [
        // {
        //     label: 'Idddddd',
        //     field: 'id',
        //     sort: 'asc',
        // },
        {
          label: "Date Delivered",
          field: "createdAt",
          sort: "asc",
        },
        {
          label: "Supplied By",
          field: "by",
          sort: "disabled",
        },
        {
          label: "View",
          field: "view",
          sort: "disabled",
        },
      ],
      rows: [],
    };

    if (suppliedHistoryLog && suppliedHistoryLog.length > 0) {
      suppliedHistoryLog.forEach((supplied) => {
        const createdAt = new Date(supplied.dateDelivered);
        const formattedDateTime = `${createdAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        })}, ${createdAt.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
        })}`;

        // Check if supplier exists and has the firstname property
        const supplierName =
          supplied.supplier && supplied.supplier.firstname
            ? supplied.supplier.firstname
            : "Unknown";

        // Push supplied details only once
        data.rows.push({
          id: supplied._id,
          by: supplierName,
          createdAt: formattedDateTime,
          view: (
            <Link
              to={`/admin/single/supplied/${supplied._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <CiRead />
            </Link>
          ),
        });
      });
    }

    return data;
  };

  const showErrorToast = (message) => {
    toast({
      title: "Error",
      description: message,
      status: "error",
      position: "bottom-center",
      duration: 3000,
      isClosable: true,
    });
  };

  const showSuccessToast = (message) => {
    toast({
      title: "Success",
      description: message,
      status: "success",
      position: "bottom-center",
      duration: 3000,
      isClosable: true,
    });
  };
  const supplierHandler = () => {
    navigate("/admin/supplier/history/logs");
  };

  return (
    <aside className="bg-zinc-100 min-h-screen p-3 flex flex-row gap-4">
      <nav className="h-full flex flex-col sticky top-4">
        <Sidebar />
      </nav>

      <Fragment>
        <MetaData title={"Stock Logs"} />
        <div className="w-full bg-white rounded-xl p-3 space-y-3 shadow-sm">
          <Stack>
            <Heading>Supplied Product Logs History</Heading>{" "}
          </Stack>
          <Button colorScheme="teal" onClick={supplierHandler} variant="outline">
            Supplier Log
          </Button>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setSuppliedData()}
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

export default SuppliedProductLogs;
