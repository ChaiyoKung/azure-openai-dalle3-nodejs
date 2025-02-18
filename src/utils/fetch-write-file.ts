import { write, type BunFile, type S3File } from "bun";

/**
 * Fetches a resource from the network and writes it to a specified destination.
 *
 * @param destination - The destination where the fetched resource will be written. It can be a BunFile, S3File, or a path-like string.
 * @param input - The input URL, string, or Request object to fetch the resource from.
 * @param init - Optional. An object containing any custom settings that you want to apply to the request.
 * @returns A promise that resolves when the resource has been successfully written to the destination.
 */
export async function fetchWriteFile(
  destination: BunFile | S3File | Bun.PathLike,
  input: string | URL | Request,
  init?: RequestInit
): Promise<void> {
  const response = await fetch(input, init);
  const arrayBuffer = await response.arrayBuffer();
  await write(destination, arrayBuffer);
}
