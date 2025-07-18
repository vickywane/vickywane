import OpenAI from "openai"
import {
  OPENAI_API_KEY,
  ASSISTANT_SYSTEM_PROMPT,
  OPENAI_BASE_URL,
} from "./consts"

// import { PdfReader } from "pdfreader"
// import path from "path"
// import fs from "fs"

export async function POST(request: Request) {
  if (!OPENAI_API_KEY) {
    return Response.json({
      message: "OPENAI_API_KEY is not defined!",
      status: 500,
    })
  }

  const body = await request.json()

  // const filePath = path.join(__dirname, "./linkedin-victory.pdf")
  // new PdfReader().parseFileItems(filePath, (err, item) => {
  //   if (err) console.error("error:", err)
  //   else if (!item) console.warn("empty file")
  //   else if (item.text) console.log(item.text)
  // })

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    baseURL: OPENAI_BASE_URL,
  })

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        ...[{ role: "system", content: ASSISTANT_SYSTEM_PROMPT }],
        ...(body.conversation || []),
      ], //TODO: ensure body.conversation is always []
      max_tokens: 100,
    })

    const response = chatCompletion.choices[0].message
    return Response.json({ data: response })
  } catch (error) {
    console.log("error =>", error)

    return Response.json({
      message: `error: ${error}`,
      status: 500,
    })
  }
}
