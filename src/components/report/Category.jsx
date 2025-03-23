import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Download } from "lucide-react";
import { exportToExcel } from '../../utils/excell';

ChartJS.register(ArcElement, Tooltip, Legend);

const Category = ({ categoryData }) => {
    const headers = ['Category', 'Bookings', 'Revenue'];
    const data = {
        labels: categoryData?.map(d => d.category),
        datasets: [
            {
                data: categoryData?.map(d => d.revenue),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center bg-white p-4  rounded-lg">
                <h2 className="text-xl font-bold text-gray-800">Monthly Report</h2>
                <button
                    onClick={() => exportToExcel({
                        headers, data: categoryData.map(({ category, bookings, revenue }) => ({
                            category,
                            bookings,
                            revenue
                        }))
                    })}
                    className="flex items-center gap-2  text-white font-semibold py-1 px-2 rounded-lg transition duration-300"
                >
                    <Download color='gray' size={20} />
                </button>
            </div>
            <Doughnut data={data} />
        </div>
    );
}

export default Category;
