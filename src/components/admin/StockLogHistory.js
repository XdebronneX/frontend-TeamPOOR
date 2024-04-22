import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStockLogs, clearErrors } from "../../actions/productActions";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { Box, Badge, Flex, useToast, Stack, Heading } from "@chakra-ui/react";
import MetaData from "../layout/MetaData";
const StockLogHistory = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const toast = useToast();

  const { error, loading, stockLogs } = useSelector(
    (state) => state.allStockLogs
  );

  // console.log('logsock', stockLogs);
  useEffect(() => {
    dispatch(getStockLogs());
    if (loading) {
      showErrorToast(loading);
      dispatch(clearErrors());
    }
  }, [dispatch, error, navigate]);

  const setStockData = () => {
    const data = {
      columns: [
        {
          label: "Date Created",
          field: "createdAt",
          sort: "asc",
        },
        {
          label: "Product Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Product Brand",
          field: "brand",
          sort: "asc",
        },
        {
          label: "Quantity",
          field: "quantity",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "disabled",
        },
        {
          label: "By",
          field: "by",
          sort: "disabled",
        },
      ],
      rows: [],
    };

    if (stockLogs && stockLogs.length > 0) {
      stockLogs.forEach((stockLog) => {
        const createdAt = new Date(stockLog.createdAt);
        const formattedDateTime = `${createdAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        })}, ${createdAt.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
        })}`;
        const colorScheme = stockLog.status === "Sold" ? "red" : "green";
        data.rows.push({
          name: stockLog.name,
          brand: stockLog.brand,
          quantity: `${stockLog.quantity.toLocaleString()}`,
          status: <Badge colorScheme={colorScheme}>{stockLog.status}</Badge>,
          by: stockLog.by,
          createdAt: formattedDateTime,
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

  return (
    <aside className="bg-zinc-100 min-h-screen p-3 flex flex-row gap-4">
      <nav className="h-full flex flex-col sticky top-4">
        <Sidebar />
      </nav>

      <Fragment>
        <MetaData title={"All motorcycles"} />
        <div className="w-full bg-white rounded-xl p-3 space-y-3">
          {" "}
          <Stack>
            <Heading>Stock Logs History</Heading>{" "}
          </Stack>
          {!loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setStockData()}
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

export default StockLogHistory;
