import { extname } from "path";

import { getInput } from "@actions/core";
import { context, getOctokit } from "@actions/github";

enum fileStatus {
  /**
   * The file was added.
   */
  added = "added",

  /**
   * The mode of the file was changed or there are unknown changes because the diff was truncated.
   */
  changed = "changed",

  /**
   * The content of the file was modified.
   */
  modified = "modified",

  /**
   * The file was removed.
   */
  removed = "removed",

  /**
   * The file was renamed.
   */
  renamed = "renamed",
}

const fileTypes = [
  ".cs",
  ".vb",
];

export async function getPullRequestFiles(): Promise<string[]> {
  const token = getInput("repo-token", { required: true });
  const githubClient = getOctokit(token);

  if (!context.issue.number) {
    throw Error("Unable to get pull request number from action event");
  }

  const files = await githubClient.paginate(githubClient.pulls.listFiles, {
    ...context.repo,
    pull_number: context.issue.number,
  });

  return files
    .filter(file => file.status !== fileStatus.removed)
    .filter(file => fileTypes.includes(extname(file.filename)))
    .map(file => file.filename);
}
