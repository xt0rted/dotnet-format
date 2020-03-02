import { getInput, setFailed } from "@actions/core";

import { format } from "./dotnet";

export async function run(): Promise<void> {
  try {
    const onlyChangedFiles = getInput("only-changed-files") === "true";
    const failFast = getInput("fail-fast") === "true";

    const action = getInput("action", { required: true });

    let dotnetResult: number;

    switch (action) {
      case "lint":
        dotnetResult = await format({
          dryRun: true,
          onlyChangedFiles: onlyChangedFiles,
        });
        break;

      case "fix":
        dotnetResult = await format({
          dryRun: false,
          onlyChangedFiles: onlyChangedFiles,
        });
        break;

      default:
        throw Error(`Unsupported action "${action}"`);
    }

    // fail fast will cause the workflow to stop on this job
    if (dotnetResult && failFast) {
      throw Error("Formatting issues found");
    }
  } catch (error) {
    setFailed(error.message);
    throw error;
  }
}

run();
