import {
  getInput,
  setFailed,
} from "@actions/core";

import {
  check,
  fix,
} from "./actions";

export async function run(): Promise<void> {
  try {
    const action = getInput("action", { required: true });

    switch (action) {
      case "check":
        await check();
        break;

      case "fix":
        await fix();
        break;

      default:
        throw Error(`Unsupported action "${action}"`);
    }
  } catch (error) {
    if (error instanceof Error) {
      setFailed(error.message);
    } else {
      throw error;
    }
  }
}

void run();
