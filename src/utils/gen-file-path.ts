import { createHash } from "crypto";
import { getFileExtension } from "./get-file-extension";
import path from "node:path";

/**
 * Generates a file path based on a given prompt and image URL.
 *
 * @param {string} prompt - The prompt string used to generate the file path.
 * @param {string | URL} imageUrl - The URL of the image, used to determine the file extension.
 * @param {string | string[]} [dirs=""] - The directory where the file will be saved. Defaults to the current directory.
 * @returns {string} - The generated file path.
 */
export function genFilePath(prompt: string, imageUrl: string | URL, dirs: string | string[] = ""): string {
  const hash = createHash("md5");
  hash.update(prompt);
  const promptHashed = hash.digest("hex");

  const extension = getFileExtension(imageUrl);
  const fileName = `${promptHashed}-${Date.now()}${extension}`;

  if (typeof dirs === "string") return path.join(dirs, fileName);
  return path.join(...dirs, fileName);
}
