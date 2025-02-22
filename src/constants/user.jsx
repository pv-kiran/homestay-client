import { Grid, Package, UserCircle, Users, Component } from 'lucide-react';
import { User, LogIn, LogOut, Menu, CircleUserRound, BedDouble } from "lucide-react";
export const routes = [
    {
        path: '/profile',
        text: 'My Profile',
        icon: <User className="w-5 h-5" />
    },
    {
        path: '/mybookings',
        text: 'My Bookings',
        icon: <BedDouble className="w-5 h-5" />
    },
];