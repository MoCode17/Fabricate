import { env } from '../config/env';

interface GenerationParams {
  prompt: string;
  style?: string;
  pattern?: string;
  colors?: string[];
  image?: string;
}

export async function generateDesigns({ prompt, style, pattern, colors, image }: GenerationParams) {
  if (!env.REPLICATE_API_TOKEN) {
    throw new Error('API token is not configured. Please check your environment variables.');
  }

  let fullPrompt = prompt;
  
  if (style) {
    fullPrompt += `, ${style} style`;
  }
  if (pattern) {
    fullPrompt += `, ${pattern} pattern`;
  }
  if (colors?.length) {
    fullPrompt += `, color scheme: ${colors.join(', ')}`;
  }

  fullPrompt += ', high quality fashion design, professional clothing photography, detailed fabric texture';

  try {
    // Create prediction
    const response = await fetch('/api/predictions', {
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

    const prediction = await response.json();

    // Poll for the result
    const maxAttempts = 60;
    const interval = 1000;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const pollResponse = await fetch(`/api/predictions/${prediction.id}`);

      if (!pollResponse.ok) {
        const error = await pollResponse.text();
        throw new Error(error);
      }

      const result = await pollResponse.json();

      if (result.status === 'succeeded') {
        return result.output.map((url: string) => ({
          url,
          timestamp: Date.now()
        }));
      }

      if (result.status === 'failed') {
        throw new Error('Design generation failed');
      }

      await new Promise(resolve => setTimeout(resolve, interval));
      attempts++;
    }

    throw new Error('Timeout waiting for design generation');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate designs: ${error.message}`);
    }
    throw new Error('Failed to generate designs');
  }
}