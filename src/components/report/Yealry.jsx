import React from 'react';
import { Bar } from 'react-chartjs-2';

import { Download } from "lucide-react";
import { exportToExcel } from '../../utils/excell';

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
            <div className="flex justify-between items-center bg-white p-4  rounded-lg">
                <h2 className="text-xl font-bold text-gray-800">Monthly Report</h2>
                <button
                    onClick={() => exportToExcel({
                        headers: ["Year", "Total Bookings", "Cancelled Bookings", "Total Revenue"],
                        data: yealryData?.map(({ year, totalBookings, cancelledBookings, totalRevenue }) => ({
                            year,
                            totalBookings,
                            cancelledBookings,
                            totalRevenue
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

export default Yealry;
