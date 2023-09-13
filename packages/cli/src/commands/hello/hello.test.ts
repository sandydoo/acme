import { type Options, execaCommand } from "execa";
import { expect, test } from "vitest";

test("should pass", async () => {
  const { stdout } = await run("acme Bob");
  expect(stdout).toBe("Hello Bob!");
});

async function run(command: string, options?: Options) {
  const processedCommand = command.replace(
    "acme",
    process.env["CI"]
      ? "node dist/index.js"
      : "tsx --conditions development src/index.ts",
  );
  return execaCommand(processedCommand, options);
}
