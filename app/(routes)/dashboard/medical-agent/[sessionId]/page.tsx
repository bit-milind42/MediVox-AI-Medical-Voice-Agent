"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { doctorAgent } from "../../_components/DoctorAgentCard";
import { Circle, Loader, PhoneCall, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from '@vapi-ai/web';
import { toast } from "sonner";


export type sessionDetail = {
  id: number,
  notes: string,
  sessionId: string,
  report: JSON,
  selectedDoctor: doctorAgent,
  CreatedOn: string,
  createdBy: string,
  
}
type messages = {
  role: string,
  text: string,
}

function MedicalAgentPage() {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<sessionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [callStarted, setCallStarted] = useState(false);

  const [vapiInstance, setVapiInstance] = useState<Vapi | null>(null);

  const [currentRole, setCurrentRole] = useState<string | null>(null);

  const [liveTranscript, setLiveTranscript] = useState<string | null>(null);

  const[messages,setMessages] = useState<messages[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (sessionId) {
      GetSessionDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const GetSessionDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching session details for:", sessionId);

      const result = await axios.get('/api/session-chat?sessionId=' + sessionId);
      console.log("Session API response:", result.data);

      if (result.data) {
        setSessionDetail(result.data);
        console.log("Selected doctor data:", result.data.selectedDoctor);
        if (result.data.selectedDoctor?.image) {
          console.log("Doctor image path:", result.data.selectedDoctor.image);
        }
      } else {
        setError("No session data found");
      }
    } catch (err) {
      console.error("Error fetching session details:", err);
      setError("Failed to fetch session details");
    } finally {
      setLoading(false);
    }
  };

  // Define handlers outside so they can be referenced for both .on and .off
  const handleCallStart = () => {
    console.log('Call started');
    setCallStarted(true);
  };

  const handleCallEnd = () => {
    setCallStarted(false);
    console.log('Call ended');
  };

  const handleMessage = (message: any) => {
    if (message.type === 'transcript') {
      console.log(`${message.role}: ${message.transcript}`);
    }
  };

  const StartCall = () => {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);

    const VapiAgentConfig={
      name:'AI Medical Voice Agent',
      firstMessage:"Hi there! I'm your AI Medical Assistant. I'm here to help you with your medical queries. How can I assist you today?",
      transcriber: {
        provider:'assembly-ai',
        language: 'en',
      },
      voice: {
        provider: 'playht',
        voiceId: sessionDetail?.selectedDoctor?.voiceId || 'en-US-Wavenet-D', 
      },
      model:{
        provider: 'openai',
        model: 'gpt-4',
        messages: [
          {
            role:'system',
            content: sessionDetail?.selectedDoctor?.agentPrompt || "You are an AI medical assistant. Answer medical queries professionally and empathetically."
          }
        ]
      }

    }

    // @ts-ignore
    vapi.start(VapiAgentConfig);
    vapi.on('call-start', handleCallStart);
    vapi.on('call-end', handleCallEnd);

    vapi.on('message', (message) => {
      if (message.type === 'transcript') {
        const { role, transcriptType, transcript } = message;
        console.log(`${message.role}: ${message.transcript}`);
        if (transcriptType === 'partial') {
          setLiveTranscript(transcript);
          setCurrentRole(role);
        } else {
          setMessages((prev:messages[]) => [...prev, { role: role, text: transcript }]);
          setLiveTranscript("");
          setCurrentRole(null);
        }
      }
    });

    vapi.on('speech-start', () => {
      console.log('Speech started');
      setCurrentRole('assistant');
    });
    vapi.on('speech-end', () => {
      console.log('Speech ended');
      setCurrentRole(null);
    });
  };

  const EndCall = async () => {
    setLoading(true);
    if (!vapiInstance) return;
    
    // Stop the Vapi call and clean up event listeners
    vapiInstance.stop();
    vapiInstance.off('call-start', handleCallStart);
    vapiInstance.off('call-end', handleCallEnd);
    vapiInstance.off('message', handleMessage);
    vapiInstance.off('speech-start', () => {
      console.log('Speech started');
      setCurrentRole('assistant');
    });
    vapiInstance.off('speech-end', () => {
      console.log('Speech ended');
      setCurrentRole(null);
    });

    setCallStarted(false);
    setVapiInstance(null);

    try {
      // Generate the medical report from the conversation
      if (messages.length > 0) {
        const result = await GenerateReport();
        console.log('Report generated:', result);
      }
      
      toast.success('Your report is generated!');
      router.replace('/dashboard');
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-5 border rounded-3xl bg-secondary">
        <div className="flex items-center justify-center h-64">
          <p>Loading session details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 border rounded-3xl bg-secondary">
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!sessionDetail) {
    return (
      <div className="p-5 border rounded-3xl bg-secondary">
        <div className="flex items-center justify-center h-64">
          <p>No session data available</p>
        </div>
      </div>
    );
  }

  const GenerateReport = async () => {
    setLoading(true);
    const result = await axios.post('/api/generate-report', {
      messages: messages,
      sessionDetail: sessionDetail,
      sessionId: sessionId,
    });
  }

  return (
    <div className="p-5 border rounded-3xl bg-secondary">
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center ">
          <Circle className={`h-4 w-4 rounded-full ${callStarted ? 'bg-green-500' : 'bg-red-500'}`} />{callStarted ? 'Connected' : 'Not Connected'}
        </h2>
        <h2 className="font-bold text-xl text-gray-400">
          00:00
        </h2>
      </div>

      <div className="flex items-center flex-col mt-10">
        {sessionDetail.selectedDoctor?.image ? (
          <div className="relative">
            <Image
              src={sessionDetail.selectedDoctor.image}
              alt={sessionDetail.selectedDoctor.specialist || 'Doctor'}
              width={120}
              height={120}
              className="w-[100px] h-[100px] rounded-full object-cover"
              onError={(e) => {
                console.error("Image failed to load:", sessionDetail.selectedDoctor.image);
                // Hide the image if it fails to load
                (e.target as HTMLImageElement).style.display = 'none';
              }}
              onLoad={() => {
                console.log("Image loaded successfully:", sessionDetail.selectedDoctor.image);
              }}
            />
          </div>
        ) : (
          <div className="w-[100px] h-[100px] rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}

        <h2 className="mt-2 text-lg font-semibold">
          {sessionDetail.selectedDoctor?.specialist || 'Unknown Specialist'}
        </h2>
        <p className="text-sm text-gray-400">AI Medical Voice Agent</p>

        {/* {sessionDetail.notes && (
          <div className="mt-4 p-3 bg-white rounded-lg max-w-md">
            <h3 className="font-semibold text-sm text-gray-600 mb-2">Session Notes:</h3>
            <p className="text-sm">{sessionDetail.notes}</p>
          </div>
        )} */}

        <div className="mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72">

          {messages?.slice(-4).map((msg, index) =>(
           
              <h2 className='text-gray-400 p-2' key={index}>{msg.role}:{msg.text}</h2>
            
          ))}
          {liveTranscript && liveTranscript?.length > 0 && <h2 className='text-lg'>{currentRole}:{liveTranscript}</h2>}
        </div>

        {!callStarted ? <Button className="mt-20" onClick={StartCall} disabled={loading}>{loading ? <Loader className="mr-2 animate-spin" /> :
          <PhoneCall />} Start Call
        </Button> : <Button variant={'destructive'} className="mt-20" onClick={EndCall} disabled={loading}>
          {loading ? <Loader className="mr-2 animate-spin" /> :
          <PhoneOff />} End Call
        </Button>}
      </div>
    </div>
  );
}

export default MedicalAgentPage;
