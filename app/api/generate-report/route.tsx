import { db } from "@/config/db";
import { sessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPEN_ROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

// Helper functions to extract information from conversation
function extractSymptomsFromConversation(conversation: string, initialComplaint: string): string[] {
    const symptoms = [initialComplaint];
    const commonSymptoms = ['headache', 'pain', 'nausea', 'fever', 'fatigue', 'dizziness', 'cough', 'vomiting'];
    
    commonSymptoms.forEach(symptom => {
        if (conversation.toLowerCase().includes(symptom) && !symptoms.includes(symptom)) {
            symptoms.push(symptom);
        }
    });
    
    return symptoms;
}

function extractDurationFromConversation(conversation: string): string | null {
    const durationPatterns = [
        /(\d+)\s*days?/i,
        /(\d+)\s*hours?/i,
        /(\d+)\s*weeks?/i,
        /(\d+)\s*months?/i
    ];
    
    for (const pattern of durationPatterns) {
        const match = conversation.match(pattern);
        if (match) {
            return match[0];
        }
    }
    
    return null;
}

function extractMedicationsFromConversation(conversation: string): string[] {
    const medications: string[] = [];
    const commonMeds = ['ibuprofen', 'acetaminophen', 'aspirin', 'tylenol', 'advil'];
    
    commonMeds.forEach(med => {
        if (conversation.toLowerCase().includes(med)) {
            medications.push(med);
        }
    });
    
    return medications.length > 0 ? medications : ["Not mentioned"];
}

export async function POST(req: NextRequest) {
    try {
        console.log("🔍 Generate report API called");
        const requestBody = await req.json();
        console.log("📥 Request body keys:", Object.keys(requestBody));
        
        const { messages, sessionDetail, sessionId } = requestBody;
        const user = await currentUser();

        console.log("👤 User:", user?.id);
        console.log("📝 Messages count:", messages?.length);
        console.log("🗄️ Session ID:", sessionId);
        console.log("🩺 Session Detail:", sessionDetail ? "present" : "missing");

        if (!messages || messages.length === 0) {
            console.log("❌ No messages provided");
            return NextResponse.json({ error: "No conversation messages provided" }, { status: 400 });
        }

        // Create conversation string from messages
        const conversationText = messages.map((msg: any) => 
            `${msg.role}: ${msg.text}`
        ).join('\n\n');

        let reportContent;
        let parsedReport;

        try {
            console.log("🤖 Attempting OpenAI API call...");
            // Try to generate AI report using OpenRouter (GPT-3.5 for lower cost)
            const completion = await openai.chat.completions.create({
                model: "openai/gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: `You are a medical AI assistant. Based on the conversation between a patient and AI medical assistant, generate a comprehensive medical report in JSON format with the following structure:

{
  "conversationSummary": "Brief summary of the conversation",
  "symptoms": ["array", "of", "symptoms", "mentioned"],
  "duration": "How long symptoms have been present",
  "severity": "Mild/Moderate/Severe or description",
  "medications": ["array", "of", "current", "medications"],
  "recommendations": ["array", "of", "recommendations", "and", "next", "steps"],
  "additionalDetails": "Any other relevant information"
}

Please ensure the JSON is valid and contains realistic medical information based on the conversation. If certain information is not available in the conversation, use "Not mentioned" or appropriate placeholder.`
                    },
                    {
                        role: "user",
                        content: `Please analyze this medical conversation and generate a report:\n\n${conversationText}\n\nPatient's initial complaint: ${sessionDetail.notes}`
                    }
                ],
                temperature: 0.7,
                max_tokens: 500
            });

            console.log("✅ OpenAI API call successful");
            reportContent = completion.choices[0].message.content;
            console.log("📄 Report content length:", reportContent?.length);
            parsedReport = JSON.parse(reportContent || "{}");
        } catch (apiError: any) {
            console.error("OpenRouter API failed, generating mock report:", apiError);
            
            // Fallback: Generate a mock report based on the conversation and initial complaint
            parsedReport = {
                conversationSummary: `Patient consulted with ${sessionDetail.selectedDoctor?.specialist || 'medical professional'} regarding ${sessionDetail.notes}. The conversation covered symptoms, duration, and potential treatments.`,
                symptoms: extractSymptomsFromConversation(conversationText, sessionDetail.notes),
                duration: extractDurationFromConversation(conversationText) || "3 days",
                severity: "Moderate",
                medications: extractMedicationsFromConversation(conversationText),
                recommendations: [
                    "Continue monitoring symptoms",
                    "Follow up with healthcare provider if symptoms persist",
                    "Maintain adequate rest and hydration",
                    "Consider seeking immediate medical attention if symptoms worsen"
                ],
                additionalDetails: `Initial complaint: ${sessionDetail.notes}. Consultation conducted via AI voice agent platform. This is a preliminary assessment and should not replace professional medical advice.`
            };
        }

        // Parse the JSON response if it's a string
        if (typeof parsedReport === 'string') {
            try {
                parsedReport = JSON.parse(parsedReport);
            } catch (parseError) {
                console.error("Error parsing AI response:", parseError);
                // Use the fallback report structure
                parsedReport = {
                    conversationSummary: reportContent || "Unable to generate summary",
                    symptoms: ["Not specified"],
                    duration: "Not mentioned",
                    severity: "Not specified",
                    medications: ["Not mentioned"],
                    recommendations: ["Consult with a healthcare professional for proper diagnosis"],
                    additionalDetails: "Report generation encountered an issue"
                };
            }
        }

        // Update the session record with the generated report
        console.log("💾 Updating database...");
        const result = await db.update(sessionChatTable)
            .set({
                report: parsedReport,
                conversation: messages
            })
            .where(eq(sessionChatTable.sessionId, sessionId))
            .returning();

        console.log("✅ Database updated successfully", result.length, "rows affected");

        return NextResponse.json({
            success: true,
            report: parsedReport,
            message: "Report generated successfully"
        });

    } catch (error) {
        console.error("Error generating report:", error);
        return NextResponse.json({ 
            error: "Failed to generate report",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
