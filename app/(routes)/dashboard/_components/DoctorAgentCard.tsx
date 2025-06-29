import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

export type doctorAgent={
    id:number,
    specialist:string,
    description:string,
    image:string,
    agentPrompt:string,
    voiceId?: string,
}
type Props = {
    doctorAgent: doctorAgent;
}

function DoctorAgentCard({ doctorAgent }: Props) {
    // Handle case when doctorAgent is undefined
    if (!doctorAgent) {
        return (
            <div className="p-4 border rounded-lg">
                <p>No doctor agent data available</p>
            </div>
        );
    }

    return (
        <div className="p-4 border rounded-lg shadow-md h-[420px] flex flex-col">
            <div className="relative w-full h-[200px] rounded-lg overflow-hidden">
                <Image 
                    src={doctorAgent.image} 
                    alt={doctorAgent.specialist} 
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex-1 flex flex-col justify-between mt-2">
                <div>
                    <h3 className="font-bold text-lg">{doctorAgent.specialist}</h3>
                    <p className="text-gray-600 text-sm mt-1 h-[60px] overflow-hidden">
                        {doctorAgent.description}
                    </p>
                </div>
                <Button className="w-full mt-2">Start Consultation<IconArrowRight/></Button>
            </div>
        </div>
    );
}

export default DoctorAgentCard;
