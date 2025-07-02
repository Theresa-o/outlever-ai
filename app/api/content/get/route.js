import { NextResponse } from 'next/server'
import clientPromise from '../../../../lib/mongodb.js'

export const GET = async () => {
  try {
    const client = await clientPromise
    const db = client.db('outlever-AI')
    const collection = db.collection('content')

    const results = await collection.find().sort({ createdAt: -1 }).toArray()

    return NextResponse.json(results)
  } catch (err) {
    console.error('Fetch failed:', err)
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 })
  }
}