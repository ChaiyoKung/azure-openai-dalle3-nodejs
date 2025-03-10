import "dotenv/config";
import { APIError, AzureOpenAI } from "openai";
import type { ImageGenerateParams } from "openai/resources/images";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { fetchWriteFile } from "./utils/fetch-write-file";
import { genFilePath } from "./utils/gen-file-path";

// The prompt to generate images from
const prompt: ImageGenerateParams["prompt"] =
  "A beautiful anime-style female character with a short blue bob haircut, red eyes. She wears an elegant gothic-style dress in black and navy blue, featuring intricate lace, ruffles, and gemstone details. The outfit includes off-shoulder sleeves with delicate embroidery and dark-themed accessories. The background is a mysterious gothic cathedral with soft, ethereal lighting. The overall style is highly detailed but with a cel-shaded anime aesthetic, reducing realism while maintaining an intricate fantasy design.";
const size: ImageGenerateParams["size"] = "1024x1024";

// The number of images to generate
const n: ImageGenerateParams["n"] = 1;

async function main() {
  const scope: string | string[] = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);

  const deployment: string = "dall-e-3";
  const apiVersion: string = "2024-02-01";
  const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });

  const results = await client.images.generate({ prompt, model: "", n, size });

  for (const image of results.data) {
    if (image.url === undefined) {
      console.error("Image URL is undefined");
      continue;
    }

    const generatedImagesDir = "gens";
    const filePath = genFilePath(prompt, image.url, generatedImagesDir);
    await fetchWriteFile(filePath, image.url);

    console.log(`Image generated and saved to [${filePath}](${image.url})`);
  }
}

main().catch((error) => {
  if (error instanceof APIError) {
    console.dir(error.error, { depth: null });
  } else {
    console.error(error);
  }
});
