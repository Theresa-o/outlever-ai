// import { GoogleGenerativeAI } from "@google/generative-ai"
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server"

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

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

    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const generatedContent = result.text;

    return NextResponse.json({ generatedContent })
  } catch (error) {
    console.error("Gemini error:", error)
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
  }
}
