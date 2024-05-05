import React, { useEffect } from "react";
import Chart from "chart.js/auto";

const BestMechanics = ({ mostRatedMechanics }) => {
    useEffect(() => {
        if (!mostRatedMechanics || mostRatedMechanics.length === 0) {
            return;
        }

        // Extract mechanic names and average ratings
        const labels = mostRatedMechanics.map((feedback) => feedback.mechanicName);
        const data = mostRatedMechanics.map((feedback) => feedback.averageRating);

        // Create chart data
        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: "Average Rating",
                    data: data,
                    backgroundColor: "#4CAF50",
                    borderColor: "#4CAF50",
                    borderWidth: 1,
                },
            ],
        };

        // Create chart options
        const chartOptions = {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Average Rating",
                        font: {
                            size: 14,
                            weight: "bold",
                        },
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: "Mechanic Name",
                        font: {
                            size: 14,
                            weight: "bold",
                        },
                    },
                },
            },
            plugins: {
                legend: {
                    display: false, // Hide legend as it's unnecessary for a single dataset
                },
            },
        };

        const ctx = document.getElementById("bestMechanicsChart");
        new Chart(ctx, {
            type: "bar",
            data: chartData,
            options: chartOptions,
        });
    }, [mostRatedMechanics]);

    return (
        <div
            style={{
                position: "relative",
            }}
        >
            <canvas id="bestMechanicsChart" />
        </div>
    );
};

export default BestMechanics;
