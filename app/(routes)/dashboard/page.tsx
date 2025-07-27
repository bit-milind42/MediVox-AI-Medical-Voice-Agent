"use client";
import React from "react";
import HistoryList from "./_components/HistoryList";
import DoctorsAgentList from "./_components/DoctorsAgentList";
import AddNewSessionDialog from "./_components/AddNewSessionDialog";

function Dashboard() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-bold text-3xl text-black dark:text-white">
          My Dashboard
        </h2>
        <div className="flex gap-2">
          <AddNewSessionDialog/>
        </div>
      </div>

      <HistoryList />
      <DoctorsAgentList/>
    </div>
  );
}

export default Dashboard;