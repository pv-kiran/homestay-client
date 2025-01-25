import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Monthly = ({ monthlyData }) => {
    const data = {
        labels: monthlyData?.map(d => d.month),
        datasets: [
            {
                label: 'Revenue ($)',
                data: monthlyData?.map(d => d.revenue),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
            {
                label: 'Bookings',
                data: monthlyData?.map(d => d.bookings),
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Performance',
            },
        },
    };
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Monthly Report</h2>
            <Line options={options} data={data} />
        </div>
    );
}

export default Monthly;
