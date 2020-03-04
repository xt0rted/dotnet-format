# GitHub Action for dotnet-format

[![CI Workflow Status](https://github.com/xt0rted/dotnet-format/workflows/CI/badge.svg)](https://github.com/xt0rted/dotnet-format/actions?query=workflow%3ACI)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=xt0rted/dotnet-format)](https://dependabot.com)

Run `dotnet-format` as part of your workflow to report formatting errors or auto fix violations as part of your pull request workflow.

## Usage

Running on `push`.

```yml
name: Format check on push
on: push
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
          fail-fast: "true"
```

Running on `pull_request`.

```yml
name: Format check on pull request
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
          only-changed-files: "true"
```

Running on demand by pull request comment, triggered by the text `/dotnet format`.

> ℹ To push fixes back to the pull request branch you'll need to setup a [Personal Access Token](https://github.com/settings/tokens/new?scopes=repo&description=github%20actions) with the `repo` scope.
> The provided `GITHUB_TOKEN` will not trigger additional workflows so you'll need to [setup a secret](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) with your Personal Access Token.

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
          persist-credentials: false

      - name: Restore dotnet tools
        if: steps.command.outputs.command-name
        uses: xt0rted/dotnet-tool-restore@v1

      - name: Run dotnet format
        if: steps.command.outputs.command-name && steps.command.outputs.command-arguments == 'format'
        uses: xt0rted/dotnet-format@v1
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          only-changed-files: "true"

      - name: Commit files
        if: steps.command.outputs.command-name && steps.command.outputs.command-arguments == 'format'
        run: |
          git config --local user.name "github-actions[bot]"
          git config --local user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git commit -a -m 'Automated dotnet-format update

          Co-authored-by: ${{ github.event.comment.user.login }} <${{ github.event.comment.user.id }}+${{ github.event.comment.user.login }}@users.noreply.github.com>'

      - name: Push changes
        if: steps.command.outputs.command-name && steps.command.outputs.command-arguments == 'format'
        uses: ad-m/github-push-action@v0.5.0
        with:
          branch: ${{ steps.comment-branch.outputs.ref }}
          github_token: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
```

## Options

### Required

Name | Allowed values | Description
-- | -- | --
`repo-token` | `GITHUB_TOKEN` or a custom value | The token used to call the GitHub api.

### Optional

Name | Allowed values | Description
-- | -- | --
`action` | `check` (default), `fix` | The primary action dotnet-format should perform.
`only-changed-files` | `true`, `false` (default) | Only changed files in the current pull request should be formatted.
`fail-fast` | `true` (default), `false` | The job should fail if there's a formatting error. Only used with the `check` action.

## Outputs

Name | Description
-- | --
`has-changes` | If any files were found to have violations or had fixes applied. Will be a string value of `true` or `false`.

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
