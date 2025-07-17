import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = await clientPromise;
  const db = client.db();
  const tasks = await db.collection("tasks").find({ userId: session.user?.email }).toArray();
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection("tasks").insertOne({
    ...body,
    userId: session.user?.email,
    createdAt: new Date(),
  });
  return NextResponse.json({ insertedId: result.insertedId });
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { id, ...updateData } = body;
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection("tasks").findOneAndUpdate(
    { _id: new ObjectId(id), userId: session.user?.email },
    { $set: updateData },
    { returnDocument: "after" }
  );
  if (!result.value) return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 });
  return NextResponse.json(result.value);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection("tasks").deleteOne({ _id: new ObjectId(id), userId: session.user?.email });
  if (result.deletedCount === 0) return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 });
  return NextResponse.json({ success: true });
} 