import { NextResponse } from "next/server"
import clientPromise from '../../../../lib/mongodb.js'

export const POST = async (req) => {
  try {
    const body = await req.json()
    const { quote, speaker, role, company, outputType, result } = body

    const client = await clientPromise
    const db = client.db("outlever-AI")
    const collection = db.collection("content")

    const doc = {
      quote,
      speaker,
      role,
      company,
      outputType,
      result,
      createdAt: new Date(),
    }

    await collection.insertOne(doc)

    return NextResponse.json({ message: "Saved" })
  } catch (err) {
    console.error("Save error:", err)
    return NextResponse.json({ error: "Save failed" }, { status: 500 })
  }
}
