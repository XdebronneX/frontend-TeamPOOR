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
        name: item._id,
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




