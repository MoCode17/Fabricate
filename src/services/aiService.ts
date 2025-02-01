interface GenerationParams {
  prompt: string;
  style?: string;
  pattern?: string;
  colors?: string[];
  image?: string | null;
}

export async function generateDesigns({ prompt, style, pattern, colors, image }: GenerationParams) {

  let fullPrompt = prompt;
  /*
  if (style) {
    fullPrompt += `, ${style} style`;
  }
  if (pattern) {
    fullPrompt += `, ${pattern} pattern`;
  }
  if (colors?.length) {
    fullPrompt += `, color scheme: ${colors.join(', ')}`;
  }
*/
  fullPrompt += ', high quality fashion design, professional clothing photography, detailed fabric texture';

  try {
    // Create prediction
    console.log("here init");
    const response = await fetch('http://localhost:3000/drip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: fullPrompt,
        negative_prompt: "low quality, blurry, distorted, unrealistic proportions",
        num_outputs: 4,
        ...(image && { image }),
        guidance_scale: 7.5,
        num_inference_steps: 50,
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    // Parse the backend response
    const filenames = await response.json();

    if (!Array.isArray(filenames) || filenames.length === 0) {
      throw new Error("No designs returned from the backend.");
    }

    // Map the filenames to full URLs
    const baseUrl = 'http://localhost:3000/designs';
    return filenames.map((filename: string) => ({
      url: `${baseUrl}/${filename}`, // Construct full URL for the image
      timestamp: Date.now(),
    }));
    }
  catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate designs: ${error.message}`);
    }
    throw new Error('Failed to generate designs');
  }
}