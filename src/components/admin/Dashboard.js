// import React, { useEffect, Fragment, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Box,
//   CircularProgress,
//   Divider,
//   Flex,
//   Heading,
//   Icon,
//   Stack,
// } from "@chakra-ui/react";
// import Sidebar from "./Sidebar";
// import DashboardCard from "../admin/DashboardCard";
// import MonthlySales from "./Reports/MonthlySales";
// import { viewAllUsers } from "../../actions/userActions";
// import { viewAllMotorcycles } from "../../actions/motorcycleActions";
// import { viewAllBrands } from "../../actions/brandActions";
// import { viewAllCategories } from "../../actions/categoryActions";
// import { getAdminProducts } from "../../actions/productActions";
// import { getAdminServices } from "../../actions/serviceActions";
// import { allOrders } from "../../actions/orderActions";
// import {
//   monthlySalesChart,
//   mostLoyalChart,
//   mostProductChart,
//   mostBrandChart,
//   mostRatedChart
// } from "../../actions/reportsActions";
// import { allAppointments } from "../../actions/appointmentActions";
// import Loader from "../layout/Loader";
// import MetaData from "../layout/MetaData";
// import MostLoyalUser from "./Reports/MostLoyalUser";
// import ProductSales from "./Reports/ProductSales";
// import MostBrand from "./Reports/MostBrand";
// import BestMechanics from "./Reports/BestMechanics";
// import { GrMoney } from "react-icons/gr";
// import { FaBoxesStacked } from "react-icons/fa6";
// import { HiMiniWrenchScrewdriver } from "react-icons/hi2";
// import { FaUsers } from "react-icons/fa";
// import { FaMotorcycle } from "react-icons/fa6";
// import { TbCircleLetterB } from "react-icons/tb";
// import { BiCategory } from "react-icons/bi";
// import { FaTruckRampBox } from "react-icons/fa6";
// import { IoCalendarOutline } from "react-icons/io5";
// import { MdVerified } from "react-icons/md";
// import { VscUnverified } from "react-icons/vsc";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const { users, loading: loadingUsers } = useSelector(
//     (state) => state.allUsers
//   );
//   const { motorcycles, loading: loadingMotorcycles } = useSelector(
//     (state) => state.allMotorcycles
//   );
//   const { brands, loading: loadingBrands } = useSelector(
//     (state) => state.allBrands
//   );
//   const { categories, loading: loadingCategories } = useSelector(
//     (state) => state.allCategories
//   );
//   const { products, loading: loadingProducts } = useSelector(
//     (state) => state.allProducts
//   );
//   const { services, loading: loadingServices } = useSelector(
//     (state) => state.allServices
//   );
//   const {
//     alllistorders,
//     loading: loadingOrders,
//     totalAmount,
//   } = useSelector((state) => state.allOrders);
//   const {
//     allbookings,
//     loading: loadingAppointment,
//     totalAmountServices,
//   } = useSelector((state) => state.allAppointment);
//   const { monthlySales } = useSelector((state) => state.monthlySales);
//   const { mostPurchasedUser } = useSelector((state) => state.mostLoyal);
//   const { mostPurchasedProduct } = useSelector((state) => state.mostPurchased);
//   const { mostPurchasedBrand } = useSelector((state) => state.mostBrand);
//   const { mostRatedMechanics } = useSelector((state) => state.mostRated);


//   useEffect(() => {
//     dispatch(viewAllUsers());
//     dispatch(viewAllMotorcycles());
//     dispatch(viewAllBrands());
//     dispatch(viewAllCategories());
//     dispatch(getAdminProducts());
//     dispatch(getAdminServices());
//     dispatch(allOrders());
//     dispatch(allAppointments());
//     dispatch(monthlySalesChart());
//     dispatch(mostLoyalChart());
//     dispatch(mostProductChart());
//     dispatch(mostBrandChart());
//     dispatch(mostRatedChart());
//   }, [dispatch]);

