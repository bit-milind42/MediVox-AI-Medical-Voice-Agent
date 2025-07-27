import { db } from "@/config/db";
import { sessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const user = await currentUser();
        
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Sample AI-generated report data
        const sampleReport = {
            conversationSummary: "Patient presented with severe headaches lasting 3 days, accompanied by photophobia and nausea. The pain is described as throbbing and localized to the right side of the head. Current medication (ibuprofen 400mg) provides minimal relief. Patient also reports visual disturbances including flashing lights, which are concerning symptoms that warrant immediate medical evaluation.",
            symptoms: [
                "Severe throbbing headaches (3 days duration)",
                "Right-sided head pain",
                "Photophobia (sensitivity to bright lights)",
                "Nausea",
                "Visual disturbances (flashing lights)",
                "Poor response to current pain medication"
            ],
            duration: "3 days of continuous symptoms",
            severity: "Severe - significantly impacting daily activities",
            medications: [
                "Ibuprofen 400mg twice daily (current, minimal effectiveness)",
                "No other medications reported"
            ],
            recommendations: [
                "Seek immediate medical attention due to concerning combination of symptoms",
                "Consider neurological evaluation to rule out migraine with aura or other serious conditions",
                "Document symptom patterns and triggers for medical consultation",
                "Avoid bright lights and loud noises until medical evaluation",
                "Stay hydrated and rest in a dark, quiet environment",
                "Do not delay medical care - visual disturbances with severe headache require prompt evaluation"
            ],
            additionalDetails: "The combination of severe unilateral headache, photophobia, nausea, and visual aura (flashing lights) is consistent with migraine with aura, but given the severity and duration, immediate medical evaluation is recommended to rule out more serious conditions such as cluster headaches or secondary headaches."
        };

        // Sample conversation
        const sampleConversation = [
            { role: 'user', text: 'Hello, I have been experiencing severe headaches for the past 3 days.' },
            { role: 'assistant', text: 'I understand you are experiencing headaches. Can you describe the pain? Is it throbbing, sharp, or dull?' },
            { role: 'user', text: 'It is a throbbing pain on the right side of my head. It gets worse with bright lights.' },
            { role: 'assistant', text: 'That sounds concerning. The sensitivity to light, called photophobia, along with throbbing pain can be significant. Are you currently taking any medications?' },
            { role: 'user', text: 'I take ibuprofen 400mg twice daily, but it is not helping much.' },
            { role: 'assistant', text: 'I see that your current pain management is not effective. Have you experienced nausea or any visual changes with these headaches?' },
            { role: 'user', text: 'Yes, I feel nauseous and sometimes I see flashing lights before the headache gets worse.' },
            { role: 'assistant', text: 'The visual disturbances you describe, combined with the other symptoms, are quite concerning. These flashing lights could be what we call an "aura." Given the severity and combination of your symptoms - severe headache, light sensitivity, nausea, and visual aura - I strongly recommend seeking immediate medical attention.' },
            { role: 'user', text: 'Should I go to the emergency room?' },
            { role: 'assistant', text: 'Yes, I would recommend going to the emergency room or urgent care, especially since this has been ongoing for 3 days and your symptoms include visual disturbances. This combination of symptoms needs to be evaluated by a healthcare professional to rule out serious conditions and get you appropriate treatment.' }
        ];

        // Create a test session with sample data
        const sessionId = `test-session-${Date.now()}`;
        
        const result = await db.insert(sessionChatTable).values({
            sessionId: sessionId,
            notes: "Patient complaining of severe headaches with light sensitivity and visual disturbances for 3 days",
            selectedDoctor: {
                id: 1,
                specialist: "Neurologist",
                image: "/doctors/neurologist.jpg",
                voiceId: "en-US-Wavenet-D",
                agentPrompt: "You are an AI neurologist assistant. Help patients with neurological symptoms and provide appropriate guidance."
            },
            report: sampleReport,
            conversation: sampleConversation,
            createdBy: user.id,
            CreatedOn: new Date().toISOString()
        }).returning();

        return NextResponse.json({
            success: true,
            message: "Test session with AI report created successfully",
            sessionId: sessionId,
            data: result[0]
        });

    } catch (error) {
        console.error("Error creating test session:", error);
        return NextResponse.json({ 
            error: "Failed to create test session",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
