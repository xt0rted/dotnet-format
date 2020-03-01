import { extname } from "path";

import { getInput } from "@actions/core";
import { context, GitHub } from "@actions/github";

import type { Octokit } from "@octokit/rest";

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
};

const fileTypes = [
  ".cs",
  ".vb",
];

export async function getPullRequestFiles(): Promise<string[]> {
  const token = getInput("repo-token", { required: true });
  const githubClient = new GitHub(token);

  const listFilesOptions = githubClient.pulls.listFiles.endpoint.merge({
    ...context.repo,
    pull_number: context.payload["number"],
  });

  const files: Octokit.PullsListFilesResponse = await githubClient.paginate(listFilesOptions);

  return files
    .filter(file => file.status !== fileStatus.removed)
    .filter(file => fileTypes.includes(extname(file.filename)))
    .map(file => file.filename);
}
