import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";
import { z } from "zod";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openrouter("openrouter/auto"),
    system: `You are Medora AI, the virtual clinical assistant for Medora Doctor Portal. Answer only Medora doctor portal workflows, patient records, appointments, clinic operations, and website features. Keep responses concise and action oriented. Critical directive for navigation requests: whenever the user asks to see, open, view, go to, or show any portal section, you must immediately execute the navigate_portal tool call with the matching targetRoute. Route mapping: appointments or schedule or today's appointments -> /doctor/appointments; patients or medical records -> /doctor/patients; analytics or performance -> /doctor/analytics; doctors or staff -> /doctor/doctors; website builder or website -> /doctor/website; ai builder -> /doctor/ai-builder; treatments -> /doctor/treatments; dashboard or overview -> /doctor/dashboard. Respond with a concise 1 sentence confirmation while executing the tool call.`,
    messages: await convertToModelMessages(messages),
    tools: {
      navigate_portal: {
        description:
          "Navigate the user to a specific route in the Medora Doctor Portal.",
        inputSchema: z.object({
          targetRoute: z.enum([
            "/doctor/dashboard",
            "/doctor/analytics",
            "/doctor/doctors",
            "/doctor/patients",
            "/doctor/appointments",
            "/doctor/website",
            "/doctor/ai-builder",
            "/doctor/treatments",
          ]),
          confirmationMessage: z
            .string()
            .describe("A short confirmation message."),
        }),
        execute: async ({ targetRoute, confirmationMessage }) => {
          return { route: targetRoute, message: confirmationMessage };
        },
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