//   const isLoading =
//     loadingUsers ||
//     loadingMotorcycles ||
//     loadingBrands ||
//     loadingCategories ||
//     loadingProducts ||
//     loadingServices ||
//     loadingOrders ||
//     loadingAppointment;

//   const dashboardRef = useRef(null);
//   const exportToPDF = () => {
//     const input = dashboardRef.current;

//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF();
//       const imgWidth = 210;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
//       pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
//       pdf.save("dashboard.pdf");
//     });
//   };

//   return (
//     <aside className="bg-zinc-100 min-h-screen p-3 flex flex-row gap-4">
//       <nav className="h-full flex flex-col sticky top-4">
//         <Sidebar />
//       </nav>

//       <div className="w-full col-span-4" ref={dashboardRef}>
//         {isLoading ? (
//           <Flex justify="center" align="center" minH="100%">
//             <Loader />
//           </Flex>
//         ) : (
//           <div className="grid grid-flow-row auto-rows-max grid-cols-1 gap-4 lg:grid-cols-5">
//             <div className="bg-white rounded-xl p-3 flex flex-row space-x-2 items-center shadow-sm col-span-2">
//               {/* <button onClick={exportToPDF}>Export to PDF</button> */}
//               <div className="bg-red-50 p-3 rounded-xl">
//                 <FaBoxesStacked size={34} color="#ef4444" />
//               </div>
//               <div>
//                 <p>Total Product Revenue</p>

//                 <p className="text-lg font-bold">
//                   ₱
//                   {totalAmount
//                     ? totalAmount.toLocaleString(undefined, {
//                       maximumFractionDigits: 2,
//                     })
//                     : "0.00"}
//                 </p>
//               </div>
//             </div>
//             <div className="bg-white rounded-xl p-3 flex flex-row space-x-2 items-center shadow-sm col-span-2">
//               <div className="bg-red-50 p-3 rounded-xl">
//                 <HiMiniWrenchScrewdriver size={34} color="#ef4444" />
//               </div>
//               <div>
//                 <p>Total Service Revenue</p>

//                 <p className="text-lg font-bold">
//                   ₱
//                   {totalAmountServices ? totalAmountServices.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '0.00'}
//                 </p>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl p-3 shadow-sm row-span-4 space-y-3">
//               <div>
//                 <p>All Total in System</p>
//               </div>
//               <div className="flex flex-row space-x-2 items-center">
//                 <div className="bg-red-50 p-3 rounded-xl">
//                   <FaUsers size={24} color="#ef4444" />
//                 </div>
//                 <div>
//                   <p>Total registered users</p>
//                   <p className="text-normal font-bold">{users?.length}</p>
//                 </div>
//               </div>
//               <div className="flex flex-row space-x-2 items-center">
//                 <div className="bg-red-50 p-3 rounded-xl">
//                   <VscUnverified size={24} color="#ef4444" />
//                 </div>
//                 <div>
//                   <p>Unverified users</p>
//                   <p className="text-normal font-bold">{users.filter(user => !user.verified).length}</p>
//                 </div>
//               </div>
//               <div className="flex flex-row space-x-2 items-center">
//                 <div className="bg-red-50 p-3 rounded-xl">
//                   <MdVerified size={24} color="#ef4444" />
//                 </div>
//                 <div>
//                   <p>Verified users</p>
//                   <p className="text-normal font-bold">{users.filter(user => user.verified).length}</p>
//                 </div>
//               </div>
//               <div className="flex flex-row space-x-2 items-center">
//                 <div className="bg-red-50 p-3 rounded-xl">
//                   <FaMotorcycle size={24} color="#ef4444" />
//                 </div>
//                 <div>
//                   <p>Registered Motorcycles</p>

