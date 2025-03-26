import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Download } from "lucide-react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { exportToExcel } from '../../utils/excell';


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
            <div className="flex justify-between items-center bg-white p-4  rounded-lg">
                <h2 className="text-xl font-bold text-gray-800">Monthly Report</h2>
                <button
                    onClick={() => exportToExcel({
                        headers: ["Homestay", "Revenue", "Bookings"],
                        data: homestayData?.map(({ name, revenue, bookings }) => ({
                            name,
                            revenue,
                            bookings
                        }))
                    })}
                    className="flex items-center gap-2  text-white font-semibold py-1 px-2 rounded-lg transition duration-300"
                >
                    <Download color='gray' size={20} />
                </button>
            </div>
            <Bar options={options} data={data} />
        </div>
    );
}

export default Homestay;
