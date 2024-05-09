// import React, { useEffect, useRef, useState } from 'react';
// import Chart from 'chart.js/auto'; // Import Chart.js library

// const MostBrand = ({ mostPurchasedBrand }) => {
//     const chartRef = useRef(null);
//     const [chartInstance, setChartInstance] = useState(null);

//     useEffect(() => {
//         if (Array.isArray(mostPurchasedBrand) && mostPurchasedBrand.length > 0) {
//             // Create horizontal bar chart
//             const ctx = chartRef.current.getContext('2d');
//             const newChartInstance = new Chart(ctx, {
//                 type: 'bar', // Change type to 'bar' for horizontal bar chart
//                 data: {
//                     labels: mostPurchasedBrand.map(item => item._id),
//                     datasets: [{
//                         label: 'Brand Sales',
//                         data: mostPurchasedBrand.map(item => item.totalQuantity),
//                         backgroundColor: 'rgba(54, 162, 235, 0.5)', // Bar color
//                         borderColor: 'rgba(54, 162, 235, 1)', // Border color
//                         borderWidth: 1
//                     }]
//                 },
//                 options: {
//                     indexAxis: 'y', // Set index axis to 'y' for horizontal bar chart
//                     responsive: true,
//                     maintainAspectRatio: false, // Prevent maintaining aspect ratio
//                     plugins: {
//                         legend: {
//                             display: false // Hide legend for horizontal bar chart
//                         },
//                         title: {
//                             display: false,
//                             text: 'Brand Sales'
//                         },
//                         scales: {
//                             x: {
//                                 beginAtZero: true // Start scale at 0
//                             }
//                         }
//                     }
//                 }
//             });
//             setChartInstance(newChartInstance);
//         }

//         // Cleanup function to destroy chart instance when component unmounts
//         return () => {
//             if (chartInstance) {
//                 chartInstance.destroy();
//             }
//         };
//     }, [mostPurchasedBrand]);

//     const styles = {
//         chartContainer: {
//             backgroundColor: '#ffffff',
//             borderRadius: '10px',
//             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
//             padding: '20px',
//             width: '100%',
//             height: '500px',
//             boxSizing: 'border-box',
//             position: 'relative',
//             overflow: 'hidden',
//         },
//         chartCanvas: {
//             width: '100%',
//             height: '400px',
//         }
//     };

//     return (
//         <div style={styles.chartContainer}>
//             <canvas
//                 ref={chartRef}
//                 style={styles.chartCanvas}
//             ></canvas>
//         </div>
//     );
// }

// export default MostBrand;


//** Random generate  colors */
// import React, { useEffect, useRef, useState } from 'react';
// import Chart from 'chart.js/auto'; // Import Chart.js library

// const MostBrand = ({ mostPurchasedBrand }) => {
//     const chartRef = useRef(null);
//     const [chartInstance, setChartInstance] = useState(null);

//     useEffect(() => {
//         if (Array.isArray(mostPurchasedBrand) && mostPurchasedBrand.length > 0) {
//             if (chartInstance) {
//                 // Destroy existing chart instance
//                 chartInstance.destroy();
//             }

//             // Create pie chart
//             const ctx = chartRef.current.getContext('2d');

//             // Generate random colors for new brands
//             const generateRandomColor = () => {
//                 const r = Math.floor(Math.random() * 256);
//                 const g = Math.floor(Math.random() * 256);
//                 const b = Math.floor(Math.random() * 256);
//                 const alpha = 0.5; // Set alpha value to 0.5 (semi-transparent)
//                 return `rgba(${r}, ${g}, ${b}, ${alpha})`;
//             };

//             const backgroundColors = mostPurchasedBrand.map(item =>
//                 item.backgroundColor ? item.backgroundColor : generateRandomColor()
//             );

//             const newChartInstance = new Chart(ctx, {
//                 type: 'pie', // Change type to 'pie' for pie chart
//                 data: {
//                     labels: mostPurchasedBrand.map(item => item._id),
//                     datasets: [{
//                         label: 'Brand Sales',
//                         data: mostPurchasedBrand.map(item => item.totalQuantity),
//                         backgroundColor: backgroundColors,
//                         borderColor: backgroundColors.map(color => color.replace('0.5', '1')), // Set border colors
//                         borderWidth: 1
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     maintainAspectRatio: false, // Prevent maintaining aspect ratio
//                     plugins: {
//                         legend: {
//                             display: true,
//                             position: 'right', // Adjust legend position as needed
//                         },
//                         title: {
//                             display: false,
//                             text: 'Most Purchased Brands',
//                             fontSize: 16,
//                         }
//                     }
//                 }
//             });
//             setChartInstance(newChartInstance);
//         }
//     }, [mostPurchasedBrand]);