//                   <p className="text-normal font-bold">{motorcycles?.length}</p>
//                 </div>
//               </div>
//               <div className="flex flex-row space-x-2 items-center">
//                 <div className="bg-red-50 p-3 rounded-xl">
//                   <TbCircleLetterB size={24} color="#ef4444" />
//                 </div>
//                 <div>
//                   <p>Total Product Brands</p>

//                   <p className="text-normal font-bold">{brands?.length}</p>
//                 </div>
//               </div>
//               <div className="flex flex-row space-x-2 items-center">
//                 <div className="bg-red-50 p-3 rounded-xl">
//                   <BiCategory size={24} color="#ef4444" />
//                 </div>
//                 <div>
//                   <p>Total Product Categories</p>

//                   <p className="text-normal font-bold">{categories?.length}</p>
//                 </div>
//               </div>
//               <div className="flex flex-row space-x-2 items-center">
//                 <div className="bg-red-50 p-3 rounded-xl">
//                   <FaBoxesStacked size={24} color="#ef4444" />
//                 </div>
//                 <div>
//                   <p>Total Products</p>

//                   <p className="text-normal font-bold">{products?.length}</p>
//                 </div>
//               </div>
//               <div className="flex flex-row space-x-2 items-center">
//                 <div className="bg-red-50 p-3 rounded-xl">
//                   <HiMiniWrenchScrewdriver size={24} color="#ef4444" />
//                 </div>
//                 <div>
//                   <p>Total Services</p>

//                   <p className="text-normal font-bold">{services?.length}</p>
//                 </div>
//               </div>
//               <div className="flex flex-row space-x-2 items-center">
//                 <div className="bg-red-50 p-3 rounded-xl">
//                   <FaTruckRampBox size={24} color="#ef4444" />
//                 </div>
//                 <div>
//                   <p>Total Orders</p>

//                   <p className="text-normal font-bold">
//                     {alllistorders?.length}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex flex-row space-x-2 items-center">
//                 <div className="bg-red-50 p-3 rounded-xl">
//                   <IoCalendarOutline size={24} color="#ef4444" />
//                 </div>
//                 <div>
//                   <p>Total Appointments</p>

//                   <p className="text-normal font-bold">{allbookings?.length}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl p-1 shadow-sm col-span-4 row-span-3 ">
//               <div className="p-3">
//                 <p className="text-lg font-bold">Monthly Sales</p>
//               </div>

//               <MonthlySales data={monthlySales} />
//             </div>

//             <div className="bg-white rounded-xl p-1 shadow-sm col-span-2">
//               <div className="p-3">
//                 <p className="text-lg font-bold">Most Purchased Brand</p>
//               </div>

//               <MostBrand mostPurchasedBrand={mostPurchasedBrand} />
//             </div>

//             <div className="bg-white rounded-xl p-1 shadow-sm col-span-3">
//               <div className="p-3">
//                 <p className="text-lg font-bold">Biggest Purchased</p>
//               </div>

//               <MostLoyalUser totalPurchasedByUser={mostPurchasedUser} />
//             </div>

//             <div className="bg-white rounded-xl p-1 shadow-sm col-span-5">
//               <div className="p-3">
//                 <p className="text-lg font-bold">Most Rated Mechanic</p>
//               </div>

//               <BestMechanics mostRatedMechanics={mostRatedMechanics} />
//             </div>

//             <div className="bg-white rounded-xl p-1 shadow-sm col-span-5">
//               <div className="p-3">
//                 <p className="text-lg font-bold">Most Pruchased Product</p>
//               </div>

//               <ProductSales mostPurchasedProduct={mostPurchasedProduct} />
//             </div>
//               <button onClick={exportToPDF}>Export to PDF</button>
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// };

// export default Dashboard;


