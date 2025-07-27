import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { sessionDetail } from "../medical-agent/[sessionId]/page";
import ViewReportDialog from "./ViewReportDialog";

type Props = {
  history: sessionDetail[];
}

function HistoryTable({ history }: Props) {
    return (
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg">
            <Table>
                <TableCaption className="text-gray-600 dark:text-gray-400">Previous Consultations Reports</TableCaption>
                <TableHeader>
                    <TableRow className="border-gray-200 dark:border-gray-800">
                    <TableHead className="text-black dark:text-white">AI Medical Specialist</TableHead>
                    <TableHead className="text-black dark:text-white">Description</TableHead>
                    <TableHead className="text-black dark:text-white">Date</TableHead>
                    <TableHead className="text-right text-black dark:text-white">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {history.map((record:sessionDetail,index:number) => (
                        <TableRow key={index} className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
                            <TableCell className="font-medium text-black dark:text-white">{record.selectedDoctor?.specialist}</TableCell>
                            <TableCell className="text-gray-700 dark:text-gray-300">{record.notes}</TableCell>
                            <TableCell className="text-gray-700 dark:text-gray-300">
                                {record.CreatedOn ? 
                                    (() => {
                                        const date = new Date(record.CreatedOn);
                                        if (isNaN(date.getTime())) return 'Invalid Date';
                                        
                                        const options: Intl.DateTimeFormatOptions = {
                                            weekday: 'long',
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                            hour: 'numeric',
                                            minute: '2-digit',
                                            hour12: true
                                        };
                                        
                                        return date.toLocaleDateString('en-US', options);
                                    })()
                                    : 'No Date'
                                }
                            </TableCell>
                            <TableCell className="text-right">
                                <ViewReportDialog record={record} />
                            </TableCell>
                        </TableRow>
                    ))}
                    
                </TableBody>
                </Table>
        </div>
    )

}
export default HistoryTable;