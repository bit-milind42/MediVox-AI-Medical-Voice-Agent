import React from "react";
import AppHeader from "./_components/appheader";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
        <AppHeader/>
        <div className="px-10 md:px-20 lg:px-40 py-10 bg-white dark:bg-black">
            {children}
        </div>
    </div>
  );
}

export default DashboardLayout;