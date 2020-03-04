import { getInput, setFailed } from "@actions/core";

import { fix, lint } from "./actions";

export async function run(): Promise<void> {
  try {
    const onlyChangedFiles = getInput("only-changed-files") === "true";
    const failFast = getInput("fail-fast") === "true";

    const action = getInput("action", { required: true });

    switch (action) {
      case "lint":
        await lint({
          failFast,
          formatOptions: {
            dryRun: true,
            onlyChangedFiles,
          },
        });
        break;

      case "fix":
        await fix({
          failFast,
          formatOptions: {
            dryRun: false,
            onlyChangedFiles,
          },
        });
        break;

      default:
        throw Error(`Unsupported action "${action}"`);
    }
  } catch (error) {
    setFailed(error.message);
    throw error;
  }
}

run();
