import { PricingTable } from "@clerk/nextjs";
import React from "react";

function Billing() {
    return (
        <div className="px-10 md:px-24 lg:px-48 py-10 min-h-screen bg-white dark:bg-black">
            <h2 className="font-bold text-3xl mb-10 text-black dark:text-white">Subscription Plans</h2>
            <div className="bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800 p-6">
                <PricingTable/>
            </div>
        </div>
    );
}

export default Billing;
