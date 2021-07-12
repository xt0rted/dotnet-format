import {
  existsSync,
  promises,
} from "fs";

import {
  debug,
  info,
  warning,
} from "@actions/core";
import { exec } from "@actions/exec";
import { context } from "@actions/github";
import { which } from "@actions/io";

import { getPullRequestFiles } from "./files";

import type { ExecOptions } from "@actions/exec/lib/interfaces";

import type { DotNetFormatVersion } from "./version";

const { readFile } = promises;

export type FormatFunction = (options: FormatOptions) => Promise<boolean>;

export interface FormatOptions {
  dryRun: boolean;
  onlyChangedFiles: boolean;
}

function formatOnlyChangedFiles(onlyChangedFiles: boolean): boolean {
  if (onlyChangedFiles) {
    if (context.eventName === "issue_comment" || context.eventName === "pull_request") {
      return true;
    }

    warning("Formatting only changed files is available on the issue_comment and pull_request events only");

    return false;
  }

  return false;
}

function tempReportFile(): string {
  return `../dotnet-format-${new Date().getTime()}.json`;
}

async function hadChangedFiles(report: string): Promise<boolean> {
  if (!existsSync(report)) {
    throw Error(`Report not found at ${report}`);
  }

  const reportContents = await readFile(report, "utf8");
  const formatResults = JSON.parse(reportContents) as [];

  debug(`Formatting issues found: ${formatResults.length}`);

  return !!formatResults.length;
}

async function formatVersion3(options: FormatOptions): Promise<boolean> {
  const execOptions: ExecOptions = {
    ignoreReturnCode: true,
    listeners: { debug },
  };

  const dotnetFormatOptions = ["format", "--check"];

  if (options.dryRun) {
    dotnetFormatOptions.push("--dry-run");
  }

  if (formatOnlyChangedFiles(options.onlyChangedFiles)) {
    const filesToCheck = await getPullRequestFiles();

    info(`Checking ${filesToCheck.length} files`);

    if (!filesToCheck.length) {
      debug("No files found to format");

      return false;
    }

    dotnetFormatOptions.push("--files", filesToCheck.join(","));
  }

  const dotnetPath: string = await which("dotnet", true);
  const dotnetResult = await exec(`"${dotnetPath}"`, dotnetFormatOptions, execOptions);

  return !!dotnetResult;
}

async function formatVersion4(options: FormatOptions): Promise<boolean> {
  const execOptions: ExecOptions = {
    ignoreReturnCode: true,
    listeners: { debug },
  };

  const dotnetFormatReport = tempReportFile();
  const dotnetFormatOptions = ["format", "--report", dotnetFormatReport];

  if (options.dryRun) {
    dotnetFormatOptions.push("--check");
  }

  if (formatOnlyChangedFiles(options.onlyChangedFiles)) {
    const filesToCheck = await getPullRequestFiles();

    info(`Checking ${filesToCheck.length} files`);

    if (!filesToCheck.length) {
      debug("No files found to format");

      return false;
    }

    const files = filesToCheck
      .map((file) => {
        debug(`Including file: ${file}`);

        return `"${file}"`;
      });

    dotnetFormatOptions.push("-f", "--include", ...files);
  }

  // If the args are passed as args while using the --report parameter then dotnet-format thinks the
  // report path is the project path, but passing them as part of the command works as expected 🤷
  const dotnetPath: string = await which("dotnet", true);
  await exec(`${dotnetPath} ${dotnetFormatOptions.join(" ")}`, [], execOptions);

  return await hadChangedFiles(dotnetFormatReport);
}

export function format(version: DotNetFormatVersion): FormatFunction {
  switch (version || "") {
    case "3":
      return formatVersion3;

    case "4":
      return formatVersion4;

    default:
      throw Error(`dotnet-format version "${version}" is unsupported`);
  }
}
