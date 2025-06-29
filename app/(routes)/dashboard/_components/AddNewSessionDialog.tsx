"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Loader, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import DoctorAgentCard, { doctorAgent } from "./DoctorAgentCard";
import SuggestedDoctorCard from "./SuggestedDoctorCard";



function AddNewSessionDialog() {
  const [note, setNote] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [suggestedDoctors, setSuggestedDoctors] = React.useState<doctorAgent[]>([]);
  const [selectedDoctor, setSelectedDoctor] = React.useState<doctorAgent | null>(null);
  const router = useRouter();

  const OnClickNext = async () => {
    setLoading(true);
    try {
      console.log('Sending request to /api/suggest-doctors with notes:', note);
      const result = await axios.post('/api/suggest-doctors', {
        notes: note,
      });

      console.log('API Response:', result.data);
      
      // Handle different response formats
      if (Array.isArray(result.data)) {
        setSuggestedDoctors(result.data);
      } else if (result.data.doctors && Array.isArray(result.data.doctors)) {
        setSuggestedDoctors(result.data.doctors);
      } else if (result.data.suggested_doctors && Array.isArray(result.data.suggested_doctors)) {
        setSuggestedDoctors(result.data.suggested_doctors);
      } else {
        console.error('Unexpected response format:', result.data);
        // Fallback: show all doctors from the list
        const { AIDoctorAgents } = await import('@/shared/list');
        setSuggestedDoctors(AIDoctorAgents.slice(0, 6)); // Show first 6 doctors
      }
    } catch (error) {
      console.error('Error fetching suggested doctors:', error);
      // Fallback: show all doctors from the list
      try {
        const { AIDoctorAgents } = await import('@/shared/list');
        setSuggestedDoctors(AIDoctorAgents.slice(0, 6)); // Show first 6 doctors
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
      }
    } finally {
      setLoading(false);
    }
  }

  const onStartConsultation = async (doctor: doctorAgent) => {
    setLoading(true);
    const result = await axios.post('/api/session-chat', {
      selectedDoctor: selectedDoctor,
      notes: note,
    });
    console.log(result.data);
    if (result.data?.sessionId) {
      console.log(result.data.sessionId);
      router.push(`/dashboard/medical-agent/` + result.data.sessionId);
    }
    setLoading(false);
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="mt-3">+ Start a Consultation</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Basic Details</DialogTitle>
            <DialogDescription asChild>
              {suggestedDoctors.length === 0 ? (
                <div>
                  <h2>Add Symptoms or Any Other Details</h2>
                  <Textarea
                    placeholder="Add Details Here..."
                    className="mt-1 h-[200px]"
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              ) : (
                <div>
                  <h2>Select the doctor</h2>
                  <div className="grid grid-cols-3 gap-5 mt-4">
                    {/* suggested doctors */}
                    {suggestedDoctors.map((doctor, index) => (
                      <SuggestedDoctorCard 
                        doctorAgent={doctor} 
                        key={index}
                        setSelectedDoctor={setSelectedDoctor}
                        // @ts-ignore
                        selectedDoctor={selectedDoctor} 
                      />
                    ))}
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button variant={"outline"}>
                Cancel
              </Button>
            </DialogClose>
            {
              suggestedDoctors.length === 0 ? (
                <Button disabled={!note || loading} onClick={() => OnClickNext()}>
                  Next {loading ? <Loader2 className='animate-spin' /> : <ArrowRight />}
                </Button>
              ) : (
                <Button disabled={loading || !selectedDoctor} onClick={() => onStartConsultation(selectedDoctor!)}>
                  Start Consultation {loading ? <Loader2 className='animate-spin' /> : <ArrowRight />}
                </Button>
              )
            }
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default AddNewSessionDialog;