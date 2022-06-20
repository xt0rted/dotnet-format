# Changelog

## Unreleased

- Bumped `@actions/core` from 1.2.7 to 1.9.0
- Bumped `@actions/exec` from 1.0.4 to 1.1.1
- Bumped `@actions/github` from 4.0.0 to 5.0.3
- Bumped `@actions/io` from 1.1.0 to 1.1.2
- Bumped `node-fetch` from 2.6.1 to 2.6.7

## Version 1.2.0

- Bumped `@actions/core` from 1.2.6 to 1.2.7
- Bumped `@actions/io` from 1.0.2 to 1.1.0
- Updated the `repo-token` input to be optional and defaulted it to `GITHUB_TOKEN`. If you're already using this value, or not using the `only-changed-files` option, you can remove this setting from your workflow.
- Updated the output target from `es6` to `es2019`
- Added a new `version` input to allow picking the cli version of `dotnet-format` to use. Currently this defaults to `3` and is the only version supported. A future update will add support for versions 4 and 5.

## Version 1.1.0

- Bumped `@actions/core` from 1.2.3 to 1.2.6
- Bumped `@actions/exec` from 1.0.3 to 1.0.4
- Bumped `@actions/github` from 2.1.1 to 4.0.0
- Bumped `@typescript-eslint/eslint-plugin` from 2.34.0 to 4.15.2
- Bumped `@typescript-eslint/parser` from 2.34.0 to 4.15.2
- Bumped  `eslint` from 6.8.0 to 7.22.0
- Adjusted eslint rules and fixed any violations

## Version 1.0.1

- Updated branding icon

## Version 1.0.0

- Initial release
