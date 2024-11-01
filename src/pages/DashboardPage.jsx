import { Hotel, Users, TrendingUp, DollarSign } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    { title: 'Total Rooms', value: '124', icon: <Hotel className="w-6 h-6" />, change: '+12%' },
    { title: 'Active Bookings', value: '45', icon: <Users className="w-6 h-6" />, change: '+5%' },
    { title: 'Occupancy Rate', value: '78%', icon: <TrendingUp className="w-6 h-6" />, change: '+8%' },
    { title: 'Revenue', value: '$45,231', icon: <DollarSign className="w-6 h-6" />, change: '+23%' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div className="text-blue-600">{stat.icon}</div>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}