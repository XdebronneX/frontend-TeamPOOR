
// import React, { useEffect } from 'react';
// import Chart from 'chart.js/auto';

// const ProductSales = ({ mostPurchasedProduct }) => {
//     useEffect(() => {
//     if (!mostPurchasedProduct || mostPurchasedProduct.length === 0) {
//         return;
//     }

//     const labels = mostPurchasedProduct.map(item => `${item.name} (${item.brand})`);
//     const data = mostPurchasedProduct.map(item => item.totalQuantity);

//     // Create chart data
//     const chartData = {
//         labels: labels,
//         datasets: [
//             {
//                 label: 'Product Sales',
//                 data: data,
//                 backgroundColor: 'rgba(54, 162, 235, 0.5)', // Bar fill color
//                 borderColor: 'rgba(54, 162, 235, 10)', // Bar border color
//                 borderWidth: 1,
//             },
//         ],
//     };

//     // Create chart options
//     const chartOptions = {
//         scales: {
//             y: {
//                 beginAtZero: true, // Start Y axis from zero
//                 title: {
//                     display: true,
//                     text: 'Quantity',
//                     font: {
//                         size: 14,
//                         weight: 'bold',
//                     },
//                 },
//             },
//             x: {
//                 title: {
//                     display: true,
//                     text: 'Product and Brand',
//                     font: {
//                         size: 14,
//                         weight: 'bold',
//                     },
//                 },
//             },
//         },
//         plugins: {
//             legend: {
//                 display: true,
//                 position: 'top',
//             },
//         },
//     };

//     Get chart canvas
//         const ctx = document.getElementById('mostBrandChart');

//         // Check if chart instance already exists, destroy it before creating a new one
//         if (ctx) {
//             const chartInstance = new Chart(ctx, {
//                 type: 'bar',
//                 data: chartData,
//                 options: chartOptions,
//             });

//             // Cleanup function to destroy chart instance when component unmounts
//             return () => {
//                 chartInstance.destroy();
//             };
//         }
//     }, [mostPurchasedProduct]);

//     return (
//         <div style={{
//             backgroundColor: '#ffffff',
//             borderRadius: '10px',
//             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
//             padding: '20px',
//             width: '100%',
//             height: '500px', // Set a fixed height for the chart container
//             boxSizing: 'border-box', // Ensure padding is included in the height calculation
//             position: 'relative', // Position the chart container
//             overflow: 'hidden', // Hide overflow to prevent shadows from overflowing
//         }}>
//             <canvas id="mostBrandChart" />
//         </div>
//     );
// };

// export default ProductSales;


//** Bar Chart */
// import React, { useEffect } from 'react';
// import Chart from 'chart.js/auto';

// const ProductSales = ({ mostPurchasedProduct }) => {
//     // useEffect(() => {
//         if (!mostPurchasedProduct || mostPurchasedProduct.length === 0) {
//             return;
//         }

//         const labels = mostPurchasedProduct.map(item => `${item.name} (${item.brand})`);
//         const data = mostPurchasedProduct.map(item => item.totalQuantity);

//         // Create chart data
//         const chartData = {
//             labels: labels,
//             datasets: [
//                 {
//                     label: 'Product Sales',
//                     data: data,
//                     backgroundColor: 'rgba(54, 162, 235, 0.5)', // Bar fill color
//                     borderColor: 'rgba(54, 162, 235, 10)', // Bar border color
//                     borderWidth: 1,
//                 },
//             ],
//         };

//         // Create chart options
//         const chartOptions = {
//             scales: {
//                 y: {
//                     beginAtZero: true, // Start Y axis from zero
//                     title: {
//                         display: true,
//                         text: 'Quantity',
//                         font: {
//                             size: 14,
//                             weight: 'bold',
//                         },
//                     },
//                 },
//                 x: {
//                     title: {
//                         display: true,
//                         text: 'Product and Brand',
//                         font: {
//                             size: 14,
//                             weight: 'bold',
//                         },
//                     },
//                 },
//             },
//             plugins: {
//                 legend: {
//                     display: true,
//                     position: 'top',
//                 },
//             },
//         };

//         // Get chart canvas
//     //     const ctx = document.getElementById('mostBrandChart');

//     //     // Check if chart instance already exists, destroy it before creating a new one
//     //     if (ctx) {
//     //         const chartInstance = new Chart(ctx, {
//     //             type: 'bar',
//     //             data: chartData,
//     //             options: chartOptions,
//     //         });

//     //         // Cleanup function to destroy chart instance when component unmounts
//     //         return () => {
//     //             chartInstance.destroy();
//     //         };
//     //     }
//     // }, [mostPurchasedProduct]);

//     React.useEffect(() => {
//         const ctx = document.getElementById('mostBrandChart');
//         new Chart(ctx, {
//             type: 'bar',
//             data: chartData,
//             options: chartOptions,
//         });
//     }, []);

//     return (
//         <div style={{
//             backgroundColor: '#ffffff',
//             borderRadius: '10px',
//             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
//             padding: '20px',
//             width: '100%',
//             height: '500px', // Set a fixed height for the chart container
//             boxSizing: 'border-box', // Ensure padding is included in the height calculation
//             position: 'relative', // Position the chart container
//             overflow: 'hidden', // Hide overflow to prevent shadows from overflowing
//         }}>
//             <canvas id="mostBrandChart" />
//         </div>
//     );
// };

// export default ProductSales;

//** Horizontal Bar Chart */
import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const ProductSales = ({ mostPurchasedProduct }) => {
    useEffect(() => {
        if (!mostPurchasedProduct || mostPurchasedProduct.length === 0) {
            return;
        }

        const labels = mostPurchasedProduct.map(item => `${item.name} (${item.brand})`);
        const data = mostPurchasedProduct.map(item => item.totalQuantity);

        // Create chart data
        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Product Sales',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)', // Bar fill color
                    borderColor: 'rgba(54, 162, 235, 10)', // Bar border color
                    borderWidth: 1,
                },
            ],
        };

        // Create chart options
        const chartOptions = {
            indexAxis: 'y', // Display bars horizontally
            scales: {
                x: {
                    beginAtZero: true, // Start X axis from zero
                    title: {
                        display: true,
                        text: 'Quantity',
                        font: {
                            size: 14,
                            weight: 'bold',
                        },
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Product and Brand',
                        font: {
                            size: 14,
                            weight: 'bold',
                        },
                    },
                },
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
            },
        };

        // Get chart canvas
        const ctx = document.getElementById('mostBrandChart');

        // Check if chart instance already exists, destroy it before creating a new one
        if (ctx) {
            const chartInstance = new Chart(ctx, {
                type: 'bar', // Change chart type to bar
                data: chartData,
                options: chartOptions,
            });

            // Cleanup function to destroy chart instance when component unmounts
            return () => {
                chartInstance.destroy();
            };
        }
    }, [mostPurchasedProduct]);

    return (
        <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            padding: '20px',
            width: '100%',
            boxSizing: 'border-box', // Ensure padding is included in the height calculation
            position: 'relative', // Position the chart container
            overflow: 'hidden', // Hide overflow to prevent shadows from overflowing
        }}>
            <canvas id="mostBrandChart" />
        </div>
    );
};

export default ProductSales;


