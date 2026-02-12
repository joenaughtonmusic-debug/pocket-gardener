import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { image } = await req.json(); // This is the Base64 string from the camera

    const response = await fetch("https://api.plant.id/v2/identify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": process.env.PLANTID_API_KEY || '',
      },
      body: JSON.stringify({
        images: [image],
        plant_details: ["common_names", "scientific_name"],
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to connect to AI" }, { status: 500 });
  }
}