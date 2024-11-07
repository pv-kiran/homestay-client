import { Home, BedDouble, Grid, Package, UserCircle } from 'lucide-react';

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
    icon: <Grid className="w-5 h-5" />
  },
  {
    path: '/admin/users',
    title: 'Users',
    icon: <Grid className="w-5 h-5" />
  },
  {
    path: '/admin/rooms',
    title: 'Rooms',
    icon: <BedDouble className="w-5 h-5" />
  },
  {
    path: '/admin/add-ons',
    title: 'Add Ons',
    icon: <Package className="w-5 h-5" />
  },
  {
    path: '/admin/account',
    title: 'Account',
    icon: <UserCircle className="w-5 h-5" />
  },
  {
    path: '/admin/sample',
    title: 'Sample',
    icon: <UserCircle className="w-5 h-5" />
  }
];