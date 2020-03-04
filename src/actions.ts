import { format as dotnetFormat, FormatOptions } from "./dotnet";

export interface LintOptions {
  failFast: boolean;
  formatOptions: FormatOptions;
}

export async function lint(options: LintOptions): Promise<void> {
  const result = await dotnetFormat(options.formatOptions);

  // fail fast will cause the workflow to stop on this job
  if (result && options.failFast) {
    throw Error("Formatting issues found");
  }
}

export interface FixOptions {
  failFast: boolean;
  formatOptions: FormatOptions;
}

export async function fix(options: FixOptions): Promise<void> {
  await dotnetFormat(options.formatOptions);
}
