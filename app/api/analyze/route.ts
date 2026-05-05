import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const { userData } = await req.json();

    if (!apiKey) return NextResponse.json({ error: "API Key Missing" }, { status: 500 });

    const repoRes = await fetch(`https://api.github.com/users/${userData.login}/repos?sort=updated&per_page=10`);
    const repos = await repoRes.json();
    
    const repoContext = Array.isArray(repos) ? repos.map((r: any) => 
      `- ${r.name} (${r.language || 'N/A'}): ${r.description || ''}`
    ).join('\n') : "No repository information available.";

    const targetModel = "gemini-2.5-flash"; 
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/${targetModel}:generateContent?key=${apiKey}`;

    const prompt = `
      Analyze GitHub user [${userData.login}] and provide a report in Korean.
      Bio: ${userData.bio || 'None'}
      Stats: ${userData.followers} followers, ${userData.public_repos} repos
      Recent Projects:
      ${repoContext}
      
      Requirements:
      1. Structure: Divide into two sections using [SPLIT] as the only delimiter.
      2. Content: 
         - Section 1: Technical personality summary based on real repo names (3-4 sentences).
         - Section 2: Growth potential and contribution strength (3-4 sentences).
      3. Formatting: 
         - Use newline(\\n) for each sentence.
         - Highlight key technical terms or strengths using **keyword**.
         - Do NOT use markdown headers (#) or bullets (*).
      4. Tone: Professional and insightful.
    `;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "AI Analysis Failed");

    return NextResponse.json({ analysis: data.candidates[0].content.parts[0].text });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}