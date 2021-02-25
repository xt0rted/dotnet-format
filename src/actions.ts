import {
  getInput,
  setOutput,
} from "@actions/core";

import { format } from "./dotnet";

export async function check(): Promise<void> {
  const onlyChangedFiles = getInput("only-changed-files") === "true";
  const failFast = getInput("fail-fast") === "true";

  const result = await format({
    dryRun: true,
    onlyChangedFiles,
  });

  setOutput("has-changes", result.toString());

  // fail fast will cause the workflow to stop on this job
  if (result && failFast) {
    throw Error("Formatting issues found");
  }
}

export async function fix(): Promise<void> {
  const onlyChangedFiles = getInput("only-changed-files") === "true";

  const result = await format({
    dryRun: false,
    onlyChangedFiles,
  });

  setOutput("has-changes", result.toString());
}
