import { cn } from "@/lib/utils";
import React from "react";

import {
  IconStethoscope,
  IconBrain,
  IconMicrophone,
  IconClock24,
  IconReport,
  IconUsers,
  IconShield,
  IconRobot,
  IconCalendar,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export function FeatureBentoGrid() {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}
const MedicalIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 items-center justify-center">
    <div className="text-white text-4xl">
      {children}
    </div>
  </div>
);

const items = [
  {
    title: "AI Voice Consultations",
    description: "Conduct natural conversations with patients using advanced AI voice technology for initial consultations and triage.",
    header: <MedicalIcon><IconMicrophone /></MedicalIcon>,
    icon: <IconMicrophone className="h-4 w-4 text-white" />,
  },
  {
    title: "24/7 Patient Support",
    description: "Provide round-the-clock patient assistance with instant responses to medical queries and appointment scheduling.",
    header: <MedicalIcon><IconClock24 /></MedicalIcon>,
    icon: <IconClock24 className="h-4 w-4 text-white" />,
  },
  {
    title: "Intelligent Symptom Analysis",
    description: "Leverage AI to analyze patient symptoms and provide preliminary assessments with medical accuracy.",
    header: <MedicalIcon><IconBrain /></MedicalIcon>,
    icon: <IconBrain className="h-4 w-4 text-white" />,
  },
  {
    title: "Automated Medical Reports",
    description: "Generate comprehensive medical reports from consultations using advanced AI analysis and documentation.",
    header: <MedicalIcon><IconReport /></MedicalIcon>,
    icon: <IconReport className="h-4 w-4 text-white" />,
  },
  {
    title: "Smart Appointment Management",
    description: "Streamline scheduling with intelligent calendar integration and automated patient reminders.",
    header: <MedicalIcon><IconCalendar /></MedicalIcon>,
    icon: <IconCalendar className="h-4 w-4 text-white" />,
  },
  {
    title: "HIPAA Compliant Security",
    description: "Ensure patient data protection with enterprise-grade security and full HIPAA compliance.",
    header: <MedicalIcon><IconShield /></MedicalIcon>,
    icon: <IconShield className="h-4 w-4 text-white" />,
  },
  {
    title: "Multi-Doctor Support",
    description: "Connect patients with the right specialists using AI-powered doctor matching and availability tracking.",
    header: <MedicalIcon><IconUsers /></MedicalIcon>,
    icon: <IconUsers className="h-4 w-4 text-white" />,
  },
];
