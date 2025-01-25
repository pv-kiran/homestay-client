import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Yealry = ({ yealryData }) => {
    const data = {
        labels: yealryData?.map(d => d.year),
        datasets: [
            {
                label: 'Total Revenue ($)',
                data: yealryData?.map(d => d.totalRevenue),
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
            },
            {
                label: 'Total Bookings',
                data: yealryData?.map(d => d.totalBookings),
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
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
                text: 'Yearly Performance',
            },
        },
    };
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Yearly Report</h2>
            <Bar options={options} data={data} />
        </div>
    );
}

export default Yealry;
