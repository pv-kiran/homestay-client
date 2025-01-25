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

const Homestay = ({ homestayData }) => {
    const data = {
        labels: homestayData?.map(d => d.name),
        datasets: [
            {
                label: 'Revenue ($)',
                data: homestayData?.map(d => d.revenue),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
                text: 'Revenue by Homestay',
            },
        },
    };
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Homestay Performance</h2>
            <Bar options={options} data={data} />
        </div>
    );
}

export default Homestay;
