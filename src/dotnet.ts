import { debug, info } from "@actions/core";
import { exec } from "@actions/exec";
import { which } from "@actions/io";

import { getPullRequestFiles } from "./files";

import type { ExecOptions } from "@actions/exec/lib/interfaces";

export interface FormatOptions {
  dryRun: boolean;
  lintAllFiles: boolean;
}

export async function format(options: FormatOptions): Promise<number> {
  const execOptions: ExecOptions = {
    ignoreReturnCode: true,
  };

  const dotnetFormatOptions = ["format", "--check"];

  if (options.dryRun) {
    dotnetFormatOptions.push("--dry-run");
  }

  if (!options.lintAllFiles) {
    const filesToLint = await getPullRequestFiles();

    info(`Linting ${filesToLint.length} files`);

    // if there weren't any files to check then we need to bail
    if (!filesToLint.length) {
      debug("No files found for linting");
      return 0;
    }

    dotnetFormatOptions.push("--files", filesToLint.join(","));
  }

  const dotnetPath: string = await which("dotnet", true);
  const dotnetResult = await exec(`"${dotnetPath}"`, dotnetFormatOptions, execOptions);

  return dotnetResult;
}
