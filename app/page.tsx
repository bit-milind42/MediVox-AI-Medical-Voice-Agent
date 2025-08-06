"use client";


import { motion } from "motion/react";
import { FeatureBentoGrid } from "./_components/FeatureBentoGrid";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HeroSectionOne() {
  return (
    <div className="relative bg-black text-white min-h-screen flex flex-col items-center justify-center">
      <Navbar />
      <div className="absolute inset-y-0 left-0 h-full w-px bg-gray-800">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-white to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-gray-800">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-white to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-gray-800">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-white md:text-4xl lg:text-7xl">
          {"Revolutionize Patient Care with AI Voice Agents"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-gray-300"
        >
          Deliver instant, accurate, and personalized patient interactions with our AI-powered voice agents. Enhance your healthcare services today.
          Automate appointments, answer queries, symptom triage, and provide 24/7 support with our cutting-edge AI technology.
        </motion.p>
        <Link href={'/sign-in'}>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          
          <button className="w-60 transform rounded-lg bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-200">
            Explore Now
          </button>
          <button className="w-60 transform rounded-lg border border-gray-600 bg-transparent px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-900">
            Contact Support
          </button>
        </motion.div>
        </Link>
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-20 rounded-3xl border border-gray-800 bg-gray-900 p-4 shadow-md"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-700">
            <div className="aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🏥</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  MediVox AI Dashboard
                </h3>
                <p className="text-gray-300">
                  Streamlined interface for AI-powered medical consultations
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="w-full px-4 py-20 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Powerful Features for Modern Healthcare
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover how MediVox AI transforms patient interactions with cutting-edge voice technology and intelligent medical assistance.
          </p>
        </motion.div>
        <FeatureBentoGrid />
      </div>

      {/* Stats Section */}
      <div className="w-full px-4 py-20 bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-lg font-semibold text-gray-200 mb-1">Accuracy Rate</div>
              <div className="text-gray-400">In symptom analysis and triage</div>
            </div>
            {/* <div className="p-6">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-lg font-semibold text-gray-200 mb-1">Availability</div>
              <div className="text-gray-400">Round-the-clock patient support</div>
            </div> */}
            <div className="p-6">
              <div className="text-4xl font-bold text-white mb-2">60%</div>
              <div className="text-lg font-semibold text-gray-200 mb-1">Time Saved</div>
              <div className="text-gray-400">In administrative tasks</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* How it Works Section */}
      <div className="w-full px-4 py-20 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            How MediVox AI Works
          </h2>
          <p className="text-lg text-gray-300 mb-16">
            Simple, secure, and efficient healthcare automation in three easy steps.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Voice Consultation
              </h3>
              <p className="text-gray-400">
                Patients interact naturally with our AI voice agent for initial consultation and symptom assessment.
              </p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                AI Analysis
              </h3>
              <p className="text-gray-400">
                Advanced AI processes the conversation, analyzes symptoms, and generates preliminary medical insights.
              </p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Medical Report
              </h3>
              <p className="text-gray-400">
                Comprehensive medical reports are generated and securely shared with healthcare providers.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="w-full px-4 py-20 bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.4 }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to Transform Your Healthcare Practice?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of healthcare providers using MediVox AI to improve patient care and streamline operations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/sign-in">
              <button className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                Get Started Free
              </button>
            </Link>
            <button className="px-8 py-3 border-2 border-gray-600 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
              Schedule Demo
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const Navbar = () => {
  const {user}= useUser();
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-gray-800 px-4 py-4 bg-black">
      <div className="flex items-center gap-3">
        <Image src="/MediVox.jpg" alt="MediVox AI" width={40} height={40} className="rounded-lg object-contain" />
        <h1 className="text-base font-bold md:text-2xl text-white">MediVox AI</h1>
      </div>
      {!user? 
      <Link href={'/sign-in'}>
      <button className="w-24 transform rounded-lg bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-200 md:w-32">
        Login
      </button></Link>:
      <div className="flex items-center gap-4">
        <UserButton/>
        <Link href="/dashboard">
          <Button className="bg-white text-black hover:bg-gray-200">Dashboard</Button>
        </Link>
      </div>
}
    </nav>
  );
};



