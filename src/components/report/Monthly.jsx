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

import { Download } from "lucide-react";
import { exportToExcel } from '../../utils/excell';



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
    const headers = ["Month", "Revenue", "Bookings", "Occupancy"];
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
        <div className="bg-white p-6 rounded-lg">
            <div className="flex justify-between items-center bg-white p-4  rounded-lg">
                <h2 className="text-xl font-bold text-gray-800">Monthly Report</h2>
                <button
                    onClick={() => exportToExcel({ headers, data: monthlyData })}
                    className="flex items-center gap-2  text-white font-semibold py-1 px-2 rounded-lg transition duration-300"
                >
                    <Download color='gray' size={20} />
                </button>
            </div>
            <Line options={options} data={data} />
        </div>
    );
}

export default Monthly;
