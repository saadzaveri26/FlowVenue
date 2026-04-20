import { NextResponse } from 'next/server';

const MODEL = 'gemini-2.5-flash';

export async function POST(req: Request) {
  try {
    const { message, stadiumContext } = await req.json();

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
      return NextResponse.json({ reply: 'Please provide a valid GEMINI_API_KEY in .env.local to activate the AI.' });
    }

    const prompt = `You are the FlowVenue AI Co-pilot for a modern sports stadium. Provide a very concise, helpful, and polite response (under 2 sentences) to the user's query.

Context about current stadium queues:
${stadiumContext}

User Question:
${message}`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    if (response.status === 429) {
      return NextResponse.json({ reply: "I'm experiencing high demand right now. Please try again in a moment." });
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API Error (${MODEL}):`, response.status, errorText);
      throw new Error(`Gemini API Error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm currently unable to process your request.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ reply: 'I encountered an error connecting to my neural net. Please try again.' }, { status: 500 });
  }
}
