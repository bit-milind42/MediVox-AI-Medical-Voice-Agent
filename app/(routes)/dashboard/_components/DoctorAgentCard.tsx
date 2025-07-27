"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { IconArrowRight } from "@tabler/icons-react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export type doctorAgent={
    id:number,
    specialist:string,
    description:string,
    image:string,
    agentPrompt:string,
    voiceId?: string,
    subscriptionRequired?: boolean
}
type Props = {
    doctorAgent: doctorAgent;
}

function DoctorAgentCard({ doctorAgent }: Props) {
    // Handle case when doctorAgent is undefined
    const [loading, setLoading] = React.useState(false);

    const router = useRouter();
    if (!doctorAgent) {
        return (
            <div className="p-4 border rounded-lg">
                <p>No doctor agent data available</p>
            </div>
        );
    }
    const {has}=useAuth();
    // @ts-ignore
    const paidUser = has && has({plan:'pro'});
    console.log("Paid User:", paidUser);

    const onStartConsultation = async (doctor: doctorAgent) => {
        setLoading(true);
        const result = await axios.post('/api/session-chat', {
          selectedDoctor: doctorAgent,
          notes: 'New Query',
        });
        console.log(result.data);
        if (result.data?.sessionId) {
          console.log(result.data.sessionId);
          router.push(`/dashboard/medical-agent/` + result.data.sessionId);
        }
        setLoading(false);
      }

    return (
        <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg shadow-md h-[420px] flex flex-col relative bg-white dark:bg-black hover:shadow-lg transition-shadow">
            {doctorAgent.subscriptionRequired && (
                <Badge className="absolute m-2 right-0 z-10 bg-black dark:bg-white text-white dark:text-black">
                    Premium
                </Badge>
            )}
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
                    <h3 className="font-bold text-lg text-black dark:text-white">{doctorAgent.specialist}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 h-[60px] overflow-hidden">
                        {doctorAgent.description}
                    </p>
                </div>
                <Button 
                    onClick={() => onStartConsultation(doctorAgent)} 
                    className="w-full mt-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200" 
                    disabled={!paidUser && !doctorAgent.subscriptionRequired}
                >
                    Start Consultation {loading ? <Loader2 className='animate-spin' /> : <IconArrowRight />}
                </Button>
            </div>
        </div>
    );
}

export default DoctorAgentCard;
