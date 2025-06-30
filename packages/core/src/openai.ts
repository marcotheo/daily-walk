export * as OpenAI from "./openai";

function cleanOpenAIResponse(output: string): string {
  // Remove triple backtick code blocks if present
  const match = output.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const cleaned = match ? match[1] : output;

  // Attempt basic validation
  try {
    JSON.parse(cleaned); // valid JSON? great, return it.
    return cleaned;
  } catch (err) {
    console.warn("⚠️ Invalid JSON, falling back to repair logic");
  }

  // Fallback: don't attempt smart repair—just return raw so dev can inspect
  return cleaned;
}

export const generateDailyVerse = async () => {
  if (!process.env.OPENAI_API_KEY) return null;

  const apiKey = process.env.OPENAI_API_KEY;

  const systemPrompt = `You are a daily bible verse generator`;

  const userPrompt = `
Generate a random Bible verse for today and a short reflection.

The reflection must be Christ-centered, emotionally resonant, and no more than 2–3 paragraphs. Include a practical takeaway for daily life.

Only respond in raw JSON — do not include markdown, code blocks, or extra explanation. The format must be:

{
  "verse": "string",
  "reference": "string",
  "reflection": "string"
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
