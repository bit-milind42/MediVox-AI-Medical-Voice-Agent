import React from "react";
import { doctorAgent } from "./DoctorAgentCard";
import Image from "next/image";

type props = {
    doctorAgent: doctorAgent,
    setSelectedDoctor:any,
    selectedDoctor: doctorAgent 
}

function SuggestedDoctorCard({ doctorAgent, setSelectedDoctor, selectedDoctor }: props){
    return(
        <div className={`flex flex-col items-center justify-between border rounded-2xl shadow p-5 hover:border-black dark:hover:border-white cursor-pointer transition-colors bg-white dark:bg-black ${selectedDoctor?.id === doctorAgent?.id ? "border-black dark:border-white" : "border-gray-200 dark:border-gray-700"}`} 
             onClick={() => setSelectedDoctor(doctorAgent)}>
            <Image src={doctorAgent?.image} alt={doctorAgent.specialist} width={70} height={70} className="w-[50px] h-[50px] rounded-4xl object-cover" />
            <h2 className="font-bold text-sm text-center text-black dark:text-white">
                {doctorAgent?.specialist}
            </h2>
            <p className="text-xs text-center line-clamp-2 text-gray-600 dark:text-gray-400">{doctorAgent?.description}</p>
        </div>
    )
}
export default SuggestedDoctorCard;