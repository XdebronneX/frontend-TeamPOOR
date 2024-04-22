import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPriceLogs, clearErrors } from "../../actions/productActions";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { Box, Badge, Flex, useToast, Stack, Heading } from "@chakra-ui/react";
import MetaData from "../layout/MetaData";

const PriceLogHistory = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const toast = useToast();

  const { error, loading, priceHistoryLog } = useSelector(
    (state) => state.allPriceLogs
  );

  useEffect(() => {
    dispatch(getPriceLogs());
    if (loading) {
      showErrorToast(loading);
      dispatch(clearErrors());
    }
  }, [dispatch, error, navigate]);

  const setPriceData = () => {
    const data = {
      columns: [
        {
          label: "Date",
          field: "createdAt",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Brand",
          field: "brand",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "disabled",
        },
      ],
      rows: [],
    };

    if (priceHistoryLog && priceHistoryLog.length > 0) {
      priceHistoryLog.forEach((priceLog) => {
        const createdAt = new Date(priceLog.createdAt);
        const formattedDateTimeCreate = `${createdAt.toLocaleDateString(
          "en-US",
          { year: "numeric", month: "short", day: "2-digit" }
        )} ${createdAt.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
        })}`;

        // Set colorScheme based on status value
        const colorScheme =
          priceLog.status === "Increased"
            ? "green"
            : priceLog.status === "Decreased"
            ? "red"
            : "green";

        data.rows.push({
          name: priceLog.product.name,
          brand: priceLog.product.brand.name,
          price: `₱ ${priceLog.price.toLocaleString()}`,
          status: <Badge colorScheme={colorScheme}>{priceLog.status}</Badge>,
          createdAt: formattedDateTimeCreate,
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
        <MetaData title={"Stock Logs"} />
        <div className="w-full bg-white rounded-xl p-3 space-y-3 h-min">
          {" "}
          <Stack>
            <Heading>Price Logs History</Heading>{" "}
          </Stack>
          {!loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setPriceData()}
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

export default PriceLogHistory;
