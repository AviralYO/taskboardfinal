import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import  authOptions from "@/pages/api/auth/[...nextauth]";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions) as { user?: { email?: string } } | null;
  console.log("SESSION:", session);
  if (!session || !session.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = await clientPromise;
  const db = client.db();
  const projects = await db.collection("projects").find({ userId: session.user.email }).toArray();
  const projectsWithId = projects.map((project) => ({
    ...project,
    id: project._id.toString(),
  }));
  return NextResponse.json(projectsWithId);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions) as { user?: { email?: string } } | null;
  if (!session || !session.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection("projects").insertOne({
    ...body,
    userId: session.user.email,
    createdAt: new Date(),
  });
  return NextResponse.json({ insertedId: result.insertedId });
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions) as { user?: { email?: string } } | null;
  if (!session || !session.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { id, ...updateData } = body;
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection("projects").findOneAndUpdate(
    { _id: new ObjectId(id), userId: session.user.email },
    { $set: updateData },
    { returnDocument: "after" }
  );
  if (!result.value) return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 });
  return NextResponse.json(result.value);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions) as { user?: { email?: string } } | null;
  if (!session || !session.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection("projects").deleteOne({ _id: new ObjectId(id), userId: session.user.email });
  if (result.deletedCount === 0) return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 });
  return NextResponse.json({ success: true });
} 