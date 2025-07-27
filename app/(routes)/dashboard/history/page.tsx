import React from 'react';
import HistoryList from '../_components/HistoryList';

function History() {
    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <h1 className="text-3xl font-bold text-black dark:text-white mb-8">Medical History</h1>
            <HistoryList/>
        </div>
    );
}
export default History;