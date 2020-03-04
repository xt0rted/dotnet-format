import { getInput, setFailed } from "@actions/core";

import { check, fix } from "./actions";

export async function run(): Promise<void> {
  try {
    const onlyChangedFiles = getInput("only-changed-files") === "true";
    const failFast = getInput("fail-fast") === "true";

    const action = getInput("action", { required: true });

    switch (action) {
      case "check":
        await check({
          failFast,
          formatOptions: {
            dryRun: true,
            onlyChangedFiles,
          },
        });
        break;

      case "fix":
        await fix({
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
