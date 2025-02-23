import { Hotel, Users, TrendingUp, DollarSign, LineChart } from 'lucide-react';
import useApi from '../hooks/useApi';
import adminService from '../services/adminServices';
import { useEffect, useState } from 'react';
import Category from './../components/report/Category';
import Homestay from '../components/report/Homestay';
import Monthly from '../components/report/Monthly';
import Yealry from '../components/report/Yealry';

export default function DashboardPage() {
  const stats = [
    { title: 'Total Rooms', value: '124', icon: <Hotel className="w-6 h-6" />, change: '+12%' },
    { title: 'Active Bookings', value: '45', icon: <Users className="w-6 h-6" />, change: '+5%' },
    { title: 'Occupancy Rate', value: '78%', icon: <TrendingUp className="w-6 h-6" />, change: '+8%' },
    { title: 'Revenue', value: '$45,231', icon: <DollarSign className="w-6 h-6" />, change: '+23%' },
  ];

  const [totalStats, setTotalStats] = useState([]);

  const {
    data: monthlyData,
    loading: monthlyLoading,
    execute: monthlyExecute,
    error: monthlyError,
  } = useApi(adminService.adminGetMonthlyReports);

  const {
    data: homeStayData,
    loading: homeStayLoading,
    execute: homeStayExecute,
    error: homeStayError,
  } = useApi(adminService.adminGetHomestayReports);

  const {
    data: categoryData,
    loading: categoryLoading,
    execute: categoryExecute,
    error: categoryError,
  } = useApi(adminService.adminGetCategoryReports);

  const {
    data: yealryData,
    loading: yealryLoading,
    execute: yealryExecute,
    error: yealryError,
  } = useApi(adminService.adminGetYearlyReports);

  const {
    data: overallData,
    loading: overallLoading,
    execute: overallExecute,
    error: overallError,
  } = useApi(adminService.adminGetOverallReports);


  useEffect(() => {
    monthlyExecute();
    homeStayExecute();
    categoryExecute();
    yealryExecute()
    overallExecute()
  }, [])

  useEffect(() => {
    if (overallData) {
      const updatedStats = [
        { ...stats[0], value: overallData.totalHomestays },
        { ...stats[1], value: overallData.totalBookings },
        { ...stats[2], value: `${overallData.occupancyRate.toFixed(2)}%` },
        { ...stats[3], value: overallData.totalRevenue },
      ];

      setTotalStats(updatedStats);
    }
  }, [overallData])


  return (
    <div>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {totalStats.map((stat) => (
            <div key={stat.title} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div className="text-blue-600">{stat.icon}</div>
                <span className={`text-2xl font-medium text-green-600`}>
                  {stat.value}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-2 mt-6 mb-2 col-span-full">
            <LineChart className="h-6 w-6 text-indigo-600" />
            <h1 className="text-2xl font-semibold text-gray-800">Business Reports Dashboard</h1>
          </div>

          <div className="space-y-6">
            <Monthly monthlyData={monthlyData} />
            <Homestay homestayData={homeStayData} />
          </div>

          <div className="space-y-6">
            <Category categoryData={categoryData} />
            <Yealry yealryData={yealryData} />
          </div>
        </div>
      </main>
    </div>

  );
}