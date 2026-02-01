import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string, // Cast to string to fix TS error
});

export async function POST(req: Request) {
  try {
    const { plantList, zoneDetails } = await req.json();

    // We added "Botanical" and "Horticultural" to keep the safety filter happy
   const prompt = `A very simple 2D garden.
    Perspective: Bird's-eye view looking straight down.
    Components: One central rectangle lawn and three simple perimeter garden beds.
    Contents: The garden beds contain basic plant symbols representing: ${plantList}.
    Style: Basic landscape 2D drawing/ planting plan in colour. Please only use the plants from the ${plantList}. 
    Visual Type: It must look like a simple, clean diagram for a landscaping hobbyist.`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "hd",
    });

    // Added safety check to fix 'response.data is possibly undefined' error
    if (response.data && response.data.length > 0) {
      const imageUrl = response.data[0].url;
      return NextResponse.json({ url: imageUrl });
    } else {
      throw new Error("OpenAI returned an empty image data array.");
    }

  } catch (error: any) {
    console.error("DALL-E Error:", error);
    // Provide a more descriptive error message back to your frontend
    return NextResponse.json(
      { error: error.message || "Failed to generate render" }, 
      { status: 500 }
    );
  }
}