//** Line  Chart Example recharts **/
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const MonthlySales = ({ data, error }) => {
  // Function to format date
  const formatDate = (date) => {
    const options = { month: "long" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // Prepare data for chart
  const chartData = data.map((item) => ({
    name: formatDate(new Date(item._id.year, item._id.month - 1, 1)), // Format date
    totalSales: item.totalPrice, // Use total price as total sales
  }));

  // Check for error
  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  // Check for valid data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <p>No valid data available</p>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "10px",

      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          right: "20px",
          bottom: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          zIndex: 0,
        }}
      />
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />{" "}
          {/* Adjusted CartesianGrid */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `Php ${value.toLocaleString()}`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalSales"
            stroke="#B20000"
            name="Total Sales"
            strokeWidth={3}
            dot={{ stroke: "#B20000", strokeWidth: 3, r: 5 }}
            activeDot={{ stroke: "#B20000", strokeWidth: 3, r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySales;

//** Horizontal Bar Chart **/
// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

// const MonthlySales = ({ data }) => {
//     // Check for valid data
//     if (!data || !Array.isArray(data) || data.length === 0) {
//         console.log("No valid data received:", data);
//         return (
//             <div>No valid data available</div>
//         );
//     }

//     // Function to format date
//     const formatDate = (date) => {
//         const options = { month: 'long' };
//         return new Date(date).toLocaleDateString(undefined, options);
//     };

//     // Prepare data for chart
//     const chartData = data.map(item => ({
//         name: formatDate(new Date(item._id.year, item._id.month - 1, 1)), // Format date
//         totalSales: item.totalPrice // Use total price as total sales
//     }));

//     return (
//         <div style={{
//             position: 'relative',
//             backgroundColor: '#ffffff',
//             padding: '20px',
//             borderRadius: '10px',
//             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
//             zIndex: 1
//         }}>
//             <div style={{
//                 position: 'absolute',
//                 top: '20px',
//                 left: '20px',
//                 right: '20px',
//                 bottom: '20px',
//                 backgroundColor: '#ffffff',
//                 borderRadius: '10px',
//                 zIndex: 0
//             }} />
//             <ResponsiveContainer width="100%" height={500}>
//                 <BarChart
//                     data={chartData}
//                     margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
//                 >
//                     <CartesianGrid stroke="#AFE1AF" strokeDasharray="3 3" /> {/* Add grid lines for depth */}
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     {/* Render bars for total sales */}
//                     <Bar
//                         dataKey="totalSales"
//                         fill="#B20000"
//                         name="Total Sales"
//                     />
//                 </BarChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

// export default MonthlySales;
