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

        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Product Sales',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 10)',
                    borderWidth: 1,
                },
            ],
        };

        const chartOptions = {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
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

        const ctx = document.getElementById('mostBrandChart');

        if (ctx) {
            const chartInstance = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: chartOptions,
            });

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
            boxSizing: 'border-box',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <canvas id="mostBrandChart" />
        </div>
    );
};

export default ProductSales;


