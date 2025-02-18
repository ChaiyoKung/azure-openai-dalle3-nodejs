import { describe, expect, it } from "bun:test";
import { genFilePath } from "./gen-file-path";

describe("genFilePath", () => {
  it("should generate the correct file path with a default directory", () => {
    const prompt = "sample prompt";
    const imageUrl = "http://example.com/image.png";
    const result = genFilePath(prompt, imageUrl);
    expect(result).toMatch(/^[a-f0-9]{32}-\d+\.png$/);
  });

  it("should generate the correct file path with a custom directory", () => {
    const prompt = "another prompt";
    const imageUrl = "http://example.com/image.jpg";
    const dir = "./custom-dir";
    const result = genFilePath(prompt, imageUrl, dir);
    expect(result).toMatch(/^custom-dir\/[a-f0-9]{32}-\d+\.jpg$/);
  });

  it("should generate the correct file path with multiple custom directories", () => {
    const prompt = "yet another prompt";
    const imageUrl = "http://example.com/image.jpeg";
    const dirs = ["custom-dir", "sub-dir"];
    const result = genFilePath(prompt, imageUrl, dirs);
    expect(result).toMatch(/^custom-dir\/sub-dir\/[a-f0-9]{32}-\d+\.jpeg$/);
  });

  it("should generate the correct file path with a URL instance", () => {
    const prompt = "final prompt";
    const imageUrl = new URL("http://example.com/image.gif");
    const result = genFilePath(prompt, imageUrl);
    expect(result).toMatch(/^[a-f0-9]{32}-\d+\.gif$/);
  });
});
