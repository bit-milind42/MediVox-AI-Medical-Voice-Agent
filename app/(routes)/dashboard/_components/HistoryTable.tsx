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
import moment from "moment";

type Props = {
  history: sessionDetail[];
}

function HistoryTable({ history }: Props) {
    return (
        <div>
            <Table>
                <TableCaption>Previous Consultations Reports</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead >AI Medical Specialist</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {history.map((record:sessionDetail,index:number) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{record.selectedDoctor?.specialist}</TableCell>
                            <TableCell>{record.notes}</TableCell>
                            <TableCell>
                                {moment(new Date(record.CreatedOn)).fromNow()}
                            </TableCell>
                            <TableCell className="text-right">
                                <a href={`/dashboard/medical-agent/${record.sessionId}`} className="text-blue-500 hover:underline">View Report</a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
        </div>
    )

}
export default HistoryTable;