import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function POST(req) {
  const body = await req.json()
  const { quote, name, role, company, outputType } = body

  const prompt = `
    Write a ${outputType} based on the following quote:
    "${quote}"
    Speaker: ${name}, ${role} at ${company}
    Make it sound like industry thought leadership.
  `

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt)
    const generatedContent = result.response.text()

    return NextResponse.json({ generatedContent })
  } catch (error) {
    console.error("Gemini error:", error)
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
  }
}
