"use client"

import { useSearchParams } from "next/navigation"

export default function GeneratedPage() {
  const searchParams = useSearchParams()
  const content = searchParams.get("content")

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-4">Generated Content</h1>
      <div className="bg-gray-100 p-4 rounded shadow">
        <p>{content || "No content available."}</p>
      </div>
    </div>
  )
}
