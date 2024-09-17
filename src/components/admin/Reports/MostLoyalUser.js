import React, { useEffect } from "react";
import Chart from "chart.js/auto";

const MostLoyalUser = ({ totalPurchasedByUser }) => {
  useEffect(() => {
    if (!totalPurchasedByUser || totalPurchasedByUser.length === 0) {
      return;
    }

    const labels = totalPurchasedByUser.map((user) => user.user.lastname);
    const data = totalPurchasedByUser.map((user) => user.totalPurchased);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Most Purchased Amount",
          data: data,
          backgroundColor: "#8884d8",
          borderColor: "#8884d8",
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Total Purchased Amount",
            font: {
              size: 14,
              weight: "bold",
            },
          },
        },
        x: {
          title: {
            display: true,
            text: "User Lastname",
            font: {
              size: 14,
              weight: "bold",
            },
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
    };

    const ctx = document.getElementById("loyalUserChart");
    new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: chartOptions,
    });
  }, [totalPurchasedByUser]);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <canvas id="loyalUserChart" />
    </div>
  );
};

export default MostLoyalUser;
