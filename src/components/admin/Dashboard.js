import React, { useEffect, Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Flex,
  Heading,
  Icon,
  Stack,
} from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import DashboardCard from "../admin/DashboardCard";
import MonthlySales from "./Reports/MonthlySales";
import { viewAllUsers } from "../../actions/userActions";
import { viewAllMotorcycles } from "../../actions/motorcycleActions";
import { viewAllBrands } from "../../actions/brandActions";
import { viewAllCategories } from "../../actions/categoryActions";
import { getAdminProducts } from "../../actions/productActions";
import { getAdminServices } from "../../actions/serviceActions";
import { allOrders } from "../../actions/orderActions";
import {
  monthlySalesChart,
  mostLoyalChart,
  mostProductChart,
  mostBrandChart,
  mostRatedChart,
} from "../../actions/reportsActions";
import { allAppointments } from "../../actions/appointmentActions";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import MostLoyalUser from "./Reports/MostLoyalUser";
import ProductSales from "./Reports/ProductSales";
import MostBrand from "./Reports/MostBrand";
import BestMechanics from "./Reports/BestMechanics";
import { GrMoney } from "react-icons/gr";
import { FaBoxesStacked } from "react-icons/fa6";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa6";
import { TbCircleLetterB } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { FaTruckRampBox } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { MdDownload, MdVerified } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";
import ReactToPrint from "react-to-print";
import * as XLSX from "xlsx";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { users, loading: loadingUsers } = useSelector(
    (state) => state.allUsers
  );
  const { motorcycles, loading: loadingMotorcycles } = useSelector(
    (state) => state.allMotorcycles
  );
  const { brands, loading: loadingBrands } = useSelector(
    (state) => state.allBrands
  );
  const { categories, loading: loadingCategories } = useSelector(
    (state) => state.allCategories
  );
  const { products, loading: loadingProducts } = useSelector(
    (state) => state.allProducts
  );
  const { services, loading: loadingServices } = useSelector(
    (state) => state.allServices
  );
  const {
    alllistorders,
    loading: loadingOrders,
    totalAmount,
  } = useSelector((state) => state.allOrders);
  const {
    allbookings,
    loading: loadingAppointment,
    totalAmountServices,
  } = useSelector((state) => state.allAppointment);
  const { monthlySales } = useSelector((state) => state.monthlySales);
  const { mostPurchasedUser } = useSelector((state) => state.mostLoyal);
  const { mostPurchasedProduct } = useSelector((state) => state.mostPurchased);
  const { mostPurchasedBrand } = useSelector((state) => state.mostBrand);
  const { mostRatedMechanics } = useSelector((state) => state.mostRated);

  useEffect(() => {
    dispatch(viewAllUsers());
    dispatch(viewAllMotorcycles());
    dispatch(viewAllBrands());
    dispatch(viewAllCategories());
    dispatch(getAdminProducts());
    dispatch(getAdminServices());
    dispatch(allOrders());
    dispatch(allAppointments());
    dispatch(monthlySalesChart());
    dispatch(mostLoyalChart());
    dispatch(mostProductChart());
    dispatch(mostBrandChart());
    dispatch(mostRatedChart());
  }, [dispatch]);

  const isLoading =
    loadingUsers ||
    loadingMotorcycles ||
    loadingBrands ||
    loadingCategories ||
    loadingProducts ||
    loadingServices ||
    loadingOrders ||
    loadingAppointment;

  const dashboardRef = useRef();

  const exportMonthlySalesToExcel = (data, filename, sheetName) => {
    const formatDate = (date) => {
      const options = { month: "long" };
      return new Date(date).toLocaleDateString(undefined, options);
    };

    const formattedData = data.map((item) => ({
      month: formatDate(new Date(item._id.year, item._id.month - 1, 1)), // Format date
      totalSales: item.totalPrice, // Use total price as total sales
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  const exportMostBrandToExcel = (data, filename, sheetName) => {
    const formattedData = data.map((item) => ({
      BrandName: item._id,
      TotalQuantity: item.totalQuantity,
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  const exportBiggestPurchasedToExcel = (data, filename, sheetName) => {
    const formattedData = data.map((user) => ({
      Lastname: user.user.lastname,
      TotalPurchased: user.totalPurchased,
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  const exportMostPurchasedProductToExcel = (data, filename, sheetName) => {
    const formattedData = data.map((product) => ({
      Name: product.name, // Change to 'Name'
      Brand: product.brand, // Change to 'Brand'
      TotalQuantity: product.totalQuantity, // Remain the same
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  return (
    <aside className="bg-zinc-100 min-h-screen p-3 flex flex-row gap-4">
      <nav className="h-full flex flex-col sticky top-4">
        <Sidebar />
      </nav>

      <div className="w-full col-span-4">
        {isLoading ? (
          <Flex justify="center" align="center" minH="100%">
            <Loader />
          </Flex>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-row gap-4">
              <ReactToPrint
                trigger={() => (
                  <Button
                    leftIcon={<MdDownload />}
                    colorScheme="blue"
                    variant="solid"
                    size="sm"
                  >
                    Print Reports
                  </Button>
                )}
                content={() => dashboardRef.current}
              />

              <Button
                leftIcon={<MdDownload />}
                colorScheme="blue"
                variant="solid"
                onClick={() =>
                  exportMonthlySalesToExcel(monthlySales, "Monthly_Sales")
                }
                size="sm"
              >
                Export Monthly Sales to Excel
              </Button>

              <Button
                leftIcon={<MdDownload />}
                colorScheme="blue"
                variant="solid"
                onClick={() =>
                  exportMostBrandToExcel(
                    mostPurchasedBrand,
                    "Most_Purchased_Brand"
                  )
                }
                size="sm"
              >
                Export Most Purchased Brand to Excel
              </Button>

              <Button
                leftIcon={<MdDownload />}
                colorScheme="blue"
                variant="solid"
                onClick={() =>
                  exportBiggestPurchasedToExcel(
                    mostPurchasedUser,
                    "Most_Loyal_User"
                  )
                }
                size="sm"
              >
                Export Most Loyal User to Excel
              </Button>

              {/* <button onClick={() => exportToExcel(mostRatedMechanics, "Most_Rated_Mechanics")}>
                Export Most Rated Mechanics to Excel
              </button> */}

              <Button
                leftIcon={<MdDownload />}
                colorScheme="blue"
                variant="solid"
                onClick={() =>
                  exportMostPurchasedProductToExcel(
                    mostPurchasedProduct,
                    "Most_Purchased_Product"
                  )
                }
                size="sm"
              >
                Export Most Purchased Product to Excel
              </Button>
            </div>

            <div
              className="grid grid-flow-row auto-rows-max grid-cols-1 gap-4 lg:grid-cols-5"
              ref={dashboardRef}
            >
              <div className="bg-white rounded-xl p-3 flex flex-row space-x-2 items-center shadow-sm col-span-2">
                <div className="bg-red-50 p-3 rounded-xl">
                  <FaBoxesStacked size={34} color="#ef4444" />
                </div>
                <div>
                  <p>Total Product Revenue</p>

                  <p className="text-lg font-bold">
                    ₱
                    {totalAmount
                      ? totalAmount.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })
                      : "0.00"}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-3 flex flex-row space-x-2 items-center shadow-sm col-span-2">
                <div className="bg-red-50 p-3 rounded-xl">
                  <HiMiniWrenchScrewdriver size={34} color="#ef4444" />
                </div>
                <div>
                  <p>Total Service Revenue</p>

                  <p className="text-lg font-bold">
                    ₱
                    {totalAmountServices
                      ? totalAmountServices.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })
                      : "0.00"}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 shadow-sm row-span-4 space-y-3">
                <div>
                  <p>All Total in System</p>
                </div>
                <div className="flex flex-row space-x-2 items-center">
                  <div className="bg-red-50 p-3 rounded-xl">
                    <FaUsers size={24} color="#ef4444" />
                  </div>
                  <div>
                    <p>Total registered users</p>
                    <p className="text-normal font-bold">{users?.length}</p>
                  </div>
                </div>
                <div className="flex flex-row space-x-2 items-center">
                  <div className="bg-red-50 p-3 rounded-xl">
                    <VscUnverified size={24} color="#ef4444" />
                  </div>
                  <div>
                    <p>Unverified users</p>
                    <p className="text-normal font-bold">
                      {users.filter((user) => !user.verified).length}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row space-x-2 items-center">
                  <div className="bg-red-50 p-3 rounded-xl">
                    <MdVerified size={24} color="#ef4444" />
                  </div>
                  <div>
                    <p>Verified users</p>
                    <p className="text-normal font-bold">
                      {users.filter((user) => user.verified).length}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row space-x-2 items-center">
                  <div className="bg-red-50 p-3 rounded-xl">
                    <FaMotorcycle size={24} color="#ef4444" />
                  </div>
                  <div>
                    <p>Registered Motorcycles</p>

                    <p className="text-normal font-bold">
                      {motorcycles?.length}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row space-x-2 items-center">
                  <div className="bg-red-50 p-3 rounded-xl">
                    <TbCircleLetterB size={24} color="#ef4444" />
                  </div>
                  <div>
                    <p>Total Product Brands</p>

                    <p className="text-normal font-bold">{brands?.length}</p>
                  </div>
                </div>
                <div className="flex flex-row space-x-2 items-center">
                  <div className="bg-red-50 p-3 rounded-xl">
                    <BiCategory size={24} color="#ef4444" />
                  </div>
                  <div>
                    <p>Total Product Categories</p>

                    <p className="text-normal font-bold">
                      {categories?.length}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row space-x-2 items-center">
                  <div className="bg-red-50 p-3 rounded-xl">
                    <FaBoxesStacked size={24} color="#ef4444" />
                  </div>
                  <div>
                    <p>Total Products</p>

                    <p className="text-normal font-bold">{products?.length}</p>
                  </div>
                </div>
                <div className="flex flex-row space-x-2 items-center">
                  <div className="bg-red-50 p-3 rounded-xl">
                    <HiMiniWrenchScrewdriver size={24} color="#ef4444" />
                  </div>
                  <div>
                    <p>Total Services</p>

                    <p className="text-normal font-bold">{services?.length}</p>
                  </div>
                </div>
                <div className="flex flex-row space-x-2 items-center">
                  <div className="bg-red-50 p-3 rounded-xl">
                    <FaTruckRampBox size={24} color="#ef4444" />
                  </div>
                  <div>
                    <p>Total Orders</p>

                    <p className="text-normal font-bold">
                      {alllistorders?.length}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row space-x-2 items-center">
                  <div className="bg-red-50 p-3 rounded-xl">
                    <IoCalendarOutline size={24} color="#ef4444" />
                  </div>
                  <div>
                    <p>Total Appointments</p>

                    <p className="text-normal font-bold">
                      {allbookings?.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-1 shadow-sm col-span-4 row-span-3 ">
                <div className="p-3">
                  <p className="text-lg font-bold">Monthly Sales</p>
                </div>

                <MonthlySales data={monthlySales} />
              </div>

              <div className="bg-white rounded-xl p-1 shadow-sm col-span-2">
                <div className="p-3">
                  <p className="text-lg font-bold">Most Purchased Brand</p>
                </div>

                <MostBrand mostPurchasedBrand={mostPurchasedBrand} />
              </div>

              <div className="bg-white rounded-xl p-1 shadow-sm col-span-3">
                <div className="p-3">
                  <p className="text-lg font-bold">Biggest Purchased</p>
                </div>

                <MostLoyalUser totalPurchasedByUser={mostPurchasedUser} />
              </div>

              <div className="bg-white rounded-xl p-1 shadow-sm col-span-5">
                <div className="p-3">
                  <p className="text-lg font-bold">Most Rated Mechanic</p>
                </div>

                <BestMechanics mostRatedMechanics={mostRatedMechanics} />
              </div>

              <div className="bg-white rounded-xl p-1 shadow-sm col-span-5">
                <div className="p-3">
                  <p className="text-lg font-bold">Most Pruchased Product</p>
                </div>

                <ProductSales mostPurchasedProduct={mostPurchasedProduct} />
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Dashboard;
