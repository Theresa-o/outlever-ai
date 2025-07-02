"use client"

import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/navigation"


const validationSchema = Yup.object({
  quote: Yup.string().required("Quote is required"),
  name: Yup.string().required("Name is required"),
  role: Yup.string().required("Role is required"),
  company: Yup.string().required("Company is required"),
  outputType: Yup.string().required("Output type is required"),
})

const ContentForm = () => {
  const [generated, setGenerated] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true)
    setError("")
    setGenerated("")

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const data = await res.json()

      if (res.ok) {
        setGenerated(data.generatedContent)

        await fetch("/api/content/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quote: values.quote,
            speaker: values.name,
            role: values.role,
            company: values.company,
            outputType: values.outputType,
            result: data.generatedContent,
          }),
        })

      } else {
        setError(data.error || "Failed to generate content")
      }
    } catch (err) {
      console.error(err)
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden my-8">

        <div className="bg-secondary px-6 py-4">
            <h2 className="text-2xl font-bold text-[#D15B00] text-center"> Generate Thought Leadership</h2>
        </div>

      <div className="px-6 py-8">
        <Formik
          initialValues={{ quote: "", name: "", role: "", company: "", outputType: "LinkedIn Post" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quote</label>
                <Field
                  name="quote"
                  placeholder="Enter a quote..."
                  className={`w-full px-4 py-3 rounded-md border text-black ${
                    errors.quote && touched.quote ? "border-secondary" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-secondary`}
                />
                <ErrorMessage name="quote" component="div" className="text-sm text-[#D15B00] mt-1" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <Field
                    name="name"
                    placeholder="Name"
                    className={`w-full px-4 py-3 rounded-md border text-black ${
                      errors.name && touched.name ? "border-secondary" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-secondary`}
                  />
                  <ErrorMessage name="name" component="div" className="text-sm text-[#D15B00] mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <Field
                    name="role"
                    placeholder="Role"
                    className={`w-full px-4 py-3 rounded-md border text-black ${
                      errors.role && touched.role ? "border-secondary" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-secondary`}
                  />
                  <ErrorMessage name="role" component="div" className="text-sm text-[#D15B00] mt-1" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <Field
                  name="company"
                  placeholder="Company"
                  className={`w-full px-4 py-3 rounded-md border text-black ${
                    errors.company && touched.company ? "border-secondary" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-secondary`}
                />
                <ErrorMessage name="company" component="div" className="text-sm text-[#D15B00] mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Output Type</label>
                <Field
                  as="select"
                  name="outputType"
                  className={`w-full px-4 py-3 rounded-md border text-black ${
                    errors.outputType && touched.outputType ? "border-[#D15B00]" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-secondary`}
                >
                  <option value="LinkedIn Post">LinkedIn Post</option>
                  <option value="Tweet Thread">Tweet Thread</option>
                  <option value="Short Blog">Short Blog</option>
                </Field>
                <ErrorMessage name="outputType" component="div" className="text-sm text-[#D15B00] mt-1" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D15B00] text-white font-bold py-3 px-4 rounded-md hover:bg-[#D15B00]-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D15B00] transition duration-150 ease-in-out"
              >
                {loading ? "Generating..." : "Generate content"}
              </button>
            </Form>
          )}
        </Formik>

        {generated && (
          <div className="mt-6 p-4 text-black border rounded bg-gray-100">
            <h2 className="font-semibold mb-2">Generated Content:</h2>
            <p>{generated}</p>
          </div>
        )}

        {error && <div className="mt-4 text-red-600">{error}</div>}
      </div>
    </div>
  )
}

export default ContentForm