import React, { useEffect, Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  Divider,
  Flex,
  Heading,
  Icon,
  Stack,
  Select
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
  mostRatedChart
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
import { MdVerified } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const Dashboard = () => {
  const dispatch = useDispatch();
  // State to manage selected chart for export
  const [selectedChart, setSelectedChart] = useState(null);

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

  // Refs for exporting to PDF
  const dashboardRef = useRef(null);
  const monthlySalesRef = useRef(null);
  const mostBrandRef = useRef(null);
  const mostLoyalUserRef = useRef(null);
  const mostRatedMechanicsRef = useRef(null);
  const mostPurchasedProductRef = useRef(null);

  // Export dashboard to PDF
  const exportToPDF = () => {
    const input = dashboardRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("reports.pdf");
    });
  };

  // Export selected chart to PDF
  const exportChartToPDF = () => {
    const chartRef =
      selectedChart === "monthlySales"
        ? monthlySalesRef.current
        : selectedChart === "mostBrand"
          ? mostBrandRef.current
          : selectedChart === "mostLoyalUser"
            ? mostLoyalUserRef.current
            : selectedChart === "mostRatedMechanics"
              ? mostRatedMechanicsRef.current
              : selectedChart === "mostPurchasedProduct"
                ? mostPurchasedProductRef.current
                : null;

    console.log("Exporting chart to PDF...", chartRef);

    if (chartRef) {
      html2canvas(chartRef).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(`${selectedChart}.pdf`);
      });
    }
  };

  return (
    <aside className="bg-zinc-100 min-h-screen p-3 flex flex-row gap-4">
      <nav className="h-full flex flex-col sticky top-4">
        <Sidebar />
      </nav>

      <div className="w-full col-span-4" ref={dashboardRef}>
        {isLoading ? (
          <Flex justify="center" align="center" minH="100%">
            <Loader />
          </Flex>
        ) : (
          <div className="grid grid-flow-row auto-rows-max grid-cols-1 gap-4 lg:grid-cols-5">
            <div className="bg-white rounded-xl p-3 flex flex-row space-x-2 items-center shadow-sm col-span-2">
              {/* <button onClick={exportToPDF}>Export to PDF</button> */}
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
                  {totalAmountServices ? totalAmountServices.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '0.00'}
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
                  <p className="text-normal font-bold">{users.filter(user => !user.verified).length}</p>
                </div>
              </div>
              <div className="flex flex-row space-x-2 items-center">
                <div className="bg-red-50 p-3 rounded-xl">
                  <MdVerified size={24} color="#ef4444" />
                </div>
                <div>
                  <p>Verified users</p>
                  <p className="text-normal font-bold">{users.filter(user => user.verified).length}</p>
                </div>
              </div>
              <div className="flex flex-row space-x-2 items-center">
                <div className="bg-red-50 p-3 rounded-xl">
                  <FaMotorcycle size={24} color="#ef4444" />
                </div>
                <div>
                  <p>Registered Motorcycles</p>

                  <p className="text-normal font-bold">{motorcycles?.length}</p>
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

                  <p className="text-normal font-bold">{categories?.length}</p>
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

                  <p className="text-normal font-bold">{allbookings?.length}</p>
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
            {/* <button onClick={exportToPDF}>Export to PDF</button> */}
          </div>
        )}
      </div>
      {/* Dropdown to select the chart for export */}
      <Select
        placeholder="Select chart"
        value={selectedChart}
        onChange={(e) => setSelectedChart(e.target.value)}
      >
        <option value="monthlySales">Monthly Sales</option>
        <option value="mostBrand">Most Purchased Brand</option>
        <option value="mostLoyalUser">Biggest Purchased</option>
        <option value="mostRatedMechanics">Most Rated Mechanic</option>
        <option value="mostPurchasedProduct">Most Purchased Product</option>
      </Select>

      {/* Button to export selected chart */}
      <button onClick={exportChartToPDF}>Export Chart to PDF</button>
      {/* Button to export whole dashboard */}
      <button onClick={exportToPDF}>Export to PDF</button>
    </aside>
  );
};

export default Dashboard;
