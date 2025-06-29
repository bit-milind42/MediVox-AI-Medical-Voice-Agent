import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { APIKeys } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {notes} = await req.json();
    try{
        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.5-pro",
            messages:[
                {role:"system", content:JSON.stringify(AIDoctorAgents)},
                {role:"user", content:"User Notes/Symptoms: "+notes+", Depends on user notes and symptoms, Please suggest list of doctors, Return object in JSON only"}
            ]
        });
        const rawResp= (completion.choices[0].message);
        // @ts-ignore
        const Resp=rawResp.content.replace('```json', '').replace('```', '').trim();
        const JSONResp = JSON.parse(Resp);
        return NextResponse.json(JSONResp);
    }
    catch(e){
        return NextResponse.json(e);
    }
}