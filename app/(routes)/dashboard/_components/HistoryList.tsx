"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddNewSessionDialog from "./AddNewSessionDialog";
import axios from "axios";
import HistoryTable from "./HistoryTable";
import { sessionDetail } from "../medical-agent/[sessionId]/page";

function HistoryList() {
    const [history, setHistoryList] = useState<sessionDetail[]>([]);

    useEffect(() => {
        GetHistoryList();
    }, []);

    const GetHistoryList = async () => {
        const result = await axios.get('/api/session-chat?sessionId=all');
        console.log(result.data);
        setHistoryList(result.data);
    }

    return (
        <div className="mt-10">
            {history.length == 0?
            <div className='flex items-center flex-col justify-center p-7 border border-dashed rounded-2xl border-2'> 
                <Image src={'/medical-assistance.png'} alt='empty' width={150} height={150}/>
                <h2 className="font-bold text-xl mt-2">No Recent Consultations</h2>
                <p>It looks like you haven't consulted with any doctors yet.</p>
                <AddNewSessionDialog/>
            </div>
            :<div>
                <HistoryTable history={history}/>
            </div>
            }

        </div>
    )
}

export default HistoryList;