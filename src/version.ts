export const DEFAULT_VERSION: DotNetFormatVersion = "3";

export type DotNetFormatVersion =
  | "3"
;

const supportedVersions: DotNetFormatVersion[] = [
  "3",
];

export function checkVersion(version: string): DotNetFormatVersion {
  // if no version is supplied default to 3 since that was the first supported version
  if (!version) return DEFAULT_VERSION;

  for (let i = 0; i < supportedVersions.length; i++) {
    const ver = supportedVersions[i];
    if (ver === version) {
      return version;
    }
  }

  throw Error(`dotnet-format version "${version}" is unsupported`);
}
