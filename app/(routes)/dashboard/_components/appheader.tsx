import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const menuOptions = [
    {
        id:1,
        name: 'Home',
        path : '/dashboard'
    },
    
    {
        id:2,
        name: 'History',
        path : '/dashboard/history'
    },
    {
        id:3,
        name: 'Pricing',
        path : '/dashboard/billing'
    },
    {
        id:4,
        name: 'Profile',
        path : '/profile'
    },
]

function AppHeader() {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black px-10 md:px-20 lg:px-40">
        <div className="flex items-center gap-3">
            <Image src="/MediVox.jpg" alt="MediVox AI" width={40} height={40} className="rounded-lg object-contain" />
            <h1 className="text-base font-bold md:text-2xl text-black dark:text-white">MediVox AI</h1>
        </div>
        <div className="hidden md:flex gap-12 items-center">
            {menuOptions.map((option, index) => (
               <Link key={index} href={option.path}>
                    <h2 className="hover:font-bold cursor-pointer text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">{option.name}</h2>
               </Link>
            ))}
        </div>
        <UserButton/>
    </div>
  );
}

export default AppHeader;