//     const styles = {
//         chartContainer: {
//             backgroundColor: '#ffffff',
//             borderRadius: '10px',
//             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
//             padding: '20px',
//             width: '100%',
//             height: '500px',
//             boxSizing: 'border-box',
//             position: 'relative',
//             overflow: 'hidden',
//         },
//         chartCanvas: {
//             width: '100%',
//             height: '400px',
//         }
//     };

//     return (
//         <div style={styles.chartContainer}>
//             <canvas
//                 ref={chartRef}
//                 style={styles.chartCanvas}
//             ></canvas>
//         </div>
//     );
// }

// export default MostBrand;


// import React, { useEffect, useRef, useState } from 'react';
// import Chart from 'chart.js/auto'; // Import Chart.js library

// const MostBrand = ({ mostPurchasedBrand }) => {
//     const chartRef = useRef(null);
//     const [chartInstance, setChartInstance] = useState(null);

//     useEffect(() => {
//         if (Array.isArray(mostPurchasedBrand) && mostPurchasedBrand.length > 0) {
//             if (chartInstance) {
//                 // Destroy existing chart instance
//                 chartInstance.destroy();
//             }

//             // Create pie chart
//             const ctx = chartRef.current.getContext('2d');
//             const newChartInstance = new Chart(ctx, {
//                 type: 'pie', // Change type to 'pie' for pie chart
//                 data: {
//                     labels: mostPurchasedBrand.map(item => item._id),
//                     datasets: [{
//                         label: 'Brand Sales',
//                         data: mostPurchasedBrand.map(item => item.totalQuantity),
//                         backgroundColor: [
//                             'rgba(255, 99, 132, 0.5)', // Red
//                             'rgba(54, 162, 235, 0.5)', // Blue
//                             'rgba(255, 205, 86, 0.5)', // Yellow
//                             'rgba(75, 192, 192, 0.5)', // Green
//                             'rgba(153, 102, 255, 0.5)', // Purple
//                             'rgba(255, 159, 64, 0.5)', // Orange
//                             // Add more colors as needed
//                         ],
//                         borderColor: [
//                             'rgba(255, 99, 132, 1)',
//                             'rgba(54, 162, 235, 1)',
//                             'rgba(255, 205, 86, 1)',
//                             'rgba(75, 192, 192, 1)',
//                             'rgba(153, 102, 255, 1)',
//                             'rgba(255, 159, 64, 1)',
//                             // Add more border colors as needed
//                         ],
//                         borderWidth: 1
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     maintainAspectRatio: false, // Prevent maintaining aspect ratio
//                     plugins: {
//                         legend: {
//                             display: true,
//                             position: 'right', // Adjust legend position as needed
//                         },
//                         title: {
//                             display: false,
//                             text: 'Most Purchased Brands',
//                             fontSize: 16,
//                         }
//                     }
//                 }
//             });
//             setChartInstance(newChartInstance);
//         }
//     }, [mostPurchasedBrand]);

//     const styles = {
//         chartContainer: {
//             backgroundColor: '#ffffff',
//             borderRadius: '10px',
//             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
//             padding: '20px',
//             width: '100%',
//             height: '500px',
//             boxSizing: 'border-box',
//             position: 'relative',
//             overflow: 'hidden',
//         },
//         chartCanvas: {
//             width: '100%',
//             height: '400px',
//         }
//     };

//     return (
//         <div style={styles.chartContainer}>
//             <canvas
//                 ref={chartRef}
//                 style={styles.chartCanvas}
//             ></canvas>
//         </div>
//     );
// }

// export default MostBrand;

import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const MostBrand = ({ mostPurchasedBrand }) => {
    const generateRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const alpha = 0.8; // Set alpha value to 0.8 (semi-transparent)
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const data = mostPurchasedBrand.map(item => ({
        name: item.brand.name,
        value: item.totalQuantity,
        backgroundColor: item.backgroundColor ? item.backgroundColor : generateRandomColor(),
    }));

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    innerRadius={80}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.backgroundColor} />
                    ))}
                </Pie>
                <Legend align="center" verticalAlign="bottom" layout="horizontal" wrapperStyle={{ paddingBottom: '20px' }} />
                <Tooltip />
            </PieChart>
        </div>
    );
};

export default MostBrand;




