import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import authOptions  from "../auth/[...nextauth]"; // adjust path if needed

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = await clientPromise;
  const db = client.db();
  const projects = await db.collection("projects").find({ userId: session.user?.email }).toArray();
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection("projects").insertOne({
    ...body,
    userId: session.user?.email,
    createdAt: new Date(),
  });
  return NextResponse.json({ insertedId: result.insertedId });
}