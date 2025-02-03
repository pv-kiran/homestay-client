import { Home, BedDouble, Grid, Package, UserCircle, Users, Component, TicketPercent } from 'lucide-react';

export const routes = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    icon: <Home className="w-5 h-5" />
  },
  {
    path: '/admin/categories',
    title: 'Categories',
    icon: <Grid className="w-5 h-5" />
  },
  {
    path: '/admin/amenities',
    title: 'Amenities',
    icon: <Component className="w-5 h-5" />
  },
  {
    path: '/admin/users',
    title: 'Users',
    icon: <Users className="w-5 h-5" />
  },
  {
    path: '/admin/rooms',
    title: 'Homestays',
    icon: <BedDouble className="w-5 h-5" />
  },
  {
    path: '/admin/bookings',
    title: 'Bookings',
    icon: <UserCircle className="w-5 h-5" />
  },
  {
    path: null,
    title: 'Add-ons',
    icon: <Package className="w-5 h-5" />,
    hasSubMenu: true,
    subMenu: [
      {
        path: '/admin/add-ons/services',
        title: 'Room Services',
      },
      {
        path: '/admin/add-ons/restaurents',
        title: 'Restaurents',
      },
      {
        path: '/admin/add-ons/homelyfood',
        title: 'Homely Food'
      },
      {
        path: '/admin/add-ons/rides',
        title: 'Rides/ Drives',
      },
      {
        path: '/admin/add-ons/entertainment',
        title: 'Entertainment',
      },
      {
        path: '/admin/add-ons/others',
        title: 'Other services',
      }
    ]
  },
  {
    path: '/admin/coupons',
    title: 'Coupons',
    icon: <TicketPercent className="w-5 h-5" />
  }
];