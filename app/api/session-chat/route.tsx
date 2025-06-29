import { db } from "@/config/db";
import { sessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
    const { notes, selectedDoctor } = await req.json();
    const user = await currentUser();
    try {
        const sessionId = uuidv4();
        const result = await db.insert(sessionChatTable).values({
            sessionId: sessionId,
            notes: notes,
            selectedDoctor: selectedDoctor,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            CreatedOn: (new Date()).toString(),
            // @ts-ignore
        }).returning({ sessionChatTable });
        return NextResponse.json(result[0]?.sessionChatTable);
    } catch (e) {
        return NextResponse.json(e);
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");
    const user = await currentUser();

    if (sessionId === "all") {
        try {
            const result = await db.select().from(sessionChatTable)
                // @ts-ignore
                .where(eq(sessionChatTable.createdBy, user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(sessionChatTable.id));

            console.log("All sessions data retrieved:", result);
            return NextResponse.json(result);
        } catch (e) {
            console.error("Error fetching all sessions data:", e);
            return NextResponse.json({ error: "Failed to fetch sessions data" }, { status: 500 });
        }
    } else {
        try {
            const result = await db.select().from(sessionChatTable)
                // @ts-ignore
                .where(eq(sessionChatTable.sessionId, sessionId));

            console.log("Session data retrieved:", result[0]);
            return NextResponse.json(result[0]);
        } catch (e) {
            console.error("Error fetching session data:", e);
            return NextResponse.json({ error: "Failed to fetch session data" }, { status: 500 });
        }
    }
}
