import { setOutput } from "@actions/core";

import { format, FormatOptions } from "./dotnet";

export interface CheckOptions {
  failFast: boolean;
  formatOptions: FormatOptions;
}

export interface FixOptions {
  formatOptions: FormatOptions;
}

export async function check(options: CheckOptions): Promise<void> {
  const result = await format(options.formatOptions);

  setOutput("has-changes", (!!result).toString());

  // fail fast will cause the workflow to stop on this job
  if (result && options.failFast) {
    throw Error("Formatting issues found");
  }
}

export async function fix(options: FixOptions): Promise<void> {
  const result = await format(options.formatOptions);

  setOutput("has-changes", (!!result).toString());
}
