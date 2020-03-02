# GitHub Action for dotnet-format

Run `dotnet-format` as part of your workflow to report linting errors or auto fix violations as part of your pull request workflow.

## Usage

Running on pull requests.

```yml
name: Pull Request
on: pull_request
jobs:
  dotnet-format:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v2

      - name: Add dotnet-format problem matcher
        uses: xt0rted/dotnet-format-problem-matcher@v1

      - name: Restore dotnet tools
        uses: xt0rted/dotnet-tool-restore@v1

      - name: Run dotnet format
        uses: xt0rted/dotnet-format@v1
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          lint-changed-files: "true"
```

Running on demand by pull request comment, triggered by the text `/dotnet format`.

```yml
name: Format on Slash Command
on:
  issue_comment:
    types: created
jobs:
  dotnet-format:
    runs-on: ubuntu-latest
    steps:
      - name: Check for command
        id: command
        uses: xt0rted/slash-command-action@v1
        continue-on-error: true
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          command: dotnet
          reaction-type: "eyes"

      - name: Get PR branch info
        if: steps.command.outputs.command-name
        id: comment-branch
        uses: xt0rted/pull-request-comment-branch@v1
        with:
          repo_token: ${{ secrets.GITHUB_TOKEN }}

      - name: Checkout repo
        if: steps.command.outputs.command-name
        uses: actions/checkout@v2
        with:
          ref: ${{ steps.comment-branch.outputs.ref }}

      - name: Restore dotnet tools
        if: steps.command.outputs.command-name
        uses: xt0rted/dotnet-tool-restore@v1

      - name: Run dotnet format
        if: steps.command.outputs.command-name && steps.command.outputs.command-arguments == 'format'
        uses: xt0rted/dotnet-format@v1
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          lint-all-files: "false"
```

## Options

### Required

Name | Allowed values | Description
-- | -- | --
`repo-token` | `GITHUB_TOKEN` or a custom value | The token used to call the GitHub api.

### Optional

Name | Allowed values | Description
-- | -- | --
`action` | `fix`, `lint` (default) | The primary action dotnet-format should perform.
`lint-changed-files` | `true`, `false` (default) | If all files should be formatting, or just those in the current pull request
`fail-fast` | `true` (default), `false` | If the job should fail if there's a formatting error

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
