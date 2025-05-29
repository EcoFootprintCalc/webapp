export async function POST(req) {
  const prompt = await req.text();

  const backendRes = await fetch(`${process.env.API_URL}/Gemini/GenerateText`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prompt),
  });
  if (!backendRes.ok) {
    return new Response(
      JSON.stringify({ reply: "Sorry, Gemini is unavailable." }), 
      { status: 500 }
    );
  }
  const data = await backendRes.json();
  // 🚩 LOGOLD KI A VÁLASZT!
  console.log("[API ROUTE] Gemini backend JSON:", data);

  return new Response(
    JSON.stringify({ reply: data.result }),
    { status: 200 }
  );
}