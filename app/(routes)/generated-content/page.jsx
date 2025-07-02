"use client"

import { Suspense } from "react"
import GeneratedPageContent from "./GeneratedPageContent"

export default function GeneratedPage() {
  return (
    <Suspense fallback={<div className="flex justify-center text-center">Loading...</div>}>
      <GeneratedPageContent />
    </Suspense>
  )
}