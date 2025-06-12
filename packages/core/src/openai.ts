export * as OpenAI from "./openai";

const cleanOpenAIResponse = (rawOutput: string) => {
  // Remove code block wrappers like ```json and ```
  return rawOutput
    .replace(/^```json\s*/i, "")
    .replace(/```$/, "")
    .trim();
};

export const generateDailyVerse = async () => {
  if (!process.env.OPENAI_API_KEY) return null;

  const apiKey = process.env.OPENAI_API_KEY;

  const systemPrompt = `You are a daily bible verse generator`;

  const userPrompt = `Generate a bible verse for today and return response in JSON format with this structure:
{
  "verse": "string",
  "reference": "string",
}
`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `OpenAI API error: ${res.status} ${res.statusText} — ${errorText}`
    );
  }

  const data = await res.json();
  const rawOutput = data.choices?.[0]?.message?.content?.trim();
  const cleaned = cleanOpenAIResponse(rawOutput);

  try {
    return JSON.parse(cleaned);
  } catch {
    console.error("Invalid OpenAI output:", cleaned);
    throw new Error("Failed to parse JSON response from OpenAI");
  }
};